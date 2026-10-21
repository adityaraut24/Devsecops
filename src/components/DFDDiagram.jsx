import React, { useState } from 'react';
import { Layers, ArrowRight, Database, Users, Shield, Cpu, Info } from 'lucide-react';

export const DFDDiagram = () => {
  const [level, setLevel] = useState('level0'); // 'level0' or 'level1'
  const [activeElement, setActiveElement] = useState(null);

  return (
    <div className="card" style={{ padding: '24px', marginBottom: 24 }}>
      {/* Header and Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Layers size={20} color="#0284c7" />
            <span>Data Flow Diagrams (DFD)</span>
          </h3>
          <p style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>
            SADT Structured Analysis standard: graphical modeling of information flow, transformations, and stores.
          </p>
        </div>

        {/* Level Switcher */}
        <div style={{ display: 'flex', gap: 6, background: '#f1f5f9', padding: 4, borderRadius: 10, border: '1px solid #cbd5e1' }}>
          <button
            onClick={() => { setLevel('level0'); setActiveElement(null); }}
            className={`btn btn-sm ${level === 'level0' ? 'btn-primary' : 'btn-outline'}`}
            style={{ border: 'none', boxShadow: level === 'level0' ? undefined : 'none' }}
          >
            Level 0 (Context Diagram)
          </button>
          <button
            onClick={() => { setLevel('level1'); setActiveElement(null); }}
            className={`btn btn-sm ${level === 'level1' ? 'btn-primary' : 'btn-outline'}`}
            style={{ border: 'none', boxShadow: level === 'level1' ? undefined : 'none' }}
          >
            Level 1 (Decomposed DFD)
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="diagram-legend">
        <div className="legend-item">
          <span style={{ display: 'inline-block', width: 18, height: 14, backgroundColor: '#f0fdf4', border: '2px solid #16a34a', borderRadius: 2 }} />
          <span>External Entity [Square]</span>
        </div>
        <div className="legend-item">
          <span style={{ display: 'inline-block', width: 16, height: 16, backgroundColor: '#eff6ff', border: '2px solid #0284c7', borderRadius: '50%' }} />
          <span>Process [Circle/Bubble]</span>
        </div>
        <div className="legend-item">
          <span style={{ display: 'inline-block', width: 22, height: 12, backgroundColor: '#fffbeb', borderTop: '2px solid #d97706', borderBottom: '2px solid #d97706' }} />
          <span>Data Store [Parallel Lines]</span>
        </div>
        <div className="legend-item">
          <span style={{ display: 'inline-block', width: 24, height: 2, backgroundColor: '#0284c7', position: 'relative' }}>
            <span style={{ position: 'absolute', right: 0, top: -3, width: 0, height: 0, borderTop: '4px solid transparent', borderBottom: '4px solid transparent', borderLeft: '6px solid #0284c7' }} />
          </span>
          <span>Data Flow [Vector Arrow]</span>
        </div>
      </div>

      {/* LEVEL 0 / CONTEXT DFD */}
      {level === 'level0' && (
        <div style={{ position: 'relative', width: '100%', overflowX: 'auto', backgroundColor: '#f8fafc', borderRadius: 14, padding: '24px 10px', border: '1px solid #e2e8f0' }}>
          <svg viewBox="0 0 920 540" style={{ width: '100%', minWidth: '760px', height: 'auto', display: 'block' }}>
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#0284c7" />
              </marker>
              <marker id="arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#16a34a" />
              </marker>
              <marker id="arrow-purple" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#7c3aed" />
              </marker>
              <marker id="arrow-amber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#d97706" />
              </marker>
              <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.08" />
              </filter>
            </defs>

            {/* Central Process Bubble: 0.0 Hospital Queue Management System */}
            <g
              transform="translate(460, 270)"
              onClick={() => setActiveElement({ title: '0.0 Central System', desc: 'Core system boundary coordinating reception intake, triage ordering, doctor cabin feeds, and administrative reports.' })}
              style={{ cursor: 'pointer' }}
            >
              <circle r="92" fill="#eff6ff" stroke="#0284c7" strokeWidth="3" filter="url(#shadow)" />
              <circle r="84" fill="none" stroke="#bae6fd" strokeWidth="1.5" strokeDasharray="4 3" />
              <text textAnchor="middle" y="-20" fill="#0369a1" fontSize="12" fontWeight="700">0.0 PROCESS</text>
              <text textAnchor="middle" y="2" fill="#0f172a" fontSize="13.5" fontWeight="800">Hospital Queue</text>
              <text textAnchor="middle" y="20" fill="#0f172a" fontSize="13.5" fontWeight="800">Management System</text>
              <text textAnchor="middle" y="40" fill="#64748b" fontSize="10.5">Automated Triage & Scheduling</text>
            </g>

            {/* Entity 1: Patient (Top Left) */}
            <g
              transform="translate(70, 70)"
              onClick={() => setActiveElement({ title: 'Patient (External Entity)', desc: 'Provides personal details, symptoms, and arrival timestamp at triage; receives token slip & waiting time alerts.' })}
              style={{ cursor: 'pointer' }}
            >
              <rect width="160" height="74" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2.5" filter="url(#shadow)" />
              <text x="80" y="28" textAnchor="middle" fill="#15803d" fontSize="11" fontWeight="700">EXTERNAL ENTITY</text>
              <text x="80" y="50" textAnchor="middle" fill="#0f172a" fontSize="15" fontWeight="800">Patient</text>
            </g>

            {/* Entity 2: Receptionist (Bottom Left) */}
            <g
              transform="translate(70, 390)"
              onClick={() => setActiveElement({ title: 'Receptionist (External Entity)', desc: 'Registers walk-in patients, assigns department & physician, flags emergency priority, and handles cancellations.' })}
              style={{ cursor: 'pointer' }}
            >
              <rect width="160" height="74" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2.5" filter="url(#shadow)" />
              <text x="80" y="28" textAnchor="middle" fill="#15803d" fontSize="11" fontWeight="700">EXTERNAL ENTITY</text>
              <text x="80" y="50" textAnchor="middle" fill="#0f172a" fontSize="15" fontWeight="800">Receptionist</text>
            </g>

            {/* Entity 3: Doctor (Top Right) */}
            <g
              transform="translate(690, 70)"
              onClick={() => setActiveElement({ title: 'Doctor (External Entity)', desc: 'Calls next waiting patient, views patient queue, commences examination, and completes consultation with notes.' })}
              style={{ cursor: 'pointer' }}
            >
              <rect width="160" height="74" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2.5" filter="url(#shadow)" />
              <text x="80" y="28" textAnchor="middle" fill="#15803d" fontSize="11" fontWeight="700">EXTERNAL ENTITY</text>
              <text x="80" y="50" textAnchor="middle" fill="#0f172a" fontSize="15" fontWeight="800">Doctor</text>
            </g>

            {/* Entity 4: Hospital Administrator (Bottom Right) */}
            <g
              transform="translate(690, 390)"
              onClick={() => setActiveElement({ title: 'Hospital Administrator (External Entity)', desc: 'Monitors hospital-wide queue metrics, doctor performance, patient throughput, and audits SEPM analytics.' })}
              style={{ cursor: 'pointer' }}
            >
              <rect width="160" height="74" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2.5" filter="url(#shadow)" />
              <text x="80" y="28" textAnchor="middle" fill="#15803d" fontSize="11" fontWeight="700">EXTERNAL ENTITY</text>
              <text x="80" y="50" textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="800">Hospital Admin</text>
            </g>

            {/* Data Flows: Patient <-> System */}
            {/* Flow 1: Patient -> System (Patient Registration Info) */}
            <path d="M 230 95 C 310 95, 360 190, 400 220" fill="none" stroke="#0284c7" strokeWidth="2" markerEnd="url(#arrow)" />
            <rect x="250" y="115" width="135" height="22" rx="4" fill="#ffffff" stroke="#bae6fd" />
            <text x="317" y="130" textAnchor="middle" fill="#0369a1" fontSize="10.5" fontWeight="600">Patient Registration</text>

            {/* Flow 2: System -> Patient (Token Slip & Queue Status) */}
            <path d="M 380 250 C 310 240, 260 160, 230 130" fill="none" stroke="#16a34a" strokeWidth="2" markerEnd="url(#arrow-green)" />
            <rect x="235" y="175" width="145" height="22" rx="4" fill="#ffffff" stroke="#bbf7d0" />
            <text x="307" y="190" textAnchor="middle" fill="#15803d" fontSize="10.5" fontWeight="600">Token & Queue Status</text>

            {/* Data Flows: Receptionist <-> System */}
            {/* Flow 3: Receptionist -> System (Intake & Priority Details) */}
            <path d="M 230 415 C 320 415, 360 350, 400 320" fill="none" stroke="#0284c7" strokeWidth="2" markerEnd="url(#arrow)" />
            <rect x="255" y="380" width="130" height="22" rx="4" fill="#ffffff" stroke="#bae6fd" />
            <text x="320" y="395" textAnchor="middle" fill="#0369a1" fontSize="10.5" fontWeight="600">Patient Intake Data</text>

            {/* Flow 4: System -> Receptionist (Current Queue Status) */}
            <path d="M 390 350 C 340 370, 290 440, 230 445" fill="none" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#arrow-purple)" />
            <rect x="240" y="440" width="140" height="22" rx="4" fill="#ffffff" stroke="#ddd6fe" />
            <text x="310" y="455" textAnchor="middle" fill="#6d28d9" fontSize="10.5" fontWeight="600">Live Queue Feedback</text>

            {/* Data Flows: Doctor <-> System */}
            {/* Flow 5: System -> Doctor (Patient Queue & Call Patient) */}
            <path d="M 520 220 C 560 190, 610 95, 690 95" fill="none" stroke="#0284c7" strokeWidth="2" markerEnd="url(#arrow)" />
            <rect x="540" y="115" width="135" height="22" rx="4" fill="#ffffff" stroke="#bae6fd" />
            <text x="607" y="130" textAnchor="middle" fill="#0369a1" fontSize="10.5" fontWeight="600">Queue Management</text>

            {/* Flow 6: Doctor -> System (Consultation Status & Notes) */}
            <path d="M 690 130 C 660 160, 610 240, 540 250" fill="none" stroke="#16a34a" strokeWidth="2" markerEnd="url(#arrow-green)" />
            <rect x="545" y="175" width="140" height="22" rx="4" fill="#ffffff" stroke="#bbf7d0" />
            <text x="615" y="190" textAnchor="middle" fill="#15803d" fontSize="10.5" fontWeight="600">Consultation Status</text>

            {/* Data Flows: Admin <-> System */}
            {/* Flow 7: Admin -> System (Report Query) */}
            <path d="M 690 415 C 610 415, 560 350, 520 320" fill="none" stroke="#d97706" strokeWidth="2" markerEnd="url(#arrow-amber)" />
            <rect x="555" y="380" width="120" height="22" rx="4" fill="#ffffff" stroke="#fde68a" />
            <text x="615" y="395" textAnchor="middle" fill="#b45309" fontSize="10.5" fontWeight="600">Query / Analytics</text>

            {/* Flow 8: System -> Admin (Reports & Analytics) */}
            <path d="M 530 350 C 580 370, 630 440, 690 445" fill="none" stroke="#0284c7" strokeWidth="2" markerEnd="url(#arrow)" />
            <rect x="545" y="440" width="135" height="22" rx="4" fill="#ffffff" stroke="#bae6fd" />
            <text x="612" y="455" textAnchor="middle" fill="#0369a1" fontSize="10.5" fontWeight="600">System Reports</text>
          </svg>
        </div>
      )}

      {/* LEVEL 1 / DECOMPOSED DFD */}
      {level === 'level1' && (
        <div style={{ position: 'relative', width: '100%', overflowX: 'auto', backgroundColor: '#f8fafc', borderRadius: 14, padding: '24px 10px', border: '1px solid #e2e8f0' }}>
          <svg viewBox="0 0 980 620" style={{ width: '100%', minWidth: '820px', height: 'auto', display: 'block' }}>
            <defs>
              <marker id="arrow2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#0284c7" />
              </marker>
              <marker id="arrow2-amber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#d97706" />
              </marker>
              <marker id="arrow2-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#16a34a" />
              </marker>
            </defs>

            {/* PROCESS 1.0: Patient Registration */}
            <g transform="translate(190, 70)" onClick={() => setActiveElement({ title: '1.0 Patient Registration', desc: 'Validates incoming patient demographics, assigned department, and priority flag (Emergency / High / Normal).' })} style={{ cursor: 'pointer' }}>
              <circle r="46" fill="#eff6ff" stroke="#0284c7" strokeWidth="2.5" />
              <text textAnchor="middle" y="-12" fill="#0369a1" fontSize="11" fontWeight="700">1.0</text>
              <text textAnchor="middle" y="6" fill="#0f172a" fontSize="11.5" fontWeight="700">Patient</text>
              <text textAnchor="middle" y="20" fill="#0f172a" fontSize="11.5" fontWeight="700">Registration</text>
            </g>

            {/* PROCESS 2.0: Token Generation */}
            <g transform="translate(480, 70)" onClick={() => setActiveElement({ title: '2.0 Token Generation', desc: 'Calculates sequential token (e.g. T001..), assigns triage rank, and estimates initial wait duration.' })} style={{ cursor: 'pointer' }}>
              <circle r="46" fill="#eff6ff" stroke="#0284c7" strokeWidth="2.5" />
              <text textAnchor="middle" y="-12" fill="#0369a1" fontSize="11" fontWeight="700">2.0</text>
              <text textAnchor="middle" y="6" fill="#0f172a" fontSize="11.5" fontWeight="700">Token</text>
              <text textAnchor="middle" y="20" fill="#0f172a" fontSize="11.5" fontWeight="700">Generation</text>
            </g>

            {/* PROCESS 3.0: Queue Management */}
            <g transform="translate(480, 260)" onClick={() => setActiveElement({ title: '3.0 Queue Management', desc: 'Maintains priority dispatch queue (Emergency > High > Normal) and tracks patient waiting positions.' })} style={{ cursor: 'pointer' }}>
              <circle r="50" fill="#eff6ff" stroke="#0284c7" strokeWidth="2.5" />
              <text textAnchor="middle" y="-14" fill="#0369a1" fontSize="11" fontWeight="700">3.0</text>
              <text textAnchor="middle" y="4" fill="#0f172a" fontSize="12" fontWeight="700">Queue</text>
              <text textAnchor="middle" y="20" fill="#0f172a" fontSize="12" fontWeight="700">Management</text>
            </g>

            {/* PROCESS 4.0: Doctor Consultation */}
            <g transform="translate(770, 260)" onClick={() => setActiveElement({ title: '4.0 Doctor Consultation', desc: 'Doctor cabin module to call tokens, conduct consultation session, and update queue status.' })} style={{ cursor: 'pointer' }}>
              <circle r="46" fill="#eff6ff" stroke="#0284c7" strokeWidth="2.5" />
              <text textAnchor="middle" y="-12" fill="#0369a1" fontSize="11" fontWeight="700">4.0</text>
              <text textAnchor="middle" y="6" fill="#0f172a" fontSize="11.5" fontWeight="700">Doctor</text>
              <text textAnchor="middle" y="20" fill="#0f172a" fontSize="11.5" fontWeight="700">Consultation</text>
            </g>

            {/* PROCESS 5.0: Queue Status Update */}
            <g transform="translate(480, 470)" onClick={() => setActiveElement({ title: '5.0 Queue Status Update', desc: 'Updates state machine: Waiting -> Called -> In Consultation -> Completed; persists to LocalStorage.' })} style={{ cursor: 'pointer' }}>
              <circle r="46" fill="#eff6ff" stroke="#0284c7" strokeWidth="2.5" />
              <text textAnchor="middle" y="-12" fill="#0369a1" fontSize="11" fontWeight="700">5.0</text>
              <text textAnchor="middle" y="6" fill="#0f172a" fontSize="11.5" fontWeight="700">Queue Status</text>
              <text textAnchor="middle" y="20" fill="#0f172a" fontSize="11.5" fontWeight="700">Update</text>
            </g>

            {/* PROCESS 6.0: Report Generation */}
            <g transform="translate(190, 470)" onClick={() => setActiveElement({ title: '6.0 Report Generation', desc: 'Aggregates turnaround time, department load, completed cases, and generates administrator analytics.' })} style={{ cursor: 'pointer' }}>
              <circle r="46" fill="#eff6ff" stroke="#0284c7" strokeWidth="2.5" />
              <text textAnchor="middle" y="-12" fill="#0369a1" fontSize="11" fontWeight="700">6.0</text>
              <text textAnchor="middle" y="6" fill="#0f172a" fontSize="11.5" fontWeight="700">Report</text>
              <text textAnchor="middle" y="20" fill="#0f172a" fontSize="11.5" fontWeight="700">Generation</text>
            </g>

            {/* DATA STORE D1: Patient Database */}
            <g transform="translate(140, 245)" onClick={() => setActiveElement({ title: 'D1 – Patient Database', desc: 'Persistent patient repository storing demographics, phone, symptoms, registration time, and queue ID.' })} style={{ cursor: 'pointer' }}>
              <path d="M 0 0 L 120 0 M 0 45 L 120 45" stroke="#d97706" strokeWidth="2.5" fill="none" />
              <rect x="0" y="0" width="120" height="45" fill="#fffbeb" opacity="0.6" />
              <text x="60" y="18" textAnchor="middle" fill="#b45309" fontSize="11" fontWeight="700">D1</text>
              <text x="60" y="34" textAnchor="middle" fill="#0f172a" fontSize="11.5" fontWeight="700">Patient Database</text>
            </g>

            {/* DATA STORE D2: Queue Database */}
            <g transform="translate(420, 160)" onClick={() => setActiveElement({ title: 'D2 – Queue Database', desc: 'Active queue storage holding token IDs, status flags (Waiting/Called), priorities, and cabin assignments.' })} style={{ cursor: 'pointer' }}>
              <path d="M 0 0 L 120 0 M 0 45 L 120 45" stroke="#d97706" strokeWidth="2.5" fill="none" />
              <rect x="0" y="0" width="120" height="45" fill="#fffbeb" opacity="0.6" />
              <text x="60" y="18" textAnchor="middle" fill="#b45309" fontSize="11" fontWeight="700">D2</text>
              <text x="60" y="34" textAnchor="middle" fill="#0f172a" fontSize="11.5" fontWeight="700">Queue Database</text>
            </g>

            {/* DATA STORE D3: Consultation Records */}
            <g transform="translate(710, 445)" onClick={() => setActiveElement({ title: 'D3 – Consultation Records', desc: 'Completed patient visit logs, doctor consultation timestamps, and visit remarks.' })} style={{ cursor: 'pointer' }}>
              <path d="M 0 0 L 140 0 M 0 45 L 140 45" stroke="#d97706" strokeWidth="2.5" fill="none" />
              <rect x="0" y="0" width="140" height="45" fill="#fffbeb" opacity="0.6" />
              <text x="70" y="18" textAnchor="middle" fill="#b45309" fontSize="11" fontWeight="700">D3</text>
              <text x="70" y="34" textAnchor="middle" fill="#0f172a" fontSize="11.5" fontWeight="700">Consultation Records</text>
            </g>

            {/* Flow 1 -> 2 */}
            <path d="M 236 70 L 434 70" fill="none" stroke="#0284c7" strokeWidth="2" markerEnd="url(#arrow2)" />
            <rect x="290" y="52" width="90" height="18" rx="4" fill="#ffffff" stroke="#bae6fd" />
            <text x="335" y="65" textAnchor="middle" fill="#0369a1" fontSize="10">Patient Details</text>

            {/* Flow 1 -> D1 */}
            <path d="M 190 116 L 190 240" fill="none" stroke="#d97706" strokeWidth="2" markerEnd="url(#arrow2-amber)" />
            <text x="180" y="180" textAnchor="end" fill="#b45309" fontSize="10">Save Record</text>

            {/* Flow 2 -> D2 */}
            <path d="M 480 116 L 480 155" fill="none" stroke="#d97706" strokeWidth="2" markerEnd="url(#arrow2-amber)" />
            <text x="490" y="140" textAnchor="start" fill="#b45309" fontSize="10">Token Issued</text>

            {/* Flow D2 -> 3 */}
            <path d="M 480 205 L 480 210" fill="none" stroke="#0284c7" strokeWidth="2" markerEnd="url(#arrow2)" />

            {/* Flow 3 -> 4 */}
            <path d="M 530 260 L 724 260" fill="none" stroke="#0284c7" strokeWidth="2" markerEnd="url(#arrow2)" />
            <rect x="585" y="242" width="90" height="18" rx="4" fill="#ffffff" stroke="#bae6fd" />
            <text x="630" y="255" textAnchor="middle" fill="#0369a1" fontSize="10">Call Patient</text>

            {/* Flow 4 -> 5 */}
            <path d="M 750 300 C 720 380, 600 450, 526 470" fill="none" stroke="#16a34a" strokeWidth="2" markerEnd="url(#arrow2-green)" />
            <rect x="630" y="370" width="100" height="18" rx="4" fill="#ffffff" stroke="#bbf7d0" />
            <text x="680" y="383" textAnchor="middle" fill="#15803d" fontSize="10">Consulted Status</text>

            {/* Flow 4 -> D3 */}
            <path d="M 770 306 L 770 440" fill="none" stroke="#d97706" strokeWidth="2" markerEnd="url(#arrow2-amber)" />
            <text x="780" y="375" textAnchor="start" fill="#b45309" fontSize="10">Consultation Notes</text>

            {/* Flow 5 -> D2 (update) */}
            <path d="M 460 430 C 430 380, 420 280, 440 210" fill="none" stroke="#d97706" strokeWidth="1.8" strokeDasharray="4 3" markerEnd="url(#arrow2-amber)" />
            <text x="390" y="320" textAnchor="middle" fill="#b45309" fontSize="9.5">Update State</text>

            {/* Flow 5 -> 6 */}
            <path d="M 434 470 L 236 470" fill="none" stroke="#0284c7" strokeWidth="2" markerEnd="url(#arrow2)" />
            <rect x="290" y="452" width="90" height="18" rx="4" fill="#ffffff" stroke="#bae6fd" />
            <text x="335" y="465" textAnchor="middle" fill="#0369a1" fontSize="10">Queue Logs</text>

            {/* Flow D1 -> 6 */}
            <path d="M 190 295 L 190 424" fill="none" stroke="#0284c7" strokeWidth="2" markerEnd="url(#arrow2)" />
            <text x="200" y="360" textAnchor="start" fill="#0369a1" fontSize="10">Patient History</text>
          </svg>
        </div>
      )}

      {/* Interactive Detail Box on Click */}
      {activeElement && (
        <div style={{ marginTop: 16, padding: '12px 16px', borderRadius: 10, backgroundColor: '#f0f9ff', border: '1px solid #bae6fd', display: 'flex', alignItems: 'center', gap: 12 }}>
          <Info size={20} color="#0284c7" style={{ flexShrink: 0 }} />
          <div>
            <strong style={{ fontSize: 13, color: '#0369a1' }}>{activeElement.title}:</strong>
            <span style={{ fontSize: 12.5, color: '#1e293b', marginLeft: 6 }}>{activeElement.desc}</span>
          </div>
        </div>
      )}
    </div>
  );
};
