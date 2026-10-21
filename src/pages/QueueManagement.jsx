import React, { useState, useMemo } from 'react';
import { useHospital } from '../context/HospitalContext';
import { QueueTable } from '../components/QueueTable';
import { PatientDetailModal } from '../components/PatientDetailModal';
import {
  Users,
  Filter,
  PhoneCall,
  Search,
  ListOrdered,
  RefreshCw,
  AlertTriangle,
  Building,
  Stethoscope,
  Info
} from 'lucide-react';
import { comparePatientsPriority } from '../utils/queueUtils';

export const QueueManagement = () => {
  const { patients, departments, callNextPatient } = useHospital();
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Filters state
  const [statusFilter, setStatusFilter] = useState('ALL'); // ALL, Waiting, Called, In Consultation, Completed
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [doctorFilter, setDoctorFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract doctors list for selected department filter
  const availableDoctors = useMemo(() => {
    if (deptFilter === 'ALL') {
      return departments.flatMap(d => d.doctors);
    }
    const found = departments.find(d => d.name === deptFilter);
    return found ? found.doctors : [];
  }, [deptFilter, departments]);

  // Filtered and prioritized queue list
  const filteredQueue = useMemo(() => {
    return patients
      .filter(p => {
        if (statusFilter !== 'ALL' && p.status !== statusFilter) return false;
        if (deptFilter !== 'ALL' && p.department !== deptFilter) return false;
        if (doctorFilter !== 'ALL' && p.doctor !== doctorFilter) return false;
        if (priorityFilter !== 'ALL' && p.priority !== priorityFilter) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchToken = p.token.toLowerCase().includes(q);
          const matchId = p.id.toLowerCase().includes(q);
          if (!matchName && !matchToken && !matchId) return false;
        }
        return true;
      })
      .sort((a, b) => {
        // If viewing waiting patients, sort strictly by triage priority
        if (a.status === 'Waiting' && b.status === 'Waiting') {
          return comparePatientsPriority(a, b);
        }
        // Otherwise sort by most recent activity
        return new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime();
      });
  }, [patients, statusFilter, deptFilter, doctorFilter, priorityFilter, searchQuery]);

  // Counts for tab badges
  const counts = useMemo(() => ({
    all: patients.length,
    waiting: patients.filter(p => p.status === 'Waiting').length,
    called: patients.filter(p => p.status === 'Called').length,
    inConsultation: patients.filter(p => p.status === 'In Consultation').length,
    completed: patients.filter(p => p.status === 'Completed').length
  }), [patients]);

  return (
    <div className="page-container">
      {/* Header Banner */}
      <div className="page-header">
        <div className="page-header-text">
          <h2>Queue Dispatch & Flow Management</h2>
          <p>Level 1 DFD Process 3.0 &bull; Priority Queuing Engine (Emergency &gt; High &gt; Normal, FIFO within tier)</p>
        </div>
        <div className="page-header-actions">
          <button
            onClick={() => callNextPatient(deptFilter === 'ALL' ? '' : deptFilter, doctorFilter === 'ALL' ? '' : doctorFilter)}
            className="btn btn-primary"
            title="Dispatch the highest priority waiting patient matching current department/doctor"
          >
            <PhoneCall size={16} />
            <span>Call Next in Queue</span>
          </button>
        </div>
      </div>

      {/* SEPM Priority Dispatch Explanation Card */}
      <div
        style={{
          padding: '12px 18px',
          backgroundColor: '#eff6ff',
          borderRadius: 12,
          border: '1px solid #bfdbfe',
          marginBottom: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 12
        }}
      >
        <Info size={20} color="#0284c7" style={{ flexShrink: 0 }} />
        <div style={{ fontSize: 12.5, color: '#1e3a8a' }}>
          <strong>Queue Scheduling Algorithm:</strong> Preemptive Multi-level Priority Queue.
          Emergency tier patients bypass ordinary queues immediately. High priority cases take precedence over Normal cases.
          Within equal priority ranks, First-Come First-Served (FCFS) timestamp scheduling applies.
        </div>
      </div>

      {/* Status Segment Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto', paddingBottom: 4 }}>
        {[
          { id: 'ALL', label: 'All Queue', count: counts.all },
          { id: 'Waiting', label: 'Waiting', count: counts.waiting },
          { id: 'Called', label: 'Called to Cabin', count: counts.called },
          { id: 'In Consultation', label: 'In Consultation', count: counts.inConsultation },
          { id: 'Completed', label: 'Completed', count: counts.completed }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setStatusFilter(tab.id)}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: '1px solid',
              borderColor: statusFilter === tab.id ? '#0284c7' : '#e2e8f0',
              backgroundColor: statusFilter === tab.id ? '#0284c7' : '#ffffff',
              color: statusFilter === tab.id ? '#ffffff' : '#475569',
              fontWeight: 600,
              fontSize: 13,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease'
            }}
          >
            <span>{tab.label}</span>
            <span
              style={{
                fontSize: 11,
                padding: '2px 6px',
                borderRadius: 9999,
                backgroundColor: statusFilter === tab.id ? 'rgba(255,255,255,0.25)' : '#f1f5f9',
                color: statusFilter === tab.id ? '#ffffff' : '#64748b'
              }}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Filter Toolbar */}
      <div className="filter-bar">
        {/* Search */}
        <div className="search-input-wrap">
          <Search size={15} />
          <input
            type="text"
            placeholder="Search by patient name, token (e.g. T004), or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Department Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Building size={14} color="#64748b" />
          <select
            value={deptFilter}
            onChange={(e) => {
              setDeptFilter(e.target.value);
              setDoctorFilter('ALL');
            }}
            className="form-select"
            style={{ padding: '7px 10px', fontSize: 12.5, width: 'auto' }}
          >
            <option value="ALL">All Departments</option>
            {departments.map(d => (
              <option key={d.id} value={d.name}>{d.name}</option>
            ))}
          </select>
        </div>

        {/* Doctor Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Stethoscope size={14} color="#64748b" />
          <select
            value={doctorFilter}
            onChange={(e) => setDoctorFilter(e.target.value)}
            className="form-select"
            style={{ padding: '7px 10px', fontSize: 12.5, width: 'auto' }}
          >
            <option value="ALL">All Doctors</option>
            {availableDoctors.map(doc => (
              <option key={doc.id} value={doc.name}>{doc.name}</option>
            ))}
          </select>
        </div>

        {/* Priority Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <AlertTriangle size={14} color="#64748b" />
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="form-select"
            style={{ padding: '7px 10px', fontSize: 12.5, width: 'auto' }}
          >
            <option value="ALL">All Priorities</option>
            <option value="Emergency">🚨 Emergency Only</option>
            <option value="High">⚡ High Priority</option>
            <option value="Normal">Normal Priority</option>
          </select>
        </div>

        {/* Clear Filters */}
        {(statusFilter !== 'ALL' || deptFilter !== 'ALL' || doctorFilter !== 'ALL' || priorityFilter !== 'ALL' || searchQuery) && (
          <button
            onClick={() => {
              setStatusFilter('ALL');
              setDeptFilter('ALL');
              setDoctorFilter('ALL');
              setPriorityFilter('ALL');
              setSearchQuery('');
            }}
            className="btn btn-outline btn-sm"
          >
            <RefreshCw size={12} />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* Main Queue Table */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <ListOrdered size={18} color="#0284c7" />
            <span>Active Queue Registry</span>
            <span style={{ fontSize: 12, fontWeight: 500, color: '#64748b' }}>
              ({filteredQueue.length} records matching criteria)
            </span>
          </div>
          <span style={{ fontSize: 12, color: '#64748b' }}>
            Queue transitions: <strong>Waiting &rarr; Called &rarr; In Consultation &rarr; Completed</strong>
          </span>
        </div>

        <QueueTable
          patientsList={filteredQueue}
          onSelectPatient={(p) => setSelectedPatient(p)}
          showActions={true}
          emptyMessage="No patient records found for the applied filters."
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
