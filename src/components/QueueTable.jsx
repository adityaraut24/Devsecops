import React from 'react';
import { useHospital } from '../context/HospitalContext';
import { calculateEstimatedWaitTime, formatTimeDisplay } from '../utils/queueUtils';
import {
  PhoneCall,
  Play,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  XCircle
} from 'lucide-react';

export const QueueTable = ({
  patientsList,
  onSelectPatient,
  showActions = true,
  emptyMessage = 'No patients currently in this queue.'
}) => {
  const { patients, callSpecificPatient, startConsultation, completeConsultation, cancelPatient } = useHospital();

  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 'Emergency':
        return 'badge-priority-emergency';
      case 'High':
        return 'badge-priority-high';
      default:
        return 'badge-priority-normal';
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Waiting':
        return 'badge-status-waiting';
      case 'Called':
        return 'badge-status-called';
      case 'In Consultation':
        return 'badge-status-in-consultation';
      case 'Completed':
        return 'badge-status-completed';
      case 'Cancelled':
        return 'badge-status-cancelled';
      default:
        return 'badge-status-waiting';
    }
  };

  if (!patientsList || patientsList.length === 0) {
    return (
      <div style={{ padding: '36px 20px', textAlign: 'center', backgroundColor: '#ffffff', borderRadius: 12, border: '1px solid #e2e8f0' }}>
        <Clock size={36} color="#94a3b8" style={{ margin: '0 auto 10px' }} />
        <p style={{ fontSize: 14, fontWeight: 600, color: '#475569' }}>{emptyMessage}</p>
        <span style={{ fontSize: 12, color: '#94a3b8' }}>Patients registered at reception will automatically appear here.</span>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table-custom">
        <thead>
          <tr>
            <th>Token No.</th>
            <th>Patient Name</th>
            <th>Age / Gen</th>
            <th>Department</th>
            <th>Doctor</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Waiting Time</th>
            {showActions && <th style={{ textAlign: 'right' }}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {patientsList.map((patient) => {
            const estimatedWait = calculateEstimatedWaitTime(patient, patients);

            return (
              <tr key={patient.id}>
                {/* Token */}
                <td>
                  <span className="token-pill">{patient.token}</span>
                </td>

                {/* Name & ID */}
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span
                      style={{ fontWeight: 600, color: '#0f172a', cursor: onSelectPatient ? 'pointer' : 'default' }}
                      onClick={() => onSelectPatient && onSelectPatient(patient)}
                      title="Click to view details"
                    >
                      {patient.name}
                    </span>
                    <span style={{ fontSize: 11, color: '#64748b' }}>
                      ID: {patient.id} &bull; {patient.visitType}
                    </span>
                  </div>
                </td>

                {/* Age & Gender */}
                <td>
                  <span style={{ color: '#334155', fontWeight: 500 }}>
                    {patient.age}y &bull; {patient.gender === 'Female' ? 'F' : (patient.gender === 'Male' ? 'M' : 'O')}
                  </span>
                </td>

                {/* Department */}
                <td>
                  <span style={{ fontWeight: 500, color: '#0f172a' }}>{patient.department}</span>
                </td>

                {/* Doctor */}
                <td>
                  <span style={{ fontSize: 12.5, color: '#475569' }}>{patient.doctor}</span>
                </td>

                {/* Priority */}
                <td>
                  <span className={`badge ${getPriorityBadgeClass(patient.priority)}`}>
                    {patient.priority === 'Emergency' && '🚨 '}
                    {patient.priority === 'High' && '⚡ '}
                    {patient.priority}
                  </span>
                </td>

                {/* Status */}
                <td>
                  <span className={`badge ${getStatusBadgeClass(patient.status)}`}>
                    {patient.status}
                  </span>
                </td>

                {/* Waiting Time */}
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Clock size={13} color="#64748b" />
                    <span style={{ fontWeight: 600, color: patient.status === 'Waiting' ? '#d97706' : '#64748b' }}>
                      {patient.status === 'Waiting'
                        ? `~${estimatedWait} min`
                        : patient.status === 'Called'
                        ? 'Now at Cabin'
                        : patient.status === 'In Consultation'
                        ? 'In Room'
                        : '--'}
                    </span>
                  </div>
                  <span style={{ fontSize: 10, color: '#94a3b8' }}>
                    Reg: {formatTimeDisplay(patient.registeredAt)}
                  </span>
                </td>

                {/* Actions */}
                {showActions && (
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6 }}>
                      {onSelectPatient && (
                        <button
                          onClick={() => onSelectPatient(patient)}
                          className="btn btn-outline btn-sm"
                          title="View patient details"
                          style={{ padding: '4px 8px' }}
                        >
                          <Eye size={13} />
                        </button>
                      )}

                      {patient.status === 'Waiting' && (
                        <button
                          onClick={() => callSpecificPatient(patient.id)}
                          className="btn btn-primary btn-sm"
                          title="Call patient to cabin"
                        >
                          <PhoneCall size={13} />
                          <span>Call</span>
                        </button>
                      )}

                      {patient.status === 'Called' && (
                        <button
                          onClick={() => startConsultation(patient.id)}
                          className="btn btn-secondary btn-sm"
                          style={{ backgroundColor: '#ccfbf1', color: '#0f766e', borderColor: '#99f6e4' }}
                          title="Begin doctor examination"
                        >
                          <Play size={13} />
                          <span>Consult</span>
                        </button>
                      )}

                      {patient.status === 'In Consultation' && (
                        <button
                          onClick={() => completeConsultation(patient.id)}
                          className="btn btn-success btn-sm"
                          title="Complete consultation"
                        >
                          <CheckCircle2 size={13} />
                          <span>Done</span>
                        </button>
                      )}

                      {patient.status === 'Waiting' && (
                        <button
                          onClick={() => {
                            if (window.confirm(`Cancel queue token for ${patient.name}?`)) {
                              cancelPatient(patient.id, 'Cancelled from queue');
                            }
                          }}
                          className="btn btn-outline btn-sm"
                          style={{ color: '#e11d48', borderColor: '#fecdd3', padding: '4px 8px' }}
                          title="Cancel registration"
                        >
                          <XCircle size={13} />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
