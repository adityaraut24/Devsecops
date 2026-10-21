import React from 'react';
import { Modal } from './Modal';
import {
  CheckCircle,
  Clock,
  Printer,
  User,
  Building,
  Stethoscope,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

export const TokenReceiptModal = ({ patient, isOpen, onClose, onViewQueue }) => {
  if (!patient) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Registration Confirmed & Token Issued" maxWidth="480px">
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            backgroundColor: '#d1fae5',
            color: '#059669',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px'
          }}
        >
          <CheckCircle size={30} />
        </div>
        <h4 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a' }}>
          Queue Token Assigned
        </h4>
        <p style={{ fontSize: 12.5, color: '#64748b' }}>
          Patient has been prioritized and placed into the live hospital queue.
        </p>
      </div>

      {/* Styled Medical Token Slip */}
      <div
        style={{
          border: '2px dashed #0284c7',
          borderRadius: 14,
          padding: '20px',
          backgroundColor: '#f0f9ff',
          marginBottom: 20,
          position: 'relative'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #bae6fd', paddingBottom: 10, marginBottom: 14 }}>
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0369a1' }}>
              Hospital OPD Token Slip
            </span>
            <div style={{ fontSize: 11, color: '#64748b' }}>ID: {patient.id}</div>
          </div>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              padding: '3px 8px',
              borderRadius: 9999,
              backgroundColor: patient.priority === 'Emergency' ? '#ffe4e6' : (patient.priority === 'High' ? '#fef3c7' : '#e0f2fe'),
              color: patient.priority === 'Emergency' ? '#be123c' : (patient.priority === 'High' ? '#b45309' : '#0369a1')
            }}
          >
            {patient.priority} Priority
          </span>
        </div>

        {/* Big Token Number */}
        <div style={{ textAlign: 'center', margin: '14px 0' }}>
          <span style={{ fontSize: 12, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Your Queue Token</span>
          <div style={{ fontSize: 44, fontWeight: 800, color: '#0284c7', letterSpacing: '2px', lineHeight: 1.1 }}>
            {patient.token}
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 6, padding: '4px 12px', borderRadius: 9999, backgroundColor: '#ffffff', border: '1px solid #bae6fd', fontSize: 12, fontWeight: 600, color: '#0369a1' }}>
            <Clock size={13} />
            Estimated Wait: ~{patient.estimatedWaitTime || 15} minutes
          </div>
        </div>

        {/* Breakdown details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, borderTop: '1px solid #bae6fd', paddingTop: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#64748b' }}>Patient Name:</span>
            <strong style={{ color: '#0f172a' }}>{patient.name} ({patient.age}y / {patient.gender})</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#64748b' }}>Department:</span>
            <span style={{ color: '#0f172a', fontWeight: 600 }}>{patient.department}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#64748b' }}>Assigned Doctor:</span>
            <span style={{ color: '#0f172a', fontWeight: 600 }}>{patient.doctor}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#64748b' }}>Visit Type:</span>
            <span style={{ color: '#0f172a' }}>{patient.visitType}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#64748b' }}>Contact:</span>
            <span style={{ color: '#0f172a' }}>+91 {patient.phone}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
        <button onClick={handlePrint} className="btn btn-secondary btn-sm" title="Print token slip">
          <Printer size={14} />
          <span>Print Slip</span>
        </button>
        <button
          onClick={() => {
            onClose();
            if (onViewQueue) onViewQueue();
          }}
          className="btn btn-primary btn-sm"
        >
          <span>View Live Queue</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </Modal>
  );
};
