import test, { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  PRIORITY_WEIGHTS,
  comparePatientsPriority,
  getSortedWaitingQueue,
  calculateEstimatedWaitTime,
  generateNextToken,
  generateNextPatientId,
  calculateQueueStats,
  formatTimeDisplay
} from './queueUtils.js';

describe('Hospital Queue Priority & Scheduling Logic', () => {
  it('assigns correct priority weights (Emergency > High > Normal)', () => {
    assert.strictEqual(PRIORITY_WEIGHTS.Emergency, 3);
    assert.strictEqual(PRIORITY_WEIGHTS.High, 2);
    assert.strictEqual(PRIORITY_WEIGHTS.Normal, 1);
  });

  it('orders patients by triage priority tier correctly', () => {
    const normalPatient = {
      id: 'P001',
      token: 'T001',
      priority: 'Normal',
      registeredAt: '2026-10-21T09:00:00Z',
      status: 'Waiting'
    };
    const emergencyPatient = {
      id: 'P002',
      token: 'T002',
      priority: 'Emergency',
      registeredAt: '2026-10-21T09:30:00Z',
      status: 'Waiting'
    };
    const highPatient = {
      id: 'P003',
      token: 'T003',
      priority: 'High',
      registeredAt: '2026-10-21T09:15:00Z',
      status: 'Waiting'
    };

    // Emergency should precede High and Normal
    assert.ok(comparePatientsPriority(emergencyPatient, normalPatient) < 0);
    assert.ok(comparePatientsPriority(emergencyPatient, highPatient) < 0);
    assert.ok(comparePatientsPriority(highPatient, normalPatient) < 0);
  });

  it('uses First-Come First-Served (FIFO) timestamp ordering within same priority', () => {
    const patientEarly = {
      id: 'P001',
      priority: 'Normal',
      registeredAt: '2026-10-21T08:30:00Z',
      status: 'Waiting'
    };
    const patientLate = {
      id: 'P002',
      priority: 'Normal',
      registeredAt: '2026-10-21T09:00:00Z',
      status: 'Waiting'
    };

    assert.ok(comparePatientsPriority(patientEarly, patientLate) < 0);
    assert.ok(comparePatientsPriority(patientLate, patientEarly) > 0);
  });

  it('filters and sorts waiting queue accurately by department and doctor', () => {
    const patients = [
      { id: 'P001', department: 'Cardiology', doctor: 'Dr. Sharma', priority: 'Normal', registeredAt: '2026-10-21T08:00:00Z', status: 'Waiting' },
      { id: 'P002', department: 'Cardiology', doctor: 'Dr. Sharma', priority: 'Emergency', registeredAt: '2026-10-21T09:00:00Z', status: 'Waiting' },
      { id: 'P003', department: 'Orthopedics', doctor: 'Dr. Patil', priority: 'High', registeredAt: '2026-10-21T08:30:00Z', status: 'Waiting' },
      { id: 'P004', department: 'Cardiology', doctor: 'Dr. Sharma', priority: 'High', registeredAt: '2026-10-21T07:30:00Z', status: 'Completed' }
    ];

    const sortedCardio = getSortedWaitingQueue(patients, 'Cardiology', 'Dr. Sharma');
    assert.strictEqual(sortedCardio.length, 2);
    // Emergency must be first even though registered later
    assert.strictEqual(sortedCardio[0].id, 'P002');
    assert.strictEqual(sortedCardio[1].id, 'P001');
  });

  it('generates next sequential Token number monotonically', () => {
    assert.strictEqual(generateNextToken([]), 'T001');
    assert.strictEqual(generateNextToken([{ token: 'T001' }, { token: 'T002' }]), 'T003');
    assert.strictEqual(generateNextToken([{ token: 'T012' }, { token: 'T005' }]), 'T013');
    assert.strictEqual(generateNextToken([{ token: 'T099' }]), 'T100');
  });

  it('generates next sequential Patient ID monotonically', () => {
    assert.strictEqual(generateNextPatientId([]), 'P001');
    assert.strictEqual(generateNextPatientId([{ id: 'P001' }, { id: 'P004' }]), 'P005');
    assert.strictEqual(generateNextPatientId([{ id: 'P010' }]), 'P011');
  });

  it('calculates comprehensive queue statistics correctly', () => {
    const patients = [
      { id: 'P001', status: 'Waiting', priority: 'Emergency', doctor: 'Dr. A', registeredAt: '2026-10-21T09:00:00Z' },
      { id: 'P002', status: 'Waiting', priority: 'High', doctor: 'Dr. A', registeredAt: '2026-10-21T09:10:00Z' },
      { id: 'P003', status: 'In Consultation', priority: 'Normal', doctor: 'Dr. A', registeredAt: '2026-10-21T08:00:00Z' },
      { id: 'P004', status: 'Called', priority: 'Normal', doctor: 'Dr. B', registeredAt: '2026-10-21T08:30:00Z' },
      { id: 'P005', status: 'Completed', priority: 'Normal', doctor: 'Dr. B', registeredAt: '2026-10-21T07:30:00Z' }
    ];

    const stats = calculateQueueStats(patients);
    assert.strictEqual(stats.total, 5);
    assert.strictEqual(stats.waiting, 2);
    assert.strictEqual(stats.beingServed, 2); // 1 In Consultation + 1 Called
    assert.strictEqual(stats.completed, 1);
    assert.strictEqual(stats.emergency, 1);
    assert.strictEqual(stats.high, 1);
    assert.ok(stats.avgWait >= 0);
  });

  it('calculates estimated waiting time based on status and queue position', () => {
    const pCompleted = { id: 'P001', status: 'Completed' };
    assert.strictEqual(calculateEstimatedWaitTime(pCompleted, [pCompleted]), 0);

    const pCalled = { id: 'P002', status: 'Called' };
    assert.strictEqual(calculateEstimatedWaitTime(pCalled, [pCalled]), 2);

    const pWaitingEmergency = {
      id: 'P003',
      status: 'Waiting',
      priority: 'Emergency',
      doctor: 'Dr. A',
      registeredAt: '2026-10-21T09:00:00Z'
    };
    const waitTime = calculateEstimatedWaitTime(pWaitingEmergency, [pWaitingEmergency]);
    assert.ok(waitTime >= 3);
  });

  it('formats display time cleanly and handles edge cases', () => {
    assert.strictEqual(formatTimeDisplay(''), '--:--');
    assert.strictEqual(formatTimeDisplay(null), '--:--');
    assert.strictEqual(formatTimeDisplay('invalid-date'), '--:--');
    const valid = formatTimeDisplay('2026-10-21T10:30:00Z');
    assert.ok(typeof valid === 'string' && valid.length >= 4);
  });
});
