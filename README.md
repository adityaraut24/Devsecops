# DFD and Structure-Chart-Based Design of a Hospital Queue Management System

A presentation-ready, fully functional web application designed for the **Software Engineering & Project Management (SEPM) CIAP Micro Project**.

---

## 🎓 Academic Credentials

| Detail | Information |
| :--- | :--- |
| **Project Title** | DFD and Structure-Chart-Based Design of a Hospital Queue Management System |
| **Student Name** | **Raut Aditya Manisha** |
| **Roll Number** | **124BTCS1047** |
| **Program** | B.Tech Cyber Security |
| **Course** | Software Engineering & Project Management (SEPM) |
| **Project Category** | CIAP Micro Project |
| **Course Outcome (CO)** | **CO4** – Apply structured design methods, Data Flow Diagrams (DFD), and Structure Charts |
| **Bloom Taxonomy Level** | **Level 4 (Analyze)** |
| **Program Outcomes (PO)** | **PO1, PO2, PO3, PO5, PO6, PO8** |
| **Program Specific Outcome** | **PSO2** |
| **UN Sustainable Development Goal** | **SDG 3 – Good Health and Well-being** (Target 3.8: Access to quality healthcare services) |
| **SDG Justification** | The system helps reduce patient waiting time and improves healthcare service efficiency. |

---

## 🌟 Key Features

1. **Interactive OPD Dashboard**:
   - Live KPI cards: Total Patients Today, Waiting Patients, Patients Being Served, Completed Patients, Average Waiting Time.
   - Dynamic priority queue table with real-time status badges and instant "Call Next Patient" dispatching.
   - Emergency warning alerts when critical patients require immediate triage attention.
   - Visual 9-stage **System Workflow Pipeline** demonstrating the end-to-end patient lifecycle.

2. **Patient Registration & Token Generation**:
   - Comprehensive form with validation (Name, Age, Gender, Phone, Department, Doctor, Visit Type, Priority, Symptoms, Appointment Date).
   - Generates sequential token slips (e.g., `T001`, `T002`) and patient IDs (`P001`, `P002`).
   - Modal token receipt with estimated waiting time and print slip capability.
   - Quick one-click "Fill Demo Patient" buttons for rapid professor demonstration.

3. **Queue Management Module**:
   - Multi-level priority sorting algorithm: **Emergency > High > Normal**, with First-Come First-Served (FCFS) within priority tiers.
   - Filtering by department, doctor, priority level, and queue status.
   - Full status lifecycle transitions: `Waiting` &rarr; `Called` &rarr; `In Consultation` &rarr; `Completed`.

4. **Doctor Examination Cabin Panel**:
   - Cabin switcher for testing multiple specialist rooms.
   - Live consultation room management with current patient, up-next preview, optional consultation notes, and skip controls.
   - Archive of recently completed consultations in each cabin.

5. **Patient Records (Queue Registry)**:
   - Searchable, filterable directory of all registered patients.
   - Detailed modal viewing registration details, triage complaint, and queue milestones.
   - Direct CSV database export for offline auditing.

6. **Healthcare Analytics & Reports (Recharts)**:
   - Department-wise patient intake vs waiting bar chart.
   - Current queue status distribution donut chart.
   - Hourly patient arrival and discharge curve line chart.
   - Peak hours detection and SDG 3 impact analysis.

7. **System Design – DFD & Structure Chart (SEPM Core)**:
   - **Level 0 (Context Diagram)**: External Entities (Patient, Receptionist, Doctor, Hospital Admin), central process 0.0, and bidirectional data flows.
   - **Level 1 DFD**: 6 functional processes and 3 data stores (`D1 Patient Database`, `D2 Queue Database`, `D3 Consultation Records`).
   - **Structure Chart**: 4-tier functional decomposition hierarchy tree displaying data couples (🔵) and control couples (⚪).
   - SEPM Viva prep guide with Cohesion/Coupling analysis and comparison tables.

8. **Zero Backend Required**:
   - Runs 100% locally on Vite + React.
   - Persistent storage using browser `LocalStorage`.
   - "Reset Demo Data" button to restore default sample patients anytime.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (comes with Node.js)

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Open in Browser
Visit:
```
http://localhost:5173/
```

---

## 📁 Project Structure

```
├── index.html                      # HTML entry with custom typography & medical icons
├── package.json                    # Project dependencies (React 18, Vite 6, Recharts, Lucide)
├── vite.config.js                  # Vite bundler config with local port 5173
├── src/
│   ├── main.jsx                    # React DOM entry point
│   ├── App.jsx                     # Top-level shell with sidebar & page router
│   ├── index.css                   # Healthcare theme design system & responsive styling
│   ├── context/
│   │   └── HospitalContext.jsx     # Centralized queue state, triage engine & notifications
│   ├── data/
│   │   └── initialData.js          # Departments, physicians, 12 demo patients & academic meta
│   ├── utils/
│   │   ├── queueUtils.js           # Priority comparator (Emergency > High > Normal) & wait calculator
│   │   └── storage.js              # LocalStorage sync and reset utilities
│   ├── components/
│   │   ├── Header.jsx              # Top bar with live clock, notifications bell & reset button
│   │   ├── Sidebar.jsx             # Persistent navigation & student credential badge
│   │   ├── StatCard.jsx            # Reusable metric card
│   │   ├── QueueTable.jsx          # Interactive queue table with direct action triggers
│   │   ├── WorkflowSteps.jsx       # 9-stage visual lifecycle workflow
│   │   ├── Modal.jsx               # Accessible modal dialog
│   │   ├── TokenReceiptModal.jsx   # OPD token receipt slip with print support
│   │   ├── PatientDetailModal.jsx  # Patient queue record inspector
│   │   ├── DFDDiagram.jsx          # Interactive SVG Level 0 Context & Level 1 DFDs
│   │   ├── StructureChart.jsx      # Functional decomposition tree with couples
│   │   └── Charts.jsx              # Recharts bar, donut, and line charts
│   └── pages/
│       ├── Dashboard.jsx           # Main operations control center
│       ├── PatientRegistration.jsx # Patient intake & token generation
│       ├── QueueManagement.jsx     # Full queue dispatcher with filters
│       ├── DoctorPanel.jsx         # Physician cabin consultation station
│       ├── PatientRecords.jsx      # Searchable patient queue registry with CSV export
│       ├── Reports.jsx             # Healthcare analytics dashboard
│       ├── SystemDesign.jsx        # SEPM DFD & Structure Chart diagrams + theory
│       └── About.jsx               # Academic dossier, CO/PO/PSO & SDG mapping
```

---

## 🎯 Viva Demonstration Steps for Professor

1. **Dashboard Overview**:
   - Point out the 5 KPI metric cards and show how they update dynamically.
   - Walk through the visual **System Workflow Pipeline** (Steps 1 to 9).
   - Click **"Call Next Patient"** to demonstrate immediate state change to `Called`.
2. **Registration & Token Slip**:
   - Go to **Patient Registration**, click **"Fill Emergency Demo"** and submit.
   - Show the generated Token Slip (`T013`), estimated wait time, and print dialog.
3. **Queue Prioritization Verification**:
   - Open **Queue Management** to show how the emergency patient is placed at the top of the waiting list above routine patients, adhering to the SEPM triage algorithm.
4. **Doctor Cabin Consultation**:
   - Go to **Doctor Panel**, select the assigned doctor cabin, click **Start Consultation**, type optional consultation notes, and click **Complete Consultation**.
5. **System Design (Star Attraction)**:
   - Navigate to **DFD & Structure Chart**.
   - Toggle between **Level 0 Context Diagram** and **Level 1 Decomposed DFD**. Click any process bubble to inspect its function.
   - Explain the **Structure Chart** hierarchy tree, pointing out Data Couples (🔵) and Control Couples (⚪).
   - Highlight the quote: *"DFD focuses on how data flows through the system, while the Structure Chart represents the functional decomposition of the system into modules."*
6. **Reset Anytime**:
   - Click the red **"Reset Demo Data"** button in the top navigation bar at any point to restore the original 12 sample patients.
