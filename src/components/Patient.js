import React from 'react';

function Patient({ patient, deletePatient }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div>
                {patient.firstName} {patient.lastName} - {patient.dob}
            </div>
            <button onClick={() => deletePatient(patient.id)}>Delete</button>
        </div>
    );
}

export default Patient;


// For commit
//WORKING IWTH IOS BUT NOT NONIOS