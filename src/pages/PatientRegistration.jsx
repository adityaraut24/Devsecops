import React, { useState, useEffect } from 'react';
import { useHospital } from '../context/HospitalContext';
import { TokenReceiptModal } from '../components/TokenReceiptModal';
import {
  UserPlus,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Calendar,
  Building,
  User,
  Phone,
  FileText,
  AlertTriangle
} from 'lucide-react';

export const PatientRegistration = ({ onNavigate }) => {
  const { departments, registerPatient } = useHospital();

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    phone: '',
    department: 'General Medicine',
    doctor: '',
    visitType: 'New Patient',
    priority: 'Normal',
    symptoms: '',
    appointmentDate: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [createdPatient, setCreatedPatient] = useState(null);
  const [showTokenModal, setShowTokenModal] = useState(false);

  // Automatically update doctors list when department changes
  const activeDept = departments.find(d => d.name === formData.department);
  const availableDoctors = activeDept ? activeDept.doctors : [];

  useEffect(() => {
    if (availableDoctors.length > 0 && !formData.doctor) {
      setFormData(prev => ({ ...prev, doctor: availableDoctors[0].name }));
    }
  }, [formData.department, availableDoctors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      // If department changed, automatically select the first doctor of that department
      if (name === 'department') {
        const found = departments.find(d => d.name === value);
        if (found && found.doctors.length > 0) {
          updated.doctor = found.doctors[0].name;
        }
      }
      return updated;
    });

    // Clear error for field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Patient name is required.';
    } else if (formData.name.trim().length < 3) {
      errs.name = 'Name must be at least 3 characters.';
    }

    const ageNum = parseInt(formData.age, 10);
    if (!formData.age || isNaN(ageNum)) {
      errs.age = 'Age is required.';
    } else if (ageNum <= 0 || ageNum > 120) {
      errs.age = 'Please enter a valid age between 1 and 120.';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Contact phone number is required.';
    } else if (!/^\d{10}$/.test(formData.phone.trim().replace(/[-\s]/g, ''))) {
      errs.phone = 'Please enter a valid 10-digit phone number.';
    }

    if (!formData.department) {
      errs.department = 'Department selection is required.';
    }

    if (!formData.doctor) {
      errs.doctor = 'Please assign a consulting doctor.';
    }

    if (!formData.symptoms.trim()) {
      errs.symptoms = 'Please enter primary complaints/symptoms for triage.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newPatient = registerPatient(formData);
    setCreatedPatient(newPatient);
    setShowTokenModal(true);

    // Reset form for next patient
    setFormData({
      name: '',
      age: '',
      gender: 'Male',
      phone: '',
      department: 'General Medicine',
      doctor: availableDoctors[0]?.name || '',
      visitType: 'New Patient',
      priority: 'Normal',
      symptoms: '',
      appointmentDate: new Date().toISOString().split('T')[0],
      notes: ''
    });
  };

  // Quick fill sample data for fast viva demo
  const handleQuickDemoFill = (type = 'emergency') => {
    if (type === 'emergency') {
      setFormData({
        name: 'Sanjay Deshmukh',
        age: '58',
        gender: 'Male',
        phone: '9822114455',
        department: 'Cardiology',
        doctor: 'Dr. Vikram Joshi',
        visitType: 'New Patient',
        priority: 'Emergency',
        symptoms: 'Sudden onset crushing chest pain radiating to left shoulder and profuse cold sweating.',
        appointmentDate: new Date().toISOString().split('T')[0],
        notes: 'Priority triage: Emergency triage code red.'
      });
    } else {
      setFormData({
        name: 'Kavita Shinde',
        age: '29',
        gender: 'Female',
        phone: '9867554433',
        department: 'Dermatology',
        doctor: 'Dr. Meera Nambiar',
        visitType: 'Follow-up',
        priority: 'High',
        symptoms: 'Severe urticaria (skin hives) with burning sensation on arms and neck.',
        appointmentDate: new Date().toISOString().split('T')[0],
        notes: 'Follow-up consultation after anti-allergy medications.'
      });
    }
    setErrors({});
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-header-text">
          <h2>Outpatient (OPD) Registration & Token Generation</h2>
          <p>Structured patient intake, priority assessment, and instant queue token allocation.</p>
        </div>
        <div className="page-header-actions">
          <button
            type="button"
            onClick={() => handleQuickDemoFill('emergency')}
            className="btn btn-outline btn-sm"
            style={{ color: '#be123c', borderColor: '#fecdd3' }}
            title="Pre-populate emergency case for professor demo"
          >
            <Sparkles size={13} />
            <span>Fill Emergency Demo</span>
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemoFill('regular')}
            className="btn btn-outline btn-sm"
            title="Pre-populate high priority case"
          >
            <Sparkles size={13} />
            <span>Fill Routine Demo</span>
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '880px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit} className="card" style={{ padding: '28px' }}>
          <div className="card-header" style={{ marginBottom: 20 }}>
            <div>
              <div className="card-title">
                <UserPlus size={18} color="#0284c7" />
                <span>Patient Registration Form</span>
              </div>
              <div className="card-subtitle">
                Level 1 DFD Process 1.0 (Patient Registration) &bull; Feeds Data Store D1
              </div>
            </div>
            <span style={{ fontSize: 11, color: '#64748b' }}>
              Fields marked with <span style={{ color: '#e11d48' }}>*</span> are mandatory
            </span>
          </div>

          <div className="form-grid">
            {/* Patient Name */}
            <div className="form-group">
              <label className="form-label">
                Patient Full Name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Ramesh Chandra Verma"
                className="form-input"
              />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>

            {/* Age & Gender */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group">
                <label className="form-label">
                  Age (Years) <span className="required">*</span>
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="e.g. 42"
                  min="1"
                  max="120"
                  className="form-input"
                />
                {errors.age && <span className="form-error">{errors.age}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Gender <span className="required">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Phone Number */}
            <div className="form-group">
              <label className="form-label">
                Phone Number (10 digits) <span className="required">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. 9820145210"
                maxLength="10"
                className="form-input"
              />
              {errors.phone && <span className="form-error">{errors.phone}</span>}
            </div>

            {/* Appointment Date */}
            <div className="form-group">
              <label className="form-label">
                Appointment Date <span className="required">*</span>
              </label>
              <input
                type="date"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            {/* Department */}
            <div className="form-group">
              <label className="form-label">
                Hospital Department <span className="required">*</span>
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="form-select"
              >
                {departments.map(d => (
                  <option key={d.id} value={d.name}>{d.name}</option>
                ))}
              </select>
              {errors.department && <span className="form-error">{errors.department}</span>}
            </div>

            {/* Consulting Doctor */}
            <div className="form-group">
              <label className="form-label">
                Consulting Doctor <span className="required">*</span>
              </label>
              <select
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                className="form-select"
              >
                {availableDoctors.map(doc => (
                  <option key={doc.id} value={doc.name}>
                    {doc.name} ({doc.room})
                  </option>
                ))}
              </select>
              {errors.doctor && <span className="form-error">{errors.doctor}</span>}
            </div>

            {/* Visit Type */}
            <div className="form-group">
              <label className="form-label">
                Visit Type <span className="required">*</span>
              </label>
              <select
                name="visitType"
                value={formData.visitType}
                onChange={handleChange}
                className="form-select"
              >
                <option value="New Patient">New Patient (First Visit)</option>
                <option value="Follow-up">Follow-up Consultation</option>
              </select>
            </div>

            {/* Priority Assessment */}
            <div className="form-group">
              <label className="form-label">
                Priority Tier <span className="required">*</span>
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="form-select"
                style={{
                  borderColor: formData.priority === 'Emergency' ? '#f43f5e' : (formData.priority === 'High' ? '#f59e0b' : undefined),
                  backgroundColor: formData.priority === 'Emergency' ? '#fff1f2' : (formData.priority === 'High' ? '#fffbeb' : undefined),
                  fontWeight: 600
                }}
              >
                <option value="Normal">Normal (Standard Walk-in)</option>
                <option value="High">High (Elderly / Severe Discomfort)</option>
                <option value="Emergency">🚨 Emergency (Immediate Triage Bypassing)</option>
              </select>
            </div>

            {/* Symptoms */}
            <div className="form-group full-width">
              <label className="form-label">
                Reported Symptoms / Complaints <span className="required">*</span>
              </label>
              <textarea
                name="symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                placeholder="Describe patient's symptoms, discomfort, or reason for outpatient visit..."
                className="form-textarea"
              />
              {errors.symptoms && <span className="form-error">{errors.symptoms}</span>}
            </div>

            {/* Additional Receptionist Notes */}
            <div className="form-group full-width">
              <label className="form-label">Receptionist Triage Notes (Optional)</label>
              <input
                type="text"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="e.g. Wheelchair requested; vitals recorded at triage desk..."
                className="form-input"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div style={{ marginTop: 24, paddingTop: 18, borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 12 }}>
            <button
              type="button"
              onClick={() => onNavigate('dashboard')}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <CheckCircle size={16} />
              <span>Register Patient & Generate Token</span>
            </button>
          </div>
        </form>
      </div>

      {/* Confirmation Token Receipt Modal */}
      <TokenReceiptModal
        patient={createdPatient}
        isOpen={showTokenModal}
        onClose={() => setShowTokenModal(false)}
        onViewQueue={() => onNavigate('queue')}
      />
    </div>
  );
};
