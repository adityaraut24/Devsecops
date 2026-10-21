import React from 'react';
import { useHospital } from '../context/HospitalContext';
import {
  GraduationCap,
  Award,
  Target,
  HeartHandshake,
  CheckCircle2,
  Cpu,
  Layers,
  HelpCircle,
  ShieldCheck,
  FileText
} from 'lucide-react';

export const About = () => {
  const { projectDetails } = useHospital();
  const { student, curriculum } = projectDetails;

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-text">
          <h2>About Project &amp; Academic Credentials</h2>
          <p>Continuous Internal Assessment Project (CIAP) &bull; Software Engineering &amp; Project Management</p>
        </div>
      </div>

      {/* Main Hero Academic Profile Card */}
      <div
        className="card"
        style={{
          background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
          color: 'white',
          padding: '28px',
          marginBottom: 24,
          border: 'none',
          boxShadow: '0 8px 20px rgba(2, 132, 199, 0.25)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', backgroundColor: 'rgba(255,255,255,0.2)', padding: '4px 10px', borderRadius: 9999 }}>
              {student.type} &bull; {student.subject}
            </span>
            <h1 style={{ fontSize: 24, fontWeight: 800, marginTop: 10, lineHeight: 1.3, maxWidth: 750 }}>
              {projectDetails.title}
            </h1>
            <p style={{ fontSize: 13, color: '#e0f2fe', marginTop: 8, maxWidth: 680 }}>
              &ldquo;To design a structured Hospital Queue Management System using Data Flow Diagrams and Structure Charts to improve patient flow, reduce waiting time, and improve healthcare service efficiency.&rdquo;
            </p>
          </div>

          {/* Student Dossier Badge */}
          <div style={{ backgroundColor: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 14, padding: '16px 20px', minWidth: '240px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <GraduationCap size={20} color="#bae6fd" />
              <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#bae6fd', fontWeight: 700 }}>
                Student Details
              </span>
            </div>
            <div style={{ fontSize: 17, fontWeight: 800, color: '#ffffff' }}>
              {student.name}
            </div>
            <div style={{ fontSize: 13, color: '#e0f2fe', marginTop: 2 }}>
              Roll No: <strong style={{ color: '#ffffff' }}>{student.rollNo}</strong>
            </div>
            <div style={{ fontSize: 12, color: '#bae6fd', marginTop: 4 }}>
              {student.course}
            </div>
            <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.2)', display: 'flex', justifyContent: 'space-between', fontSize: 11.5 }}>
              <span>{curriculum.co} (Bloom {curriculum.bloomLevel.split(' ')[1]})</span>
              <span>{curriculum.psoMapping[0].id}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Problem Statement, Objectives, Scope */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 20, marginBottom: 24 }}>
        
        {/* PROBLEM STATEMENT */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Target size={18} color="#e11d48" />
              <span>Problem Statement</span>
            </div>
          </div>
          <p style={{ fontSize: 13, color: '#334155', lineHeight: 1.6 }}>
            Overcrowding in hospital Outpatient Departments (OPD) leads to chaotic queuing, prolonged patient waiting times, heightened anxiety, and critical delays for emergency cases. Traditional first-come-first-served paper systems lack dynamic triage assessment and offer zero transparency into real-time doctor availability.
          </p>
        </div>

        {/* OBJECTIVES */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <CheckCircle2 size={18} color="#059669" />
              <span>Key Objectives</span>
            </div>
          </div>
          <ul style={{ fontSize: 13, color: '#334155', lineHeight: 1.6, paddingLeft: 18, margin: 0 }}>
            <li>Apply structured design techniques (DFD Level 0/1 &amp; Structure Charts) to healthcare workflows.</li>
            <li>Implement automated multi-tiered priority scheduling (Emergency &gt; High &gt; Normal).</li>
            <li>Provide real-time cabin calling and queue visibility for reception, doctors, and patients.</li>
            <li>Deliver client-persistent LocalStorage architecture for zero-backend operation.</li>
          </ul>
        </div>

        {/* SCOPE */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Layers size={18} color="#0284c7" />
              <span>Project Scope</span>
            </div>
          </div>
          <p style={{ fontSize: 13, color: '#334155', lineHeight: 1.6 }}>
            Covers the end-to-end OPD patient queue journey across 6 hospital departments (General Medicine, Cardiology, Pediatrics, Orthopedics, Dermatology, ENT). Encompasses registration, token generation, priority queue assignment, doctor cabin status tracking, and queue analytics.
          </p>
        </div>

      </div>

      {/* SDG 3 & CURRICULUM MAPPINGS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: 20, marginBottom: 24 }}>
        
        {/* SDG 3 MAPPING */}
        <div className="card" style={{ borderLeft: '4px solid #10b981' }}>
          <div className="card-header">
            <div className="card-title">
              <HeartHandshake size={18} color="#10b981" />
              <span>SDG Mapping: SDG 3 (Good Health and Well-being)</span>
            </div>
          </div>
          <div style={{ fontSize: 13, color: '#334155', lineHeight: 1.6 }}>
            <div style={{ padding: '10px 14px', backgroundColor: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0', marginBottom: 12 }}>
              <strong style={{ color: '#166534' }}>SDG Target 3.8:</strong> Achieve universal health coverage, including access to quality essential healthcare services.
            </div>
            <strong style={{ color: '#0f172a' }}>Official SDG Justification:</strong>
            <p style={{ marginTop: 4, color: '#475569' }}>
              {curriculum.sdgMapping.justification}
            </p>
          </div>
        </div>

        {/* PO & PSO MAPPINGS */}
        <div className="card" style={{ borderLeft: '4px solid #0284c7' }}>
          <div className="card-header">
            <div className="card-title">
              <Award size={18} color="#0284c7" />
              <span>Program Outcomes (PO) &amp; PSO Mapping</span>
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#0369a1' }}>
              CO4 &bull; Bloom Level 4 (Analyze)
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12.5 }}>
            {curriculum.poMapping.map(po => (
              <div key={po.id} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <span style={{ fontWeight: 700, color: '#0284c7', width: 40, flexShrink: 0 }}>{po.id}:</span>
                <span style={{ color: '#334155' }}><strong>{po.name}</strong> &ndash; {po.desc}</span>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginTop: 4, paddingTop: 6, borderTop: '1px solid #f1f5f9' }}>
              <span style={{ fontWeight: 700, color: '#0d9488', width: 40, flexShrink: 0 }}>PSO2:</span>
              <span style={{ color: '#334155' }}><strong>{curriculum.psoMapping[0].desc}</strong></span>
            </div>
          </div>
        </div>

      </div>

      {/* TECHNOLOGIES & SYSTEM ARCHITECTURE */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-header">
          <div className="card-title">
            <Cpu size={18} color="#0284c7" />
            <span>Technologies &amp; Architectural Stack</span>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
          <div style={{ padding: 12, borderRadius: 8, backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <strong style={{ fontSize: 13, color: '#0f172a' }}>React 18 &bull; Single Page App</strong>
            <p style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>Component-driven modular design with React Context state management.</p>
          </div>
          <div style={{ padding: 12, borderRadius: 8, backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <strong style={{ fontSize: 13, color: '#0f172a' }}>Vite 6 Fast Bundler</strong>
            <p style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>Instant Hot Module Replacement (HMR) and optimized modern JavaScript bundling.</p>
          </div>
          <div style={{ padding: 12, borderRadius: 8, backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <strong style={{ fontSize: 13, color: '#0f172a' }}>HTML5 &amp; Responsive CSS3</strong>
            <p style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>Accessible CSS grid/flexbox layout styled with modern medical design tokens.</p>
          </div>
          <div style={{ padding: 12, borderRadius: 8, backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <strong style={{ fontSize: 13, color: '#0f172a' }}>Recharts Data Visualization</strong>
            <p style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>Dynamic SVG charts for patient flow distribution and waiting turnaround metrics.</p>
          </div>
          <div style={{ padding: 12, borderRadius: 8, backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <strong style={{ fontSize: 13, color: '#0f172a' }}>HTML5 LocalStorage</strong>
            <p style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>Client-side persistent database for queues, tokens, and patient queue records across page reloads.</p>
          </div>
          <div style={{ padding: 12, borderRadius: 8, backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <strong style={{ fontSize: 13, color: '#0f172a' }}>Lucide React Vector Icons</strong>
            <p style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>Crisp iconography conveying healthcare actions and triage alerts.</p>
          </div>
        </div>
      </div>

      {/* VIVA QUESTIONS QUICK REFERENCE CARD */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <HelpCircle size={18} color="#7c3aed" />
            <span>SEPM Viva Examination Guide &bull; Model Questions for Student Presentation</span>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
          <div style={{ padding: 12, backgroundColor: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
            <strong style={{ fontSize: 12.5, color: '#0f172a' }}>Q1: What is the fundamental difference between DFD and Structure Chart?</strong>
            <p style={{ fontSize: 12, color: '#475569', marginTop: 4 }}>
              <strong>Answer:</strong> A Data Flow Diagram (DFD) models the <em>flow and transformation of data</em> through processes without imposing execution order. A Structure Chart illustrates the <em>hierarchical modular decomposition</em>, showing calling relationships, parameters (data couples), and control flags.
            </p>
          </div>

          <div style={{ padding: 12, backgroundColor: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
            <strong style={{ fontSize: 12.5, color: '#0f172a' }}>Q2: How is priority queuing implemented in this system?</strong>
            <p style={{ fontSize: 12, color: '#475569', marginTop: 4 }}>
              <strong>Answer:</strong> We use multi-tier preemptive queuing where <code>Emergency (Weight 3) &gt; High (Weight 2) &gt; Normal (Weight 1)</code>. Within the same priority rank, earlier registration timestamps (FIFO) take precedence.
            </p>
          </div>

          <div style={{ padding: 12, backgroundColor: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
            <strong style={{ fontSize: 12.5, color: '#0f172a' }}>Q3: What types of cohesion and coupling does this system exhibit?</strong>
            <p style={{ fontSize: 12, color: '#475569', marginTop: 4 }}>
              <strong>Answer:</strong> It achieves <em>Functional Cohesion</em> (each module carries out one discrete function) and <em>Data Coupling</em> (modules exchange minimal data parameters rather than shared global memory structures).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
