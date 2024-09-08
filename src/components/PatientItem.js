// PatientItem.js
import React from 'react';

function PatientItem({ patient }) {
    return (
        <div className="patient-item">
            <span>{patient.firstName} {patient.lastName} - {patient.dob}</span>
            <button>Chat</button> {/* Implement chat link functionality */}
        </div>
    );
}
// WOHOO WOORKING
export default PatientItem;
