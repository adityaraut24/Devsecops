import React, { useState, useMemo } from 'react';
import { useHospital } from '../context/HospitalContext';
import { PatientDetailModal } from '../components/PatientDetailModal';
import { formatTimeDisplay } from '../utils/queueUtils';
import {
  ClipboardList,
  Search,
  Filter,
  Eye,
  Download,
  Building,
  RefreshCw,
  FileSpreadsheet
} from 'lucide-react';

export const PatientRecords = () => {
  const { patients, departments } = useHospital();
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Filter & Search state
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [visitTypeFilter, setVisitTypeFilter] = useState('ALL');

  // Filtered patients
  const filteredPatients = useMemo(() => {
    return patients.filter(p => {
      if (deptFilter !== 'ALL' && p.department !== deptFilter) return false;
      if (statusFilter !== 'ALL' && p.status !== statusFilter) return false;
      if (priorityFilter !== 'ALL' && p.priority !== priorityFilter) return false;
      if (visitTypeFilter !== 'ALL' && p.visitType !== visitTypeFilter) return false;

      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchToken = p.token.toLowerCase().includes(q);
        const matchId = p.id.toLowerCase().includes(q);
        const matchPhone = p.phone ? p.phone.includes(q) : false;
        const matchSymptoms = p.symptoms ? p.symptoms.toLowerCase().includes(q) : false;
        if (!matchName && !matchToken && !matchId && !matchPhone && !matchSymptoms) return false;
      }

      return true;
    });
  }, [patients, deptFilter, statusFilter, priorityFilter, visitTypeFilter, searchTerm]);

  // Export CSV feature
  const exportToCSV = () => {
    const headers = ['Patient ID', 'Token', 'Name', 'Age', 'Gender', 'Phone', 'Department', 'Doctor', 'Visit Type', 'Priority', 'Status', 'Registered At', 'Symptoms'];
    const rows = filteredPatients.map(p => [
      p.id,
      p.token,
      `"${p.name}"`,
      p.age,
      p.gender,
      p.phone,
      `"${p.department}"`,
      `"${p.doctor}"`,
      p.visitType,
      p.priority,
      p.status,
      `"${p.registeredAt}"`,
      `"${(p.symptoms || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Hospital_Patient_Records_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="page-container">
      {/* Header Banner */}
      <div className="page-header">
        <div className="page-header-text">
          <h2>Patient Queue Records</h2>
          <p>Level 1 DFD Data Store D1 (Patient Database) &bull; Centralized Queue Registry</p>
        </div>
        <div className="page-header-actions">
          <button
            onClick={exportToCSV}
            className="btn btn-secondary btn-sm"
            title="Download CSV database dump for offline audit"
          >
            <Download size={14} />
            <span>Export to CSV</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="filter-bar">
        {/* Search Input */}
        <div className="search-input-wrap">
          <Search size={15} />
          <input
            type="text"
            placeholder="Search by patient name, token, ID, phone, symptoms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Department Filter */}
        <select
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          className="form-select"
          style={{ width: 'auto', padding: '7px 10px', fontSize: 12.5 }}
        >
          <option value="ALL">All Departments</option>
          {departments.map(d => (
            <option key={d.id} value={d.name}>{d.name}</option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="form-select"
          style={{ width: 'auto', padding: '7px 10px', fontSize: 12.5 }}
        >
          <option value="ALL">All Statuses</option>
          <option value="Waiting">Waiting</option>
          <option value="Called">Called</option>
          <option value="In Consultation">In Consultation</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        {/* Priority Filter */}
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="form-select"
          style={{ width: 'auto', padding: '7px 10px', fontSize: 12.5 }}
        >
          <option value="ALL">All Priorities</option>
          <option value="Emergency">🚨 Emergency</option>
          <option value="High">⚡ High</option>
          <option value="Normal">Normal</option>
        </select>

        {/* Visit Type */}
        <select
          value={visitTypeFilter}
          onChange={(e) => setVisitTypeFilter(e.target.value)}
          className="form-select"
          style={{ width: 'auto', padding: '7px 10px', fontSize: 12.5 }}
        >
          <option value="ALL">All Visit Types</option>
          <option value="New Patient">New Patient</option>
          <option value="Follow-up">Follow-up</option>
        </select>

        {/* Reset */}
        {(searchTerm || deptFilter !== 'ALL' || statusFilter !== 'ALL' || priorityFilter !== 'ALL' || visitTypeFilter !== 'ALL') && (
          <button
            onClick={() => {
              setSearchTerm('');
              setDeptFilter('ALL');
              setStatusFilter('ALL');
              setPriorityFilter('ALL');
              setVisitTypeFilter('ALL');
            }}
            className="btn btn-outline btn-sm"
          >
            <RefreshCw size={12} />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Main Records Table */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <ClipboardList size={18} color="#0284c7" />
            <span>Patient Queue Records</span>
            <span style={{ fontSize: 12, fontWeight: 500, color: '#64748b' }}>
              ({filteredPatients.length} of {patients.length} total records)
            </span>
          </div>
          <span style={{ fontSize: 12, color: '#64748b' }}>Click &ldquo;View Details&rdquo; for patient registration &amp; queue details</span>
        </div>

        {filteredPatients.length === 0 ? (
          <div style={{ padding: '36px', textAlign: 'center', color: '#94a3b8' }}>
            No patient records match the specified filters.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table-custom">
              <thead>
                <tr>
                  <th>Patient ID</th>
                  <th>Token</th>
                  <th>Patient Name</th>
                  <th>Age / Gen</th>
                  <th>Department</th>
                  <th>Doctor</th>
                  <th>Visit Type</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Registration Time</th>
                  <th style={{ textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <tr key={patient.id}>
                    <td>
                      <span style={{ fontFamily: 'monospace', fontWeight: 600, color: '#475569' }}>
                        {patient.id}
                      </span>
                    </td>
                    <td>
                      <span className="token-pill">{patient.token}</span>
                    </td>
                    <td>
                      <strong
                        style={{ color: '#0f172a', cursor: 'pointer' }}
                        onClick={() => setSelectedPatient(patient)}
                      >
                        {patient.name}
                      </strong>
                    </td>
                    <td>
                      {patient.age}y &bull; {patient.gender === 'Female' ? 'F' : 'M'}
                    </td>
                    <td>{patient.department}</td>
                    <td style={{ fontSize: 12.5, color: '#475569' }}>{patient.doctor}</td>
                    <td>
                      <span style={{ fontSize: 12, color: '#334155' }}>{patient.visitType}</span>
                    </td>
                    <td>
                      <span
                        className="badge"
                        style={{
                          backgroundColor: patient.priority === 'Emergency' ? '#ffe4e6' : (patient.priority === 'High' ? '#fef3c7' : '#e0f2fe'),
                          color: patient.priority === 'Emergency' ? '#be123c' : (patient.priority === 'High' ? '#b45309' : '#0369a1')
                        }}
                      >
                        {patient.priority}
                      </span>
                    </td>
                    <td>
                      <span
                        className="badge"
                        style={{
                          backgroundColor:
                            patient.status === 'Completed' ? '#d1fae5' :
                            patient.status === 'In Consultation' ? '#ccfbf1' :
                            patient.status === 'Called' ? '#ede9fe' :
                            patient.status === 'Waiting' ? '#fef9c3' : '#f1f5f9',
                          color:
                            patient.status === 'Completed' ? '#047857' :
                            patient.status === 'In Consultation' ? '#0f766e' :
                            patient.status === 'Called' ? '#6d28d9' :
                            patient.status === 'Waiting' ? '#a16207' : '#64748b'
                        }}
                      >
                        {patient.status}
                      </span>
                    </td>
                    <td style={{ color: '#64748b', fontSize: 12 }}>
                      {formatTimeDisplay(patient.registeredAt)}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        onClick={() => setSelectedPatient(patient)}
                        className="btn btn-outline btn-sm"
                        title="View patient details and queue history"
                      >
                        <Eye size={13} />
                        <span>Details</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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
