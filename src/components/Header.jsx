import React, { useState, useEffect } from 'react';
import { useHospital } from '../context/HospitalContext';
import {
  Clock,
  Bell,
  RotateCcw,
  Menu,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';

export const Header = ({ onToggleSidebar }) => {
  const { notifications, resetDemoData, stats } = useHospital();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleReset = () => {
    if (window.confirm('Reset queue data to default demo state? This will re-initialize all 12 sample patients.')) {
      resetDemoData();
    }
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <button
          className="mobile-menu-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <Menu size={22} />
        </button>
        <div className="header-title-wrap">
          <h1>Hospital Queue Management System</h1>
          <p>SEPM CIAP Micro Project &bull; Structured Design Demonstration</p>
        </div>
      </div>

      <div className="header-right">
        {/* Real-time Clock */}
        <div className="header-clock" title="System synchronized time">
          <Clock size={15} className="text-sky-600" />
          <span>
            {currentTime.toLocaleDateString(undefined, {
              weekday: 'short',
              month: 'short',
              day: 'numeric'
            })}{' '}
            &bull; {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
        </div>

        {/* Reset Demo Data Button */}
        <button
          onClick={handleReset}
          className="header-btn header-btn-danger"
          title="Restore original 12 sample patients for presentation"
        >
          <RotateCcw size={14} />
          <span>Reset Demo Data</span>
        </button>

        {/* Notification Bell & Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            className="notification-bell-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            title="View system triage & queue notifications"
          >
            <Bell size={18} />
            {notifications.length > 0 && <span className="notification-badge-dot" />}
          </button>

          {showNotifications && (
            <div className="notification-dropdown">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, paddingBottom: 6, borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ fontWeight: 700, fontSize: 13, color: '#0f172a' }}>Live System Events</span>
                <span style={{ fontSize: 11, color: '#64748b' }}>{notifications.length} updates</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 260, overflowY: 'auto' }}>
                {notifications.map(n => (
                  <div
                    key={n.id}
                    style={{
                      display: 'flex',
                      gap: 8,
                      alignItems: 'flex-start',
                      fontSize: 12,
                      padding: '6px 8px',
                      borderRadius: 6,
                      backgroundColor: n.type === 'urgent' ? '#fff1f2' : (n.type === 'success' ? '#f0fdf4' : '#f8fafc'),
                      border: '1px solid ' + (n.type === 'urgent' ? '#fecdd3' : (n.type === 'success' ? '#bbf7d0' : '#e2e8f0'))
                    }}
                  >
                    {n.type === 'urgent' ? (
                      <AlertTriangle size={14} color="#e11d48" style={{ flexShrink: 0, marginTop: 2 }} />
                    ) : n.type === 'success' ? (
                      <CheckCircle2 size={14} color="#059669" style={{ flexShrink: 0, marginTop: 2 }} />
                    ) : (
                      <Info size={14} color="#0284c7" style={{ flexShrink: 0, marginTop: 2 }} />
                    )}
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, color: '#1e293b', fontWeight: 500, lineHeight: 1.3 }}>{n.text}</p>
                      <span style={{ fontSize: 10, color: '#94a3b8' }}>{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User / Profile Area */}
        <div className="profile-pill">
          <div className="avatar-initials">OPD</div>
          <div className="profile-info">
            <div className="profile-name">OPD Reception</div>
            <div className="profile-role">Admin / Triage</div>
          </div>
        </div>
      </div>
    </header>
  );
};
