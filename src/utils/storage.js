import { INITIAL_PATIENTS } from '../data/initialData';

const STORAGE_KEY = 'hqms_hospital_patients_v1';

export const loadPatientsFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PATIENTS));
      return INITIAL_PATIENTS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PATIENTS));
      return INITIAL_PATIENTS;
    }
    return parsed;
  } catch (err) {
    console.error('Error loading patients from localStorage:', err);
    return INITIAL_PATIENTS;
  }
};

export const savePatientsToStorage = (patients) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
  } catch (err) {
    console.error('Error saving patients to localStorage:', err);
  }
};

export const clearAndResetStorage = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PATIENTS));
    return INITIAL_PATIENTS;
  } catch (err) {
    console.error('Error resetting patients in localStorage:', err);
    return INITIAL_PATIENTS;
  }
};
