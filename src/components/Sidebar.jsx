import React from 'react';
import { useHospital } from '../context/HospitalContext';
import {
  LayoutDashboard,
  UserPlus,
  Users,
  Stethoscope,
  ClipboardList,
  BarChart3,
  GitBranch,
  Info,
  Activity,
  X
} from 'lucide-react';

export const Sidebar = ({ activeTab, setActiveTab, isOpen, onClose }) => {
  const { stats, projectDetails } = useHospital();

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'registration',
      label: 'Patient Registration',
      icon: UserPlus,
      badge: 'New'
    },
    {
      id: 'queue',
      label: 'Queue Management',
      icon: Users,
      badge: stats.waiting > 0 ? stats.waiting : null
    },
    {
      id: 'doctor',
      label: 'Doctor Panel',
      icon: Stethoscope,
      badge: stats.beingServed > 0 ? `${stats.beingServed} active` : null
    },
    {
      id: 'records',
      label: 'Patient Records',
      icon: ClipboardList,
      badge: stats.total
    },
    {
      id: 'reports',
      label: 'Reports & Analytics',
      icon: BarChart3,
      badge: null
    },
    {
      id: 'system-design',
      label: 'DFD & Structure Chart',
      icon: GitBranch,
      badge: 'SEPM'
    },
    {
      id: 'about',
      label: 'About Project',
      icon: Info,
      badge: null
    }
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    if (onClose) {
      onClose();
    }
  };

  return (
    <aside className={`app-sidebar ${isOpen ? 'open' : ''}`}>
      {/* Brand Header */}
      <div className="sidebar-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="sidebar-brand">
            <div className="brand-icon-box">
              <Activity size={24} />
            </div>
            <div>
              <div className="brand-title">MED-QUEUE</div>
              <div className="brand-subtitle">SEPM CIAP Portal</div>
            </div>
          </div>
          {isOpen && (
            <button
              onClick={onClose}
              style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Nav Menu */}
      <div className="sidebar-nav">
        <div className="nav-section-label">Main Navigation</div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`nav-link ${isActive ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              <Icon size={18} />
              <span>{item.label}</span>
              {item.badge && (
                <span className="badge-counter">{item.badge}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Student Academic Info Card */}
      <div className="sidebar-footer">
        <div className="student-badge-card">
          <div className="student-badge-title">CIAP Micro Project</div>
          <div className="student-badge-name" title={projectDetails.student.name}>
            {projectDetails.student.name}
          </div>
          <div className="student-badge-meta">
            Roll: <strong style={{ color: '#e2e8f0' }}>{projectDetails.student.rollNo}</strong>
          </div>
          <div className="student-badge-meta" style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            <span>{projectDetails.curriculum.co} (Bloom 4)</span>
            <span style={{ color: '#38bdf8' }}>{projectDetails.curriculum.psoMapping[0].id}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
