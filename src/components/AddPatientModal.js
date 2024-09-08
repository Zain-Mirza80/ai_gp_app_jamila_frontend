import React, { useState } from 'react';

function AddPatientModal({ addPatient }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        phoneNumber: ''
    });

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        addPatient(formData);
        setFormData({ firstName: '', lastName: '', dob: '', phoneNumber: '' }); // Reset form
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
            <input type="text" name="dob" value={formData.dob} onChange={handleChange} placeholder="Date of Birth" />
            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" />
            <button type="submit">Add Patient</button>
        </form>
    );
}

export default AddPatientModal;
