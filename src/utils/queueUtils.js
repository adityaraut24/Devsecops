// Priority weight: Emergency (3) > High (2) > Normal (1)
export const PRIORITY_WEIGHTS = {
  Emergency: 3,
  High: 2,
  Normal: 1
};

/**
 * Sorts patients strictly following SEPM Queue Priority Logic:
 * 1. Priority tier: Emergency > High > Normal
 * 2. FIFO order within the same priority tier (earlier registeredAt comes first)
 */
export const comparePatientsPriority = (a, b) => {
  const weightA = PRIORITY_WEIGHTS[a.priority] || 1;
  const weightB = PRIORITY_WEIGHTS[b.priority] || 1;

  if (weightA !== weightB) {
    return weightB - weightA; // higher priority first
  }

  // Same priority: First-Come, First-Served (earlier registration timestamp first)
  const timeA = new Date(a.registeredAt).getTime();
  const timeB = new Date(b.registeredAt).getTime();
  return timeA - timeB;
};

/**
 * Filter and sort waiting patients in priority order
 */
export const getSortedWaitingQueue = (patients, filterDepartment = '', filterDoctor = '') => {
  return patients
    .filter(p => p.status === 'Waiting')
    .filter(p => !filterDepartment || p.department === filterDepartment)
    .filter(p => !filterDoctor || p.doctor === filterDoctor)
    .sort(comparePatientsPriority);
};

/**
 * Calculate dynamic estimated waiting time for a waiting patient
 */
export const calculateEstimatedWaitTime = (patient, allPatients) => {
  if (patient.status === 'In Consultation' || patient.status === 'Completed' || patient.status === 'Cancelled') {
    return 0;
  }
  if (patient.status === 'Called') {
    return 2; // Approaching cabin immediately
  }

  // Find queue position among waiting patients for the same doctor/department
  const doctorQueue = getSortedWaitingQueue(allPatients, '', patient.doctor);
  const position = doctorQueue.findIndex(p => p.id === patient.id);

  if (position === -1) {
    // If not found in specific doctor queue, fallback to general waiting queue position
    const generalQueue = getSortedWaitingQueue(allPatients, patient.department);
    const genPos = generalQueue.findIndex(p => p.id === patient.id);
    return Math.max(5, (genPos + 1) * 12);
  }

  // Emergency cases get immediate priority estimation
  if (patient.priority === 'Emergency') {
    return Math.max(3, position * 5);
  }

  // Standard doctor consultation average is approx 12-15 minutes
  return (position + 1) * 12;
};

/**
 * Generates next sequential Token number (e.g. T013)
 */
export const generateNextToken = (patients) => {
  let maxNum = 0;
  patients.forEach(p => {
    if (p.token && p.token.startsWith('T')) {
      const num = parseInt(p.token.slice(1), 10);
      if (!isNaN(num) && num > maxNum) {
        maxNum = num;
      }
    }
  });
  const nextNum = maxNum + 1;
  return `T${String(nextNum).padStart(3, '0')}`;
};

/**
 * Generates next sequential Patient ID (e.g. P013)
 */
export const generateNextPatientId = (patients) => {
  let maxNum = 0;
  patients.forEach(p => {
    if (p.id && p.id.startsWith('P')) {
      const num = parseInt(p.id.slice(1), 10);
      if (!isNaN(num) && num > maxNum) {
        maxNum = num;
      }
    }
  });
  const nextNum = maxNum + 1;
  return `P${String(nextNum).padStart(3, '0')}`;
};

/**
 * Calculates dynamic statistics across all patients
 */
export const calculateQueueStats = (patients) => {
  const total = patients.length;
  const waiting = patients.filter(p => p.status === 'Waiting').length;
  const beingServed = patients.filter(p => p.status === 'In Consultation' || p.status === 'Called').length;
  const completed = patients.filter(p => p.status === 'Completed').length;
  const emergency = patients.filter(p => p.priority === 'Emergency' && p.status === 'Waiting').length;
  const high = patients.filter(p => p.priority === 'High' && p.status === 'Waiting').length;

  // Average waiting time calculation
  const waitingPatients = patients.filter(p => p.status === 'Waiting');
  let avgWait = 18; // default baseline
  if (waitingPatients.length > 0) {
    const totalEst = waitingPatients.reduce((acc, p) => acc + calculateEstimatedWaitTime(p, patients), 0);
    avgWait = Math.round(totalEst / waitingPatients.length);
  }

  return {
    total,
    waiting,
    beingServed,
    completed,
    emergency,
    high,
    avgWait
  };
};

/**
 * Formats time from ISO string or timestamp
 */
export const formatTimeDisplay = (isoString) => {
  if (!isoString) return '--:--';
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return '--:--';
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch {
    return '--:--';
  }
};
