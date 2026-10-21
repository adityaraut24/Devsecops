import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import { StatCard } from '../components/StatCard';
import { QueueTable } from '../components/QueueTable';
import { WorkflowSteps } from '../components/WorkflowSteps';
import { PatientDetailModal } from '../components/PatientDetailModal';
import {
  Users,
  Clock,
  Activity,
  CheckCircle2,
  Hourglass,
  PhoneCall,
  UserPlus,
  AlertTriangle,
  ArrowRight,
  Filter
} from 'lucide-react';

export const Dashboard = ({ onNavigate }) => {
  const { patients, stats, callNextPatient } = useHospital();
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [filterPriority, setFilterPriority] = useState('ALL');

  // Filter queue for dashboard display
  const activeQueue = patients.filter(p => {
    if (filterPriority === 'ALL') return true;
    return p.priority === filterPriority;
  });

  const waitingEmergencyCount = patients.filter(p => p.priority === 'Emergency' && p.status === 'Waiting').length;

  return (
    <div className="page-container">
      {/* Top Header Banner */}
      <div className="page-header">
        <div className="page-header-text">
          <h2>OPD Queue Operations Dashboard</h2>
          <p>Real-time outpatient department triage, patient tracking, and priority flow monitoring.</p>
        </div>
        <div className="page-header-actions">
          <button
            onClick={() => onNavigate('registration')}
            className="btn btn-secondary"
            title="Register new walk-in patient"
          >
            <UserPlus size={16} />
            <span>New Patient</span>
          </button>
          <button
            onClick={() => callNextPatient()}
            className="btn btn-primary"
            title="Automatically dispatch next highest-priority waiting patient"
          >
            <PhoneCall size={16} />
            <span>Call Next Patient</span>
          </button>
        </div>
      </div>

      {/* Emergency Attention Alert Banner */}
      {waitingEmergencyCount > 0 && (
        <div
          style={{
            backgroundColor: '#fff1f2',
            border: '1px solid #fecdd3',
            borderRadius: 12,
            padding: '14px 18px',
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            animation: 'fadeIn 0.3s ease'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: '#ffe4e6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e11d48' }}>
              <AlertTriangle size={20} />
            </div>
            <div>
              <strong style={{ color: '#be123c', fontSize: 14 }}>
                Emergency Alert: {waitingEmergencyCount} critical {waitingEmergencyCount === 1 ? 'patient is' : 'patients are'} waiting!
              </strong>
              <p style={{ fontSize: 12, color: '#9f1239', margin: 0 }}>
                SEPM Priority Queue rule dictates triage order: Emergency patients bypass Normal queue.
              </p>
            </div>
          </div>
          <button
            onClick={() => callNextPatient()}
            className="btn btn-danger btn-sm"
          >
            <PhoneCall size={13} />
            <span>Call Emergency Patient</span>
          </button>
        </div>
      )}

      {/* 5 Statistics Cards */}
      <div className="stats-grid">
        <StatCard
          title="Total Patients Today"
          value={stats.total}
          icon={Users}
          color="blue"
          meta="All registered OPD cases"
        />
        <StatCard
          title="Waiting Patients"
          value={stats.waiting}
          icon={Hourglass}
          color="amber"
          meta={stats.emergency > 0 ? `${stats.emergency} Emergency triage` : 'Standard queue backlog'}
          highlight={stats.waiting > 0}
        />
        <StatCard
          title="Being Served"
          value={stats.beingServed}
          icon={Activity}
          color="teal"
          meta="Called & in consultation"
        />
        <StatCard
          title="Completed Patients"
          value={stats.completed}
          icon={CheckCircle2}
          color="emerald"
          meta="Finished doctor consultations"
        />
        <StatCard
          title="Avg. Waiting Time"
          value={`${stats.avgWait} min`}
          icon={Clock}
          color="purple"
          meta="Dynamic calculation"
        />
      </div>

      {/* Visual System Workflow Pipeline */}
      <WorkflowSteps onNavigate={onNavigate} />

      {/* Current Queue Table Card */}
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">
              <Activity size={18} color="#0284c7" />
              <span>Current OPD Queue</span>
            </div>
            <div className="card-subtitle">
              Dynamic queue sorted by: Emergency &gt; High &gt; Normal (First-In-First-Served within priority)
            </div>
          </div>

          {/* Quick Priority Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>Filter:</span>
            <div style={{ display: 'flex', gap: 4, background: '#f8fafc', padding: 3, borderRadius: 8, border: '1px solid #e2e8f0' }}>
              {['ALL', 'Emergency', 'High', 'Normal'].map(p => (
                <button
                  key={p}
                  onClick={() => setFilterPriority(p)}
                  style={{
                    border: 'none',
                    background: filterPriority === p ? '#0284c7' : 'transparent',
                    color: filterPriority === p ? '#ffffff' : '#64748b',
                    fontSize: 11.5,
                    fontWeight: 600,
                    padding: '4px 9px',
                    borderRadius: 6,
                    cursor: 'pointer',
                    transition: 'all 0.15s'
                  }}
                >
                  {p}
                </button>
              ))}
            </div>

            <button
              onClick={() => onNavigate('queue')}
              className="btn btn-outline btn-sm"
              title="Open full Queue Management with filters"
            >
              <span>Full Manager</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* Live Queue Table */}
        <QueueTable
          patientsList={activeQueue}
          onSelectPatient={(p) => setSelectedPatient(p)}
          showActions={true}
          emptyMessage="No patients match the selected filter."
        />
      </div>

      {/* Patient Detail Modal */}
      <PatientDetailModal
        patient={selectedPatient}
        isOpen={Boolean(selectedPatient)}
        onClose={() => setSelectedPatient(null)}
      />
    </div>
  );
};
