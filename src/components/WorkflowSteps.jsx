import React from 'react';
import {
  UserPlus,
  Ticket,
  ListOrdered,
  AlertTriangle,
  Megaphone,
  Stethoscope,
  RefreshCw,
  CheckCircle,
  FileText,
  ChevronRight
} from 'lucide-react';

export const WorkflowSteps = ({ onNavigate }) => {
  const steps = [
    {
      num: '1',
      title: 'Registration',
      desc: 'Patient details entered',
      icon: UserPlus,
      color: '#0284c7',
      bg: '#e0f2fe',
      tab: 'registration'
    },
    {
      num: '2',
      title: 'Token Generation',
      desc: 'Unique ID & slip issued',
      icon: Ticket,
      color: '#0284c7',
      bg: '#e0f2fe',
      tab: 'registration'
    },
    {
      num: '3',
      title: 'Queue Entry',
      desc: 'Placed in department queue',
      icon: ListOrdered,
      color: '#0d9488',
      bg: '#ccfbf1',
      tab: 'queue'
    },
    {
      num: '4',
      title: 'Priority Assignment',
      desc: 'Emergency > High > Normal',
      icon: AlertTriangle,
      color: '#e11d48',
      bg: '#ffe4e6',
      tab: 'queue'
    },
    {
      num: '5',
      title: 'Doctor Calls',
      desc: 'Doctor panel signals token',
      icon: Megaphone,
      color: '#7c3aed',
      bg: '#ede9fe',
      tab: 'doctor'
    },
    {
      num: '6',
      title: 'Consultation',
      desc: 'Doctor patient session',
      icon: Stethoscope,
      color: '#0284c7',
      bg: '#e0f2fe',
      tab: 'doctor'
    },
    {
      num: '7',
      title: 'Status Update',
      desc: 'Live state tracking',
      icon: RefreshCw,
      color: '#d97706',
      bg: '#fef3c7',
      tab: 'queue'
    },
    {
      num: '8',
      title: 'Completion',
      desc: 'Consultation finished',
      icon: CheckCircle,
      color: '#059669',
      bg: '#d1fae5',
      tab: 'records'
    },
    {
      num: '9',
      title: 'Reports',
      desc: 'Metrics & DFD audit',
      icon: FileText,
      color: '#475569',
      bg: '#f1f5f9',
      tab: 'reports'
    }
  ];

  return (
    <div className="card" style={{ marginBottom: 24, padding: '18px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>🏥 System Workflow Pipeline</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: 9999 }}>
              Structured SEPM Lifecycle
            </span>
          </h3>
          <p style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>
            Sequential data transformation and queue state machine from patient intake to analytics.
          </p>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
        gap: 8,
        alignItems: 'stretch'
      }}>
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              onClick={() => onNavigate && onNavigate(step.tab)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '12px 8px',
                borderRadius: 10,
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = step.color;
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              title={`Click to navigate to ${step.title}`}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  backgroundColor: step.bg,
                  color: step.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 8
                }}
              >
                <Icon size={16} />
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                Step {step.num}
              </span>
              <strong style={{ fontSize: 12, fontWeight: 700, color: '#0f172a', marginTop: 2, lineHeight: 1.2 }}>
                {step.title}
              </strong>
              <span style={{ fontSize: 10, color: '#64748b', marginTop: 4, lineHeight: 1.2 }}>
                {step.desc}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
