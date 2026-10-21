// Hospital Departments and Doctors configuration
export const DEPARTMENTS = [
  {
    id: 'general',
    name: 'General Medicine',
    code: 'GEN',
    avgConsultationMinutes: 12,
    doctors: [
      { id: 'doc-1', name: 'Dr. Ramesh Kulkarni', qualification: 'MBBS, MD (Gen Med)', room: 'Cabin 101' },
      { id: 'doc-2', name: 'Dr. Sunita Deshmukh', qualification: 'MBBS, DNB', room: 'Cabin 102' }
    ]
  },
  {
    id: 'cardiology',
    name: 'Cardiology',
    code: 'CARD',
    avgConsultationMinutes: 20,
    doctors: [
      { id: 'doc-3', name: 'Dr. Vikram Joshi', qualification: 'MD, DM (Cardiology)', room: 'Cabin 201' },
      { id: 'doc-4', name: 'Dr. Anjali Mehta', qualification: 'MBBS, MD, FACC', room: 'Cabin 202' }
    ]
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics',
    code: 'PED',
    avgConsultationMinutes: 15,
    doctors: [
      { id: 'doc-5', name: 'Dr. Sneha Patil', qualification: 'MD (Pediatrics), DCH', room: 'Cabin 105' },
      { id: 'doc-6', name: 'Dr. Rahul Verma', qualification: 'MBBS, DNB (Pediatrics)', room: 'Cabin 106' }
    ]
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics',
    code: 'ORTH',
    avgConsultationMinutes: 18,
    doctors: [
      { id: 'doc-7', name: 'Dr. Arvind Rao', qualification: 'MS (Orthopedics)', room: 'Cabin 301' },
      { id: 'doc-8', name: 'Dr. Pooja Sharma', qualification: 'D.Ortho, DNB', room: 'Cabin 302' }
    ]
  },
  {
    id: 'dermatology',
    name: 'Dermatology',
    code: 'DERM',
    avgConsultationMinutes: 12,
    doctors: [
      { id: 'doc-9', name: 'Dr. Meera Nambiar', qualification: 'MD (Dermatology, Venereology)', room: 'Cabin 401' }
    ]
  },
  {
    id: 'ent',
    name: 'ENT',
    code: 'ENT',
    avgConsultationMinutes: 14,
    doctors: [
      { id: 'doc-10', name: 'Dr. Rajesh Gupta', qualification: 'MS (ENT)', room: 'Cabin 402' }
    ]
  }
];

// Helper to format timestamps today
const getTodayTime = (hoursAgo = 0, minutesAgo = 0) => {
  const d = new Date();
  d.setHours(d.getHours() - hoursAgo);
  d.setMinutes(d.getMinutes() - minutesAgo);
  return d.toISOString();
};

export const INITIAL_PATIENTS = [
  {
    id: 'P001',
    token: 'T001',
    name: 'Aarav Sharma',
    age: 34,
    gender: 'Male',
    phone: '9820145210',
    department: 'General Medicine',
    doctor: 'Dr. Ramesh Kulkarni',
    visitType: 'New Patient',
    priority: 'Normal',
    symptoms: 'Mild fever, dry cough, and persistent body ache for 3 days.',
    appointmentDate: new Date().toISOString().split('T')[0],
    registeredAt: getTodayTime(2, 45),
    status: 'Waiting',
    notes: 'Vitals stable. BP: 120/80 mmHg, SpO2: 98%.'
  },
  {
    id: 'P002',
    token: 'T002',
    name: 'Ananya Patil',
    age: 45,
    gender: 'Female',
    phone: '9845012389',
    department: 'Cardiology',
    doctor: 'Dr. Vikram Joshi',
    visitType: 'Follow-up',
    priority: 'High',
    symptoms: 'Elevated blood pressure spikes and intermittent palpitations.',
    appointmentDate: new Date().toISOString().split('T')[0],
    registeredAt: getTodayTime(2, 30),
    status: 'Waiting',
    notes: 'Prior history of hypertension. Advised ECG check.'
  },
  {
    id: 'P003',
    token: 'T003',
    name: 'Rohan Mehta',
    age: 8,
    gender: 'Male',
    phone: '9765412309',
    department: 'Pediatrics',
    doctor: 'Dr. Sneha Patil',
    visitType: 'New Patient',
    priority: 'Normal',
    symptoms: 'Seasonal runny nose, loss of appetite, and mild sore throat.',
    appointmentDate: new Date().toISOString().split('T')[0],
    registeredAt: getTodayTime(2, 15),
    status: 'Called',
    calledAt: getTodayTime(0, 8),
    notes: 'Accompanied by mother. No known allergies.'
  },
  {
    id: 'P004',
    token: 'T004',
    name: 'Priya Shah',
    age: 62,
    gender: 'Female',
    phone: '9819876543',
    department: 'Orthopedics',
    doctor: 'Dr. Arvind Rao',
    visitType: 'New Patient',
    priority: 'Emergency',
    symptoms: 'Acute ankle twisting injury after slip; severe swelling & inability to bear weight.',
    appointmentDate: new Date().toISOString().split('T')[0],
    registeredAt: getTodayTime(1, 50),
    status: 'Waiting',
    notes: 'Wheelchair provided at triage. Suspected malleolar fracture.'
  },
  {
    id: 'P005',
    token: 'T005',
    name: 'Neha Kulkarni',
    age: 28,
    gender: 'Female',
    phone: '9922334455',
    department: 'ENT',
    doctor: 'Dr. Rajesh Gupta',
    visitType: 'Follow-up',
    priority: 'Normal',
    symptoms: 'Sinus pressure, morning nasal blockage, and mild tinnitus.',
    appointmentDate: new Date().toISOString().split('T')[0],
    registeredAt: getTodayTime(3, 10),
    status: 'Completed',
    calledAt: getTodayTime(1, 45),
    completedAt: getTodayTime(1, 20),
    notes: 'Prescribed saline nasal rinse and anti-histamines. Review in 10 days.'
  },
  {
    id: 'P006',
    token: 'T006',
    name: 'Suresh Iyer',
    age: 54,
    gender: 'Male',
    phone: '9833441122',
    department: 'Cardiology',
    doctor: 'Dr. Vikram Joshi',
    visitType: 'Follow-up',
    priority: 'High',
    symptoms: 'Exertional chest discomfort and tightness around upper sternum.',
    appointmentDate: new Date().toISOString().split('T')[0],
    registeredAt: getTodayTime(1, 30),
    status: 'In Consultation',
    calledAt: getTodayTime(0, 20),
    notes: 'Undergoing live consultation and treadmill test assessment.'
  },
  {
    id: 'P007',
    token: 'T007',
    name: 'Kabir Khan',
    age: 31,
    gender: 'Male',
    phone: '9702331199',
    department: 'Dermatology',
    doctor: 'Dr. Meera Nambiar',
    visitType: 'New Patient',
    priority: 'Normal',
    symptoms: 'Pruritic erythematous rash across forearm with dry scaling.',
    appointmentDate: new Date().toISOString().split('T')[0],
    registeredAt: getTodayTime(1, 15),
    status: 'Waiting',
    notes: 'Suspected contact dermatitis from chemical detergent.'
  },
  {
    id: 'P008',
    token: 'T008',
    name: 'Devika Nair',
    age: 70,
    gender: 'Female',
    phone: '9821009944',
    department: 'General Medicine',
    doctor: 'Dr. Ramesh Kulkarni',
    visitType: 'Follow-up',
    priority: 'Emergency',
    symptoms: 'Severe breathlessness, high pulse rate, and disorientation.',
    appointmentDate: new Date().toISOString().split('T')[0],
    registeredAt: getTodayTime(1, 0),
    status: 'In Consultation',
    calledAt: getTodayTime(0, 15),
    notes: 'Oxygen support attached. Doctor evaluating pulmonary congestion.'
  },
  {
    id: 'P009',
    token: 'T009',
    name: 'Tanvi Joshi',
    age: 19,
    gender: 'Female',
    phone: '9890123456',
    department: 'Pediatrics',
    doctor: 'Dr. Sneha Patil',
    visitType: 'New Patient',
    priority: 'Normal',
    symptoms: 'Throat congestion, headache, and fatigue after college exams.',
    appointmentDate: new Date().toISOString().split('T')[0],
    registeredAt: getTodayTime(3, 40),
    status: 'Completed',
    calledAt: getTodayTime(2, 30),
    completedAt: getTodayTime(2, 0),
    notes: 'Viral pharyngitis diagnosed. Paracetamol and warm hydration advised.'
  },
  {
    id: 'P010',
    token: 'T010',
    name: 'Amit Bansal',
    age: 41,
    gender: 'Male',
    phone: '9769887766',
    department: 'Orthopedics',
    doctor: 'Dr. Arvind Rao',
    visitType: 'Follow-up',
    priority: 'Normal',
    symptoms: 'Knee joint stiffness and review of physiotherapy progress.',
    appointmentDate: new Date().toISOString().split('T')[0],
    registeredAt: getTodayTime(0, 50),
    status: 'Waiting',
    notes: 'Post-arthroscopy 4-week follow up.'
  },
  {
    id: 'P011',
    token: 'T011',
    name: 'Geeta Sonavane',
    age: 52,
    gender: 'Female',
    phone: '9820556677',
    department: 'General Medicine',
    doctor: 'Dr. Sunita Deshmukh',
    visitType: 'New Patient',
    priority: 'Normal',
    symptoms: 'Chronic fatigue, dizziness, and routine health checkup.',
    appointmentDate: new Date().toISOString().split('T')[0],
    registeredAt: getTodayTime(0, 35),
    status: 'Waiting',
    notes: 'Fasting blood sugar and lipid profile reports pending.'
  },
  {
    id: 'P012',
    token: 'T012',
    name: 'Vikram Rajput',
    age: 26,
    gender: 'Male',
    phone: '9811447788',
    department: 'ENT',
    doctor: 'Dr. Rajesh Gupta',
    visitType: 'New Patient',
    priority: 'High',
    symptoms: 'Sudden nasal bleeding (epistaxis) and pain around nasal bridge.',
    appointmentDate: new Date().toISOString().split('T')[0],
    registeredAt: getTodayTime(0, 25),
    status: 'Waiting',
    notes: 'Ice pack applied; nasal packing evaluated.'
  }
];

export const PROJECT_DETAILS = {
  title: "DFD and Structure-Chart-Based Design of a Hospital Queue Management System",
  student: {
    name: "Raut Aditya Manisha",
    rollNo: "124BTCS1047",
    course: "B.Tech Cyber Security",
    subject: "Software Engineering & Project Management (SEPM)",
    type: "CIAP Micro Project"
  },
  curriculum: {
    co: "CO4",
    coDescription: "Apply structured design methods, Data Flow Diagrams (DFD), and Structure Charts to architect scalable, modular software solutions.",
    bloomLevel: "Level 4 (Analyze)",
    poMapping: [
      { id: "PO1", name: "Engineering Knowledge", desc: "Applying structured analysis and design engineering concepts to healthcare queue optimization." },
      { id: "PO2", name: "Problem Analysis", desc: "Analyzing patient arrival bottlenecks, waiting times, and emergency triage queuing." },
      { id: "PO3", name: "Design/Development of Solutions", desc: "Designing hierarchical structure charts and DFD level 0/1 for seamless patient flow." },
      { id: "PO5", name: "Modern Tool Usage", desc: "Utilizing modern web development technologies (React, Vite, CSS Grid, Client Storage) for rapid prototyping." },
      { id: "PO6", name: "The Engineer and Society", desc: "Addressing long OPD queues, overcrowding, and public health efficiency." },
      { id: "PO8", name: "Ethics", desc: "Prioritizing emergency and critical patients ethically over standard walk-in orders." }
    ],
    psoMapping: [
      { id: "PSO2", name: "Secure & Resilient Systems", desc: "Applying modular software engineering practices and client-side data security principles." }
    ],
    sdgMapping: {
      goal: "SDG 3 – Good Health and Well-being",
      target: "Target 3.8: Access to quality essential healthcare services",
      justification: "The system helps reduce patient waiting time and improves healthcare service efficiency, preventing hospital congestion and ensuring timely care for emergency patients."
    }
  }
};
