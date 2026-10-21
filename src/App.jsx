import React, { useState } from 'react';
import { HospitalProvider, useHospital } from './context/HospitalContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { PatientRegistration } from './pages/PatientRegistration';
import { QueueManagement } from './pages/QueueManagement';
import { DoctorPanel } from './pages/DoctorPanel';
import { PatientRecords } from './pages/PatientRecords';
import { Reports } from './pages/Reports';
import { SystemDesign } from './pages/SystemDesign';
import { About } from './pages/About';
import { CheckCircle2, AlertTriangle, Info } from 'lucide-react';

const AppContent = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toastMessage } = useHospital();

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigate={(tab) => setActiveTab(tab)} />;
      case 'registration':
        return <PatientRegistration onNavigate={(tab) => setActiveTab(tab)} />;
      case 'queue':
        return <QueueManagement />;
      case 'doctor':
        return <DoctorPanel />;
      case 'records':
        return <PatientRecords />;
      case 'reports':
        return <Reports />;
      case 'system-design':
        return <SystemDesign />;
      case 'about':
        return <About />;
      default:
        return <Dashboard onNavigate={(tab) => setActiveTab(tab)} />;
    }
  };

  return (
    <div className="app-container">
      {/* Persistent Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main App Workspace */}
      <div className="app-main">
        {/* Top Header */}
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Page Content */}
        <main style={{ flex: 1 }}>
          {renderActivePage()}
        </main>

        {/* Floating Toast Alert */}
        {toastMessage && (
          <div className="toast-container">
            <div className={`toast toast-${toastMessage.type}`}>
              {toastMessage.type === 'success' && <CheckCircle2 size={16} color="#10b981" />}
              {toastMessage.type === 'warning' && <AlertTriangle size={16} color="#f59e0b" />}
              {toastMessage.type === 'urgent' && <AlertTriangle size={16} color="#f43f5e" />}
              {toastMessage.type === 'info' && <Info size={16} color="#38bdf8" />}
              <span>{toastMessage.message}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <HospitalProvider>
      <AppContent />
    </HospitalProvider>
  );
}
