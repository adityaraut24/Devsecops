import React, { useState } from 'react';
import { DFDDiagram } from '../components/DFDDiagram';
import { StructureChart } from '../components/StructureChart';
import {
  GitBranch,
  BookOpen,
  Layers,
  Network,
  CheckCircle2,
  FileCode,
  ShieldCheck,
  HelpCircle
} from 'lucide-react';

export const SystemDesign = () => {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'dfd', 'structure', 'theory'

  return (
    <div className="page-container">
      {/* Header Banner */}
      <div className="page-header">
        <div className="page-header-text">
          <h2>System Design – DFD &amp; Structure Chart</h2>
          <p>Structured Systems Analysis &amp; Design (SSADM) &bull; Architectural Blueprint for Hospital Queue Management</p>
        </div>

        {/* View Filter Tabs */}
        <div style={{ display: 'flex', gap: 6, background: '#f1f5f9', padding: 4, borderRadius: 10, border: '1px solid #cbd5e1' }}>
          <button
            onClick={() => setActiveTab('all')}
            className={`btn btn-sm ${activeTab === 'all' ? 'btn-primary' : 'btn-outline'}`}
            style={{ border: 'none' }}
          >
            All Diagrams
          </button>
          <button
            onClick={() => setActiveTab('dfd')}
            className={`btn btn-sm ${activeTab === 'dfd' ? 'btn-primary' : 'btn-outline'}`}
            style={{ border: 'none' }}
          >
            DFD Diagrams
          </button>
          <button
            onClick={() => setActiveTab('structure')}
            className={`btn btn-sm ${activeTab === 'structure' ? 'btn-primary' : 'btn-outline'}`}
            style={{ border: 'none' }}
          >
            Structure Chart
          </button>
          <button
            onClick={() => setActiveTab('theory')}
            className={`btn btn-sm ${activeTab === 'theory' ? 'btn-primary' : 'btn-outline'}`}
            style={{ border: 'none' }}
          >
            SEPM Viva Prep
          </button>
        </div>
      </div>

      {/* Structured Design Paradigm Overview Card */}
      <div
        className="card"
        style={{
          marginBottom: 24,
          backgroundColor: '#ffffff',
          borderLeft: '4px solid #0284c7',
          padding: '20px 24px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              backgroundColor: '#e0f2fe',
              color: '#0284c7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <BookOpen size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>
              Structured Software Engineering Methodology
            </h3>
            <p style={{ fontSize: 13, color: '#334155', marginTop: 4, lineHeight: 1.5 }}>
              This project applies structured design principles to transform ambiguous healthcare requirements into modular, maintainable software.
              In this paradigm:
            </p>
            <div style={{ marginTop: 8, padding: '10px 14px', backgroundColor: '#f0f9ff', borderRadius: 8, border: '1px solid #bae6fd' }}>
              <p style={{ fontSize: 13, color: '#0369a1', fontWeight: 600, margin: 0 }}>
                &ldquo;DFD focuses on how data flows through the system, while the Structure Chart represents the functional decomposition of the system into modules.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: DATA FLOW DIAGRAMS */}
      {(activeTab === 'all' || activeTab === 'dfd') && (
        <section style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <Layers size={20} color="#0284c7" />
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a' }}>
              1. Data Flow Diagrams (Context Level 0 &amp; Level 1)
            </h3>
          </div>
          <DFDDiagram />
        </section>
      )}

      {/* SECTION 2: STRUCTURE CHART */}
      {(activeTab === 'all' || activeTab === 'structure') && (
        <section style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <Network size={20} color="#0d9488" />
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a' }}>
              2. Structure Chart (Modular Hierarchy)
            </h3>
          </div>
          <StructureChart />
        </section>
      )}

      {/* SECTION 3: SEPM VIVA COMPARISON & THEORY */}
      {(activeTab === 'all' || activeTab === 'theory') && (
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <ShieldCheck size={20} color="#7c3aed" />
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a' }}>
              3. Structured Design Theory &amp; Viva Assessment Guide
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 20 }}>
            {/* COMPARISON TABLE: DFD vs STRUCTURE CHART */}
            <div className="card">
              <div className="card-header">
                <div className="card-title">
                  <span>DFD vs. Structure Chart Comparison</span>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table-custom">
                  <thead>
                    <tr>
                      <th>Attribute</th>
                      <th>Data Flow Diagram (DFD)</th>
                      <th>Structure Chart (SC)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Primary Focus</strong></td>
                      <td>Movement, transformation &amp; storage of data</td>
                      <td>Functional decomposition &amp; module control hierarchy</td>
                    </tr>
                    <tr>
                      <td><strong>Phase Used</strong></td>
                      <td>Analysis Phase (What system does)</td>
                      <td>Design Phase (How modules execute)</td>
                    </tr>
                    <tr>
                      <td><strong>Elements</strong></td>
                      <td>Processes, Data Stores, Entities, Flows</td>
                      <td>Modules, Subordinates, Data &amp; Control Couples</td>
                    </tr>
                    <tr>
                      <td><strong>Execution Order</strong></td>
                      <td>No timing or sequence implied</td>
                      <td>Implicit top-down, left-to-right sequence</td>
                    </tr>
                    <tr>
                      <td><strong>Coupling/Cohesion</strong></td>
                      <td>Not visible</td>
                      <td>Directly measured via couple types &amp; call links</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* COHESION AND COUPLING ANALYSIS */}
            <div className="card">
              <div className="card-header">
                <div className="card-title">
                  <span>Cohesion &amp; Coupling Principles in this System</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: 13 }}>
                <div style={{ padding: 12, backgroundColor: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
                  <strong style={{ color: '#166534', fontSize: 13.5 }}>High Cohesion (Target: Functional Cohesion)</strong>
                  <p style={{ color: '#14532d', marginTop: 4, lineHeight: 1.4 }}>
                    Each leaf module performs exactly one well-defined task (e.g., <code>generateNextToken()</code> only calculates sequential tokens, <code>comparePatientsPriority()</code> only evaluates triage sorting). This maximizes reusability and ease of maintenance.
                  </p>
                </div>

                <div style={{ padding: 12, backgroundColor: '#eff6ff', borderRadius: 8, border: '1px solid #bae6fd' }}>
                  <strong style={{ color: '#1e40af', fontSize: 13.5 }}>Low Coupling (Target: Data Coupling)</strong>
                  <p style={{ color: '#1e3a8a', marginTop: 4, lineHeight: 1.4 }}>
                    Modules communicate strictly by passing necessary data arguments (e.g., passing <code>patientId</code> rather than raw shared global pointers). Control coupling is minimized to essential boolean triage triggers like <code>isEmergency</code>.
                  </p>
                </div>

                <div style={{ padding: 12, backgroundColor: '#fefce8', borderRadius: 8, border: '1px solid #fef08a' }}>
                  <strong style={{ color: '#854d0e', fontSize: 13.5 }}>Transform vs. Transaction Mapping</strong>
                  <p style={{ color: '#713f12', marginTop: 4, lineHeight: 1.4 }}>
                    The system implements <strong>Transaction Center Architecture</strong>: incoming requests are classified by action type (Registration, Queue Call, Doctor Consultation, Report Generation) and routed to specialized functional modules.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
