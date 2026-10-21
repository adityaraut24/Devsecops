import React from 'react';
import { Modal } from './Modal';
import { useHospital } from '../context/HospitalContext';
import {
  User,
  Phone,
  Calendar,
  Clock,
  Activity,
  FileText,
  Stethoscope,
  Building,
  CheckCircle,
  PhoneCall,
  Play
} from 'lucide-react';

export const PatientDetailModal = ({ patient, isOpen, onClose }) => {
  const { callSpecificPatient, startConsultation, completeConsultation } = useHospital();

  if (!patient) return null;

  const formatDate = (isoStr) => {
    if (!isoStr) return 'Not recorded';
    try {
      return new Date(isoStr).toLocaleString([], {
        dateStyle: 'medium',
        timeStyle: 'short'
      });
    } catch {
      return isoStr;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Patient Queue Record – ${patient.token}`} maxWidth="560px">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {/* Profile Card Summary */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', backgroundColor: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
          <div>
            <h4 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>{patient.name}</h4>
            <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>
              ID: <strong>{patient.id}</strong> &bull; {patient.age} Years &bull; {patient.gender}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span className="token-pill" style={{ fontSize: 14, padding: '4px 10px' }}>{patient.token}</span>
            <div style={{ fontSize: 11, fontWeight: 700, color: patient.priority === 'Emergency' ? '#be123c' : (patient.priority === 'High' ? '#b45309' : '#0284c7'), marginTop: 4 }}>
              {patient.priority} Priority
            </div>
          </div>
        </div>

        {/* Department & Doctor Assignment */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: 13 }}>
          <div style={{ padding: 10, borderRadius: 8, backgroundColor: '#f1f5f9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#64748b', fontSize: 11, fontWeight: 600 }}>
              <Building size={13} />
              <span>DEPARTMENT</span>
            </div>
            <strong style={{ color: '#0f172a', display: 'block', marginTop: 3 }}>{patient.department}</strong>
          </div>

          <div style={{ padding: 10, borderRadius: 8, backgroundColor: '#f1f5f9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#64748b', fontSize: 11, fontWeight: 600 }}>
              <Stethoscope size={13} />
              <span>DOCTOR</span>
            </div>
            <strong style={{ color: '#0f172a', display: 'block', marginTop: 3 }}>{patient.doctor}</strong>
          </div>

          <div style={{ padding: 10, borderRadius: 8, backgroundColor: '#f1f5f9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#64748b', fontSize: 11, fontWeight: 600 }}>
              <Phone size={13} />
              <span>CONTACT</span>
            </div>
            <strong style={{ color: '#0f172a', display: 'block', marginTop: 3 }}>+91 {patient.phone}</strong>
          </div>

          <div style={{ padding: 10, borderRadius: 8, backgroundColor: '#f1f5f9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#64748b', fontSize: 11, fontWeight: 600 }}>
              <Activity size={13} />
              <span>CURRENT STATUS</span>
            </div>
            <strong style={{ color: '#0f172a', display: 'block', marginTop: 3 }}>{patient.status}</strong>
          </div>
        </div>

        {/* Symptoms & Visit Notes */}
        <div>
          <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Reported Symptoms / Triage Complaint:
          </label>
          <div style={{ marginTop: 4, padding: 12, backgroundColor: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13, color: '#1e293b' }}>
            {patient.symptoms || 'None specified.'}
          </div>
        </div>

        {patient.notes && (
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Visit / Consultation Notes:
            </label>
            <div style={{ marginTop: 4, padding: 12, backgroundColor: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0', fontSize: 13, color: '#14532d' }}>
              {patient.notes}
            </div>
          </div>
        )}

        {/* Timeline Tracking */}
        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 14 }}>
          <h5 style={{ fontSize: 12, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>
            Queue Lifecycle Milestones:
          </h5>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12, color: '#64748b' }}>
            <div>&bull; Registered: <strong>{formatDate(patient.registeredAt)}</strong></div>
            {patient.calledAt && <div>&bull; Called to Cabin: <strong>{formatDate(patient.calledAt)}</strong></div>}
            {patient.consultationStartedAt && <div>&bull; In Consultation: <strong>{formatDate(patient.consultationStartedAt)}</strong></div>}
            {patient.completedAt && <div>&bull; Completed: <strong>{formatDate(patient.completedAt)}</strong></div>}
            {patient.cancelledAt && <div>&bull; Cancelled: <strong>{formatDate(patient.cancelledAt)}</strong></div>}
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, borderTop: '1px solid #e2e8f0', paddingTop: 14 }}>
          {patient.status === 'Waiting' && (
            <button
              onClick={() => {
                callSpecificPatient(patient.id);
                onClose();
              }}
              className="btn btn-primary btn-sm"
            >
              <PhoneCall size={14} />
              <span>Call Patient Now</span>
            </button>
          )}

          {patient.status === 'Called' && (
            <button
              onClick={() => {
                startConsultation(patient.id);
                onClose();
              }}
              className="btn btn-secondary btn-sm"
              style={{ backgroundColor: '#ccfbf1', color: '#0f766e', borderColor: '#99f6e4' }}
            >
              <Play size={14} />
              <span>Begin Doctor Consultation</span>
            </button>
          )}

          {patient.status === 'In Consultation' && (
            <button
              onClick={() => {
                completeConsultation(patient.id);
                onClose();
              }}
              className="btn btn-success btn-sm"
            >
              <CheckCircle size={14} />
              <span>Mark Consultation Completed</span>
            </button>
          )}

          <button onClick={onClose} className="btn btn-outline btn-sm">
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};
