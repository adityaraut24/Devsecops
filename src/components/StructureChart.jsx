import React, { useState } from 'react';
import { Network, Info, CheckCircle2, ChevronDown, ChevronRight } from 'lucide-react';

export const StructureChart = () => {
  const [selectedModule, setSelectedModule] = useState(null);

  const modulesData = {
    root: {
      name: '0.0 Hospital Queue Management System',
      type: 'Executive Module',
      cohesion: 'Coincidental / Top Coordinator',
      desc: 'Root supervisor module coordinating patient intake, triage prioritization, doctor cabins, and reporting subsystems.'
    },
    patient: {
      name: '1.0 Patient Management',
      type: 'Subsystem Coordinator',
      cohesion: 'Functional Cohesion',
      coupling: 'Data Coupled',
      desc: 'Controls all patient intake lifecycles, demographic capture, token generation, and queue record registration.'
    },
    queue: {
      name: '2.0 Queue Management',
      type: 'Subsystem Coordinator',
      cohesion: 'Sequential / Functional Cohesion',
      coupling: 'Data & Control Coupled',
      desc: 'Maintains waiting arrays, executes priority sorting algorithm (Emergency > High > Normal), and dispatches next tokens.'
    },
    doctor: {
      name: '3.0 Doctor Management',
      type: 'Subsystem Coordinator',
      cohesion: 'Functional Cohesion',
      coupling: 'Data Coupled',
      desc: 'Interfaces doctor examination cabins, live consultation timers, and queue completion handlers.'
    },
    reporting: {
      name: '4.0 Reporting & Analytics',
      type: 'Subsystem Coordinator',
      cohesion: 'Informational / Communicational Cohesion',
      coupling: 'Data Coupled',
      desc: 'Aggregates queue throughput, calculates average waiting times, and renders visual audit charts for hospital administration.'
    }
  };

  return (
    <div className="card" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Network size={20} color="#0d9488" />
            <span>Structure Chart – Functional Decomposition</span>
          </h3>
          <p style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>
            Hierarchical modular decomposition representing module relationships, data couples, and control flow.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: 12, color: '#475569' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', backgroundColor: '#0284c7' }} />
            <span>Data Couple (Parameters)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', border: '2px solid #e11d48', backgroundColor: 'transparent' }} />
            <span>Control Couple (Flag/Signal)</span>
          </div>
        </div>
      </div>

      {/* Explanatory quote required by prompt */}
      <div style={{
        padding: '12px 18px',
        backgroundColor: '#f0fdfa',
        borderRadius: 10,
        border: '1px solid #ccfbf1',
        marginBottom: 24,
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }}>
        <Info size={20} color="#0d9488" style={{ flexShrink: 0 }} />
        <p style={{ fontSize: 13, color: '#0f766e', fontStyle: 'italic', margin: 0, lineHeight: 1.4 }}>
          &ldquo;<strong>DFD focuses on how data flows through the system</strong>, while the <strong>Structure Chart represents the functional decomposition of the system into modules</strong>.&rdquo;
        </p>
      </div>

      {/* Visual Hierarchy Diagram */}
      <div style={{ overflowX: 'auto', padding: '10px 0', backgroundColor: '#f8fafc', borderRadius: 14, border: '1px solid #e2e8f0' }}>
        <div style={{ minWidth: '860px', padding: '20px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {/* LEVEL 0: ROOT MODULE */}
          <div
            onClick={() => setSelectedModule(modulesData.root)}
            style={{
              padding: '12px 24px',
              backgroundColor: '#0f172a',
              color: 'white',
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 14,
              boxShadow: '0 4px 12px rgba(15, 23, 42, 0.2)',
              cursor: 'pointer',
              border: '2px solid #38bdf8',
              textAlign: 'center',
              width: '320px'
            }}
          >
            <div>Hospital Queue Management System</div>
            <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500, marginTop: 2 }}>Root Executive Controller</div>
          </div>

          {/* Trunk connector down */}
          <div style={{ width: 2, height: 26, backgroundColor: '#94a3b8' }} />

          {/* Horizontal crossbar connecting the 4 main modules */}
          <div style={{ width: '80%', height: 2, backgroundColor: '#94a3b8', position: 'relative' }}>
            {/* 4 drop ticks */}
            <div style={{ position: 'absolute', left: '0%', width: 2, height: 16, backgroundColor: '#94a3b8' }} />
            <div style={{ position: 'absolute', left: '33.33%', width: 2, height: 16, backgroundColor: '#94a3b8' }} />
            <div style={{ position: 'absolute', left: '66.66%', width: 2, height: 16, backgroundColor: '#94a3b8' }} />
            <div style={{ position: 'absolute', left: '100%', width: 2, height: 16, backgroundColor: '#94a3b8' }} />
          </div>

          {/* LEVEL 1: 4 SUBSYSTEM BRANCHES */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, width: '96%', marginTop: 16 }}>
            
            {/* BRANCH 1: Patient Management */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                onClick={() => setSelectedModule(modulesData.patient)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  backgroundColor: '#e0f2fe',
                  border: '2px solid #0284c7',
                  borderRadius: 8,
                  textAlign: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 700, color: '#0369a1' }}>MODULE 1.0</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Patient Management</div>
                <div style={{ fontSize: 10, color: '#0284c7', marginTop: 3 }}>🔵 patient_record &bull; ⚪ reg_valid</div>
              </div>

              {/* Submodule vertical stem */}
              <div style={{ width: 2, height: 18, backgroundColor: '#cbd5e1' }} />

              {/* Leaf Modules */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
                <div style={{ padding: '8px 10px', backgroundColor: 'white', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 12, textAlign: 'center' }}>
                  <div style={{ fontWeight: 600, color: '#1e293b' }}>1.1 Register Patient</div>
                  <div style={{ fontSize: 10, color: '#64748b' }}>Input intake form data</div>
                </div>
                <div style={{ padding: '8px 10px', backgroundColor: 'white', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 12, textAlign: 'center' }}>
                  <div style={{ fontWeight: 600, color: '#1e293b' }}>1.2 Generate Token</div>
                  <div style={{ fontSize: 10, color: '#64748b' }}>Create sequential T# slip</div>
                </div>
                <div style={{ padding: '8px 10px', backgroundColor: 'white', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 12, textAlign: 'center' }}>
                  <div style={{ fontWeight: 600, color: '#1e293b' }}>1.3 Update Patient Details</div>
                  <div style={{ fontSize: 10, color: '#64748b' }}>Update contact & vitals</div>
                </div>
              </div>
            </div>

            {/* BRANCH 2: Queue Management */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                onClick={() => setSelectedModule(modulesData.queue)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  backgroundColor: '#ccfbf1',
                  border: '2px solid #0d9488',
                  borderRadius: 8,
                  textAlign: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 700, color: '#0f766e' }}>MODULE 2.0</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Queue Management</div>
                <div style={{ fontSize: 10, color: '#0d9488', marginTop: 3 }}>🔵 token_pos &bull; ⚪ is_emergency</div>
              </div>

              {/* Submodule vertical stem */}
              <div style={{ width: 2, height: 18, backgroundColor: '#cbd5e1' }} />

              {/* Leaf Modules */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
                <div style={{ padding: '8px 10px', backgroundColor: 'white', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 12, textAlign: 'center' }}>
                  <div style={{ fontWeight: 600, color: '#1e293b' }}>2.1 Add to Queue</div>
                  <div style={{ fontSize: 10, color: '#64748b' }}>Enqueue patient object</div>
                </div>
                <div style={{ padding: '8px 10px', backgroundColor: 'white', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 12, textAlign: 'center' }}>
                  <div style={{ fontWeight: 600, color: '#1e293b' }}>2.2 Prioritize Queue</div>
                  <div style={{ fontSize: 10, color: '#64748b' }}>Emergency &gt; High &gt; Normal</div>
                </div>
                <div style={{ padding: '8px 10px', backgroundColor: 'white', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 12, textAlign: 'center' }}>
                  <div style={{ fontWeight: 600, color: '#1e293b' }}>2.3 Call Next Patient</div>
                  <div style={{ fontSize: 10, color: '#64748b' }}>Dispatch top waiting token</div>
                </div>
                <div style={{ padding: '8px 10px', backgroundColor: 'white', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 12, textAlign: 'center' }}>
                  <div style={{ fontWeight: 600, color: '#1e293b' }}>2.4 Update Queue Status</div>
                  <div style={{ fontSize: 10, color: '#64748b' }}>State transition handler</div>
                </div>
              </div>
            </div>

            {/* BRANCH 3: Doctor Management */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                onClick={() => setSelectedModule(modulesData.doctor)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  backgroundColor: '#ede9fe',
                  border: '2px solid #7c3aed',
                  borderRadius: 8,
                  textAlign: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 700, color: '#6d28d9' }}>MODULE 3.0</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Doctor Management</div>
                <div style={{ fontSize: 10, color: '#7c3aed', marginTop: 3 }}>🔵 doctor_cabin &bull; ⚪ cabin_free</div>
              </div>

              {/* Submodule vertical stem */}
              <div style={{ width: 2, height: 18, backgroundColor: '#cbd5e1' }} />

              {/* Leaf Modules */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
                <div style={{ padding: '8px 10px', backgroundColor: 'white', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 12, textAlign: 'center' }}>
                  <div style={{ fontWeight: 600, color: '#1e293b' }}>3.1 View Queue</div>
                  <div style={{ fontSize: 10, color: '#64748b' }}>Cabin-specific patient feed</div>
                </div>
                <div style={{ padding: '8px 10px', backgroundColor: 'white', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 12, textAlign: 'center' }}>
                  <div style={{ fontWeight: 600, color: '#1e293b' }}>3.2 Start Consultation</div>
                  <div style={{ fontSize: 10, color: '#64748b' }}>Clock in examination session</div>
                </div>
                <div style={{ padding: '8px 10px', backgroundColor: 'white', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 12, textAlign: 'center' }}>
                  <div style={{ fontWeight: 600, color: '#1e293b' }}>3.3 Complete Consultation</div>
                  <div style={{ fontSize: 10, color: '#64748b' }}>Log consultation status</div>
                </div>
              </div>
            </div>

            {/* BRANCH 4: Reporting & Analytics */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                onClick={() => setSelectedModule(modulesData.reporting)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  backgroundColor: '#fef3c7',
                  border: '2px solid #d97706',
                  borderRadius: 8,
                  textAlign: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 700, color: '#b45309' }}>MODULE 4.0</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Reporting & Analytics</div>
                <div style={{ fontSize: 10, color: '#d97706', marginTop: 3 }}>🔵 analytics_data &bull; ⚪ time_range</div>
              </div>

              {/* Submodule vertical stem */}
              <div style={{ width: 2, height: 18, backgroundColor: '#cbd5e1' }} />

              {/* Leaf Modules */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
                <div style={{ padding: '8px 10px', backgroundColor: 'white', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 12, textAlign: 'center' }}>
                  <div style={{ fontWeight: 600, color: '#1e293b' }}>4.1 Generate Daily Report</div>
                  <div style={{ fontSize: 10, color: '#64748b' }}>OPD daily census &amp; logs</div>
                </div>
                <div style={{ padding: '8px 10px', backgroundColor: 'white', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 12, textAlign: 'center' }}>
                  <div style={{ fontWeight: 600, color: '#1e293b' }}>4.2 Calculate Waiting Time</div>
                  <div style={{ fontSize: 10, color: '#64748b' }}>Dynamic wait algorithm</div>
                </div>
                <div style={{ padding: '8px 10px', backgroundColor: 'white', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 12, textAlign: 'center' }}>
                  <div style={{ fontWeight: 600, color: '#1e293b' }}>4.3 Display Statistics</div>
                  <div style={{ fontSize: 10, color: '#64748b' }}>Chart visuals &amp; KPI cards</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Selected Module SEPM Inspector */}
      {selectedModule && (
        <div style={{ marginTop: 20, padding: '16px 20px', borderRadius: 12, backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <strong style={{ fontSize: 15, color: '#0f172a' }}>{selectedModule.name}</strong>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#0284c7', background: '#e0f2fe', padding: '3px 10px', borderRadius: 9999 }}>
              {selectedModule.type}
            </span>
          </div>
          <p style={{ fontSize: 13, color: '#475569', marginBottom: 10 }}>{selectedModule.desc}</p>
          <div style={{ display: 'flex', gap: 20, fontSize: 12, color: '#334155', borderTop: '1px solid #e2e8f0', paddingTop: 8 }}>
            <div><strong>Module Cohesion:</strong> <span style={{ color: '#059669' }}>{selectedModule.cohesion}</span></div>
            {selectedModule.coupling && <div><strong>Module Coupling:</strong> <span style={{ color: '#0284c7' }}>{selectedModule.coupling}</span></div>}
          </div>
        </div>
      )}
    </div>
  );
};
