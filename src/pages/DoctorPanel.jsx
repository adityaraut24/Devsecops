import React, { useState, useMemo } from 'react';
import { useHospital } from '../context/HospitalContext';
import { getSortedWaitingQueue } from '../utils/queueUtils';
import {
  Stethoscope,
  PhoneCall,
  Play,
  CheckCircle2,
  SkipForward,
  User,
  Clock,
  AlertTriangle,
  FileText,
  Building,
  History,
  Activity
} from 'lucide-react';

export const DoctorPanel = () => {
  const {
    patients,
    departments,
    callNextPatient,
    startConsultation,
    completeConsultation,
    skipPatient
  } = useHospital();

  // Selected doctor cabin: default to Dr. Ramesh Kulkarni
  const [selectedDoctorName, setSelectedDoctorName] = useState('Dr. Ramesh Kulkarni');
  const [consultationNotes, setConsultationNotes] = useState('');

  // Find selected doctor object and their department
  const doctorInfo = useMemo(() => {
    for (const d of departments) {
      const match = d.doctors.find(doc => doc.name === selectedDoctorName);
      if (match) {
        return { ...match, department: d.name };
      }
    }
    return { name: selectedDoctorName, department: 'General Medicine', room: 'Cabin 101' };
  }, [selectedDoctorName, departments]);

  // Patients for this specific doctor
  const doctorPatients = useMemo(() => {
    return patients.filter(p => p.doctor === selectedDoctorName);
  }, [patients, selectedDoctorName]);

  // Current active patient in consultation
  const activeConsultation = doctorPatients.find(p => p.status === 'In Consultation');

  // Currently called patient (arriving at cabin)
  const currentlyCalled = doctorPatients.find(p => p.status === 'Called');

  // Waiting queue for this doctor in priority order
  const waitingQueue = useMemo(() => {
    return getSortedWaitingQueue(doctorPatients);
  }, [doctorPatients]);

  // Next up patient
  const nextUpPatient = waitingQueue[0] || null;

  // Recently completed patients for this doctor
  const completedPatients = useMemo(() => {
    return doctorPatients
      .filter(p => p.status === 'Completed')
      .slice(0, 5);
  }, [doctorPatients]);

  // Action Handlers
  const handleCallNext = () => {
    callNextPatient(doctorInfo.department, doctorInfo.name);
  };

  const handleStartConsultation = () => {
    if (currentlyCalled) {
      startConsultation(currentlyCalled.id);
    } else if (nextUpPatient) {
      startConsultation(nextUpPatient.id);
    }
  };

  const handleComplete = () => {
    if (activeConsultation) {
      completeConsultation(activeConsultation.id, consultationNotes);
      setConsultationNotes('');
    }
  };

  const handleSkip = () => {
    if (currentlyCalled) {
      skipPatient(currentlyCalled.id);
    } else if (activeConsultation) {
      skipPatient(activeConsultation.id);
    }
  };

  return (
    <div className="page-container">
      {/* Header and Doctor Cabin Switcher */}
      <div className="page-header">
        <div className="page-header-text">
          <h2>Doctor Examination Panel & Cabin Station</h2>
          <p>Level 1 DFD Process 4.0 &bull; Cabin consultation, patient calling, and consultation status tracking.</p>
        </div>

        {/* Doctor Selector Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>Select Physician Cabin:</span>
          <select
            value={selectedDoctorName}
            onChange={(e) => {
              setSelectedDoctorName(e.target.value);
              setConsultationNotes('');
            }}
            className="form-select"
            style={{ fontWeight: 700, color: '#0284c7', borderColor: '#0284c7' }}
          >
            {departments.flatMap(d => d.doctors).map(doc => (
              <option key={doc.id} value={doc.name}>
                {doc.name} ({doc.room})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Doctor Header Banner Card */}
      <div
        className="card"
        style={{
          marginBottom: 24,
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          color: 'white',
          border: 'none',
          padding: '24px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                backgroundColor: 'rgba(2, 132, 199, 0.25)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#38bdf8'
              }}
            >
              <Stethoscope size={28} />
            </div>
            <div>
              <div style={{ fontSize: 12, textTransform: 'uppercase', color: '#38bdf8', fontWeight: 700, letterSpacing: '0.05em' }}>
                Active Physician Session &bull; {doctorInfo.room}
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: '#ffffff', margin: '2px 0 4px' }}>
                {doctorInfo.name}
              </h3>
              <div style={{ fontSize: 13, color: '#cbd5e1' }}>
                Department of <strong>{doctorInfo.department}</strong> &bull; {doctorInfo.qualification || 'MBBS, MD'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 18 }}>
            <div style={{ textAlign: 'right', borderRight: '1px solid rgba(255,255,255,0.15)', paddingRight: 18 }}>
              <div style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase' }}>Waiting Outside</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#f59e0b' }}>{waitingQueue.length}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase' }}>Consulted Today</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#10b981' }}>{completedPatients.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Active Patient & Actions + Queue Feeder */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 24, marginBottom: 24 }}>
        
        {/* CURRENT PATIENT IN CONSULTATION / CALLED CARD */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Activity size={18} color="#0d9488" />
              <span>Current Cabin Examination</span>
            </div>
            {activeConsultation ? (
              <span className="badge badge-status-in-consultation">In Consultation</span>
            ) : currentlyCalled ? (
              <span className="badge badge-status-called">Called to Cabin</span>
            ) : (
              <span style={{ fontSize: 12, color: '#94a3b8' }}>Cabin Idle</span>
            )}
          </div>

          {activeConsultation || currentlyCalled ? (
            <div>
              {(() => {
                const current = activeConsultation || currentlyCalled;
                return (
                  <div>
                    {/* Patient Summary Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '14px', backgroundColor: '#f0f9ff', borderRadius: 12, border: '1px solid #bae6fd', marginBottom: 16 }}>
                      <div>
                        <span className="token-pill" style={{ fontSize: 15, padding: '4px 10px' }}>{current.token}</span>
                        <h4 style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', marginTop: 6 }}>{current.name}</h4>
                        <div style={{ fontSize: 12, color: '#64748b' }}>
                          {current.age}y &bull; {current.gender} &bull; {current.visitType} &bull; ID: {current.id}
                        </div>
                      </div>
                      <span
                        className="badge"
                        style={{
                          backgroundColor: current.priority === 'Emergency' ? '#ffe4e6' : (current.priority === 'High' ? '#fef3c7' : '#e0f2fe'),
                          color: current.priority === 'Emergency' ? '#be123c' : (current.priority === 'High' ? '#b45309' : '#0369a1'),
                          fontWeight: 700
                        }}
                      >
                        {current.priority === 'Emergency' && '🚨 '}
                        {current.priority} Priority
                      </span>
                    </div>

                    {/* Symptoms & Vitals */}
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Presenting Complaints:</label>
                      <div style={{ marginTop: 4, padding: 10, backgroundColor: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13, color: '#1e293b' }}>
                        {current.symptoms}
                      </div>
                    </div>

                    {/* Doctor Consultation Notes Input (Process 4.0 -> D3) */}
                    <div style={{ marginBottom: 18 }}>
                      <label style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                        Consultation Notes / Visit Remarks (Optional):
                      </label>
                      <textarea
                        value={consultationNotes}
                        onChange={(e) => setConsultationNotes(e.target.value)}
                        placeholder="Enter optional consultation remarks, general advice, or follow-up notes..."
                        className="form-textarea"
                        style={{ marginTop: 4, minHeight: 90 }}
                      />
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      {currentlyCalled && (
                        <button
                          onClick={handleStartConsultation}
                          className="btn btn-primary"
                          style={{ flex: 1 }}
                        >
                          <Play size={15} />
                          <span>Start Consultation</span>
                        </button>
                      )}

                      {activeConsultation && (
                        <button
                          onClick={handleComplete}
                          className="btn btn-success"
                          style={{ flex: 1 }}
                        >
                          <CheckCircle2 size={15} />
                          <span>Complete Consultation</span>
                        </button>
                      )}

                      <button
                        onClick={handleSkip}
                        className="btn btn-outline"
                        title="Skip patient and return to queue"
                      >
                        <SkipForward size={14} />
                        <span>Skip Patient</span>
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 20px', backgroundColor: '#f8fafc', borderRadius: 12, border: '1px dashed #cbd5e1' }}>
              <Stethoscope size={36} color="#94a3b8" style={{ margin: '0 auto 10px' }} />
              <h4 style={{ fontSize: 15, fontWeight: 700, color: '#475569' }}>Cabin is Currently Idle</h4>
              <p style={{ fontSize: 12.5, color: '#64748b', maxWidth: 320, margin: '4px auto 16px' }}>
                {waitingQueue.length > 0
                  ? `There are ${waitingQueue.length} patient(s) waiting in the queue for ${doctorInfo.name}.`
                  : 'No patients are currently queued for this cabin.'}
              </p>
              {waitingQueue.length > 0 && (
                <button
                  onClick={handleCallNext}
                  className="btn btn-primary"
                >
                  <PhoneCall size={15} />
                  <span>Call Next Patient ({nextUpPatient?.token})</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* UP NEXT & WAITING QUEUE FOR THIS CABIN */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Clock size={18} color="#0284c7" />
              <span>Next In Line &bull; Waiting Queue</span>
            </div>
            <button
              onClick={handleCallNext}
              disabled={waitingQueue.length === 0}
              className="btn btn-primary btn-sm"
            >
              <PhoneCall size={13} />
              <span>Call Next</span>
            </button>
          </div>

          {/* Up Next Highlight */}
          {nextUpPatient && (
            <div style={{ padding: '12px 16px', backgroundColor: '#fffbeb', border: '1px solid #fde68a', borderRadius: 10, marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#b45309', textTransform: 'uppercase' }}>
                Next Priority Patient To Be Called:
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
                <div>
                  <strong style={{ fontSize: 14, color: '#0f172a' }}>{nextUpPatient.name}</strong>
                  <div style={{ fontSize: 12, color: '#64748b' }}>
                    Token: <span className="token-pill">{nextUpPatient.token}</span> &bull; {nextUpPatient.age}y &bull; {nextUpPatient.priority}
                  </div>
                </div>
                <button
                  onClick={handleCallNext}
                  className="btn btn-secondary btn-sm"
                  style={{ backgroundColor: '#ffffff', borderColor: '#fde68a' }}
                >
                  Call Now
                </button>
              </div>
            </div>
          )}

          {/* Waiting Patients List */}
          <div style={{ maxHeight: 260, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {waitingQueue.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '24px 10px', color: '#94a3b8', fontSize: 13 }}>
                No waiting patients for this cabin.
              </div>
            ) : (
              waitingQueue.map((p, index) => (
                <div
                  key={p.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: 8,
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    fontSize: 12.5
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', width: 18 }}>#{index + 1}</span>
                    <span className="token-pill">{p.token}</span>
                    <div>
                      <strong style={{ color: '#0f172a' }}>{p.name}</strong>
                      <span style={{ color: '#64748b', marginLeft: 6 }}>({p.age}y)</span>
                    </div>
                  </div>
                  <span
                    className="badge"
                    style={{
                      fontSize: 11,
                      backgroundColor: p.priority === 'Emergency' ? '#ffe4e6' : (p.priority === 'High' ? '#fef3c7' : '#e0f2fe'),
                      color: p.priority === 'Emergency' ? '#be123c' : (p.priority === 'High' ? '#b45309' : '#0369a1')
                    }}
                  >
                    {p.priority}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* RECENTLY COMPLETED IN THIS CABIN */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <History size={18} color="#059669" />
            <span>Recently Completed Consultations in this Cabin</span>
          </div>
          <span style={{ fontSize: 12, color: '#64748b' }}>Consultation Records (Data Store D3)</span>
        </div>

        {completedPatients.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '24px', color: '#94a3b8', fontSize: 13 }}>
            No completed consultations logged yet for this cabin today.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table-custom">
              <thead>
                <tr>
                  <th>Token</th>
                  <th>Patient Name</th>
                  <th>Age/Gender</th>
                  <th>Visit Type</th>
                  <th>Completed At</th>
                  <th>Consultation Notes</th>
                </tr>
              </thead>
              <tbody>
                {completedPatients.map(p => (
                  <tr key={p.id}>
                    <td><span className="token-pill">{p.token}</span></td>
                    <td><strong style={{ color: '#0f172a' }}>{p.name}</strong></td>
                    <td>{p.age}y &bull; {p.gender}</td>
                    <td>{p.visitType}</td>
                    <td style={{ color: '#64748b' }}>
                      {p.completedAt ? new Date(p.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Today'}
                    </td>
                    <td style={{ maxWidth: 350, fontSize: 12.5, color: '#334155' }}>
                      {p.notes || 'Consultation completed.'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
