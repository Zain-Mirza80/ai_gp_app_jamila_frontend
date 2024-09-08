import React, { useState, useEffect } from 'react';
import PatientList from '../components/PatientList';
import AddPatientModal from '../components/AddPatientModal';

function DoctorDashboard() {
    const [patients, setPatients] = useState(() => {
        // Read the patients from local storage or initialize to an empty array
        const savedPatients = localStorage.getItem('patients');
        return savedPatients ? JSON.parse(savedPatients) : [];
    });
    const [showModal, setShowModal] = useState(false);

    // Effect to update local storage whenever patients change
    useEffect(() => {
        localStorage.setItem('patients', JSON.stringify(patients));
    }, [patients]);

    function addPatient(newPatient) {
        setPatients(prevPatients => [...prevPatients, { ...newPatient, id: prevPatients.length + 1 }]);
    }

    function deletePatient(id) {
        setPatients(prevPatients => prevPatients.filter(patient => patient.id !== id));
    }

    return (
        <div>
            <h1>Doctor's Dashboard</h1>
            <button onClick={() => setShowModal(true)}>Add New Patient</button>
            {showModal && <AddPatientModal addPatient={addPatient} />}
            <PatientList patients={patients} deletePatient={deletePatient} />
        </div>
    );
}

export default DoctorDashboard;
