import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { DEPARTMENTS, INITIAL_PATIENTS, PROJECT_DETAILS } from '../data/initialData';
import { loadPatientsFromStorage, savePatientsToStorage, clearAndResetStorage } from '../utils/storage';
import {
  generateNextToken,
  generateNextPatientId,
  calculateQueueStats,
  getSortedWaitingQueue,
  calculateEstimatedWaitTime
} from '../utils/queueUtils';

const HospitalContext = createContext(null);

export const HospitalProvider = ({ children }) => {
  const [patients, setPatients] = useState(() => loadPatientsFromStorage());
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Emergency alert: Priority triage enabled for emergency tokens.', time: 'Just now', type: 'urgent' },
    { id: 2, text: 'Queue system synchronized with LocalStorage persistence.', time: '1m ago', type: 'info' }
  ]);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to local storage whenever patients change
  useEffect(() => {
    savePatientsToStorage(patients);
  }, [patients]);

  const showToast = (message, type = 'info') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const addNotification = (text, type = 'info') => {
    const newNotif = {
      id: Date.now(),
      text,
      time: 'Just now',
      type
    };
    setNotifications(prev => [newNotif, ...prev.slice(0, 9)]);
  };

  // Register New Patient
  const registerPatient = (formData) => {
    const nextToken = generateNextToken(patients);
    const nextId = generateNextPatientId(patients);
    const nowIso = new Date().toISOString();

    const newPatient = {
      id: nextId,
      token: nextToken,
      name: formData.name.trim(),
      age: parseInt(formData.age, 10),
      gender: formData.gender,
      phone: formData.phone.trim(),
      department: formData.department,
      doctor: formData.doctor,
      visitType: formData.visitType || 'New Patient',
      priority: formData.priority || 'Normal',
      symptoms: formData.symptoms ? formData.symptoms.trim() : 'General health checkup',
      appointmentDate: formData.appointmentDate || new Date().toISOString().split('T')[0],
      registeredAt: nowIso,
      status: 'Waiting',
      notes: formData.notes ? formData.notes.trim() : 'Registered at Reception Desk'
    };

    setPatients(prev => [newPatient, ...prev]);

    // Add notification
    const priorityBadge = newPatient.priority === 'Emergency' ? '🚨 [EMERGENCY]' : (newPatient.priority === 'High' ? '⚡ [HIGH]' : '');
    addNotification(`${priorityBadge} Patient ${newPatient.name} assigned Token ${nextToken} (${newPatient.department})`, newPatient.priority === 'Emergency' ? 'urgent' : 'info');
    showToast(`Token ${nextToken} generated for ${newPatient.name}!`, 'success');

    // Return created patient details including calculated wait time
    const estimatedMinutes = calculateEstimatedWaitTime(newPatient, [newPatient, ...patients]);
    return { ...newPatient, estimatedWaitTime: estimatedMinutes };
  };

  // Call Next Patient in Queue (global or specific to department/doctor)
  const callNextPatient = (filterDept = '', filterDoc = '') => {
    const waitingQueue = getSortedWaitingQueue(patients, filterDept, filterDoc);

    if (waitingQueue.length === 0) {
      showToast(filterDoc ? `No waiting patients for ${filterDoc}` : 'No waiting patients in queue!', 'warning');
      return null;
    }

    const nextPatient = waitingQueue[0];
    const updated = patients.map(p => {
      if (p.id === nextPatient.id) {
        return {
          ...p,
          status: 'Called',
          calledAt: new Date().toISOString()
        };
      }
      return p;
    });

    setPatients(updated);
    addNotification(`🔔 Token ${nextPatient.token} (${nextPatient.name}) called to ${nextPatient.doctor || 'Cabin'}`, 'info');
    showToast(`Called Token ${nextPatient.token} (${nextPatient.name})`, 'info');
    return nextPatient;
  };

  // Call a specific patient directly by ID
  const callSpecificPatient = (patientId) => {
    let calledPatient = null;
    const updated = patients.map(p => {
      if (p.id === patientId) {
        calledPatient = { ...p, status: 'Called', calledAt: new Date().toISOString() };
        return calledPatient;
      }
      return p;
    });
    if (calledPatient) {
      setPatients(updated);
      addNotification(`🔔 Token ${calledPatient.token} (${calledPatient.name}) called`, 'info');
      showToast(`Called Token ${calledPatient.token}`, 'info');
    }
  };

  // Start Consultation
  const startConsultation = (patientId) => {
    let patientObj = null;
    const updated = patients.map(p => {
      if (p.id === patientId) {
        patientObj = {
          ...p,
          status: 'In Consultation',
          consultationStartedAt: new Date().toISOString()
        };
        return patientObj;
      }
      return p;
    });
    if (patientObj) {
      setPatients(updated);
      addNotification(`🩺 Dr. ${patientObj.doctor} started consultation for Token ${patientObj.token} (${patientObj.name})`, 'info');
      showToast(`Consultation started for ${patientObj.name}`, 'info');
    }
  };

  // Complete Consultation
  const completeConsultation = (patientId, clinicalNotes = '') => {
    let completedPatient = null;
    const updated = patients.map(p => {
      if (p.id === patientId) {
        completedPatient = {
          ...p,
          status: 'Completed',
          completedAt: new Date().toISOString(),
          notes: clinicalNotes ? `${p.notes ? p.notes + ' | ' : ''}${clinicalNotes}` : p.notes
        };
        return completedPatient;
      }
      return p;
    });
    if (completedPatient) {
      setPatients(updated);
      addNotification(`✅ Consultation completed for Token ${completedPatient.token} (${completedPatient.name})`, 'success');
      showToast(`Consultation completed for ${completedPatient.name}`, 'success');
    }
  };

  // Cancel patient
  const cancelPatient = (patientId, reason = 'Patient cancelled/No show') => {
    const updated = patients.map(p => {
      if (p.id === patientId) {
        return {
          ...p,
          status: 'Cancelled',
          cancelledAt: new Date().toISOString(),
          notes: `${p.notes ? p.notes + ' | ' : ''}Cancelled: ${reason}`
        };
      }
      return p;
    });
    setPatients(updated);
    showToast('Queue entry cancelled', 'warning');
  };

  // Skip Patient (re-queue or move down)
  const skipPatient = (patientId) => {
    const updated = patients.map(p => {
      if (p.id === patientId) {
        return {
          ...p,
          status: 'Waiting',
          registeredAt: new Date().toISOString(), // resets FIFO timer to end
          notes: `${p.notes ? p.notes + ' | ' : ''}Skipped by doctor; re-queued.`
        };
      }
      return p;
    });
    setPatients(updated);
    showToast('Patient skipped and re-queued', 'info');
  };

  // Reset Demo Data
  const resetDemoData = () => {
    const fresh = clearAndResetStorage();
    setPatients([...fresh]);
    showToast('Hospital Demo Data reset to default!', 'success');
    addNotification('🔄 System reset to initial SEPM demo records.', 'info');
  };

  // Computed queue statistics
  const stats = useMemo(() => calculateQueueStats(patients), [patients]);

  return (
    <HospitalContext.Provider
      value={{
        patients,
        departments: DEPARTMENTS,
        stats,
        notifications,
        toastMessage,
        projectDetails: PROJECT_DETAILS,
        registerPatient,
        callNextPatient,
        callSpecificPatient,
        startConsultation,
        completeConsultation,
        cancelPatient,
        skipPatient,
        resetDemoData,
        showToast
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
};

export const useHospital = () => {
  const context = useContext(HospitalContext);
  if (!context) {
    throw new Error('useHospital must be used within a HospitalProvider');
  }
  return context;
};
