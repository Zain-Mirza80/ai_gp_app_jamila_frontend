import React from 'react';
import Patient from './Patient';

function PatientList({ patients, deletePatient }) {
    return (
        <div>
            {patients.map(patient => (
                <Patient key={patient.id} patient={patient} deletePatient={deletePatient} />
            ))}
        </div>
    );
}

export default PatientList;
