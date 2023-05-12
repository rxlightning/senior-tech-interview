import React, { useState } from 'react';

function PatientListPage() {
  const [selectedPatient, setSelectedPatient] = useState(null);

  const patients = [
    {
      id: 1,
      firstname: 'John',
      lastname: 'Doe',
      gender: 'Male',
      dateOfBirth: '1990-01-01',
      addressLine1: '123 Main St',
      addressLine2: '',
      city: 'Anytown',
      state: 'CA',
      postalCode: '12345'
    },
    {
      id: 2,
      firstname: 'Jane',
      lastname: 'Smith',
      gender: 'Female',
      dateOfBirth: '1995-05-05',
      addressLine1: '456 Oak Ave',
      addressLine2: 'Apt 101',
      city: 'Othertown',
      state: 'NY',
      postalCode: '54321'
    }
  ];

  const handleRowClick = (patient) => {
    setSelectedPatient(patient);
  };

  const closeModal = () => {
    setSelectedPatient(null);
  };

  return (
    <div>
      <h1>Patient List</h1>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id} onClick={() => handleRowClick(patient)}>
              <td>{patient.firstname}</td>
              <td>{patient.lastname}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedPatient && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>{selectedPatient.firstname} {selectedPatient.lastname}</h2>
            <p>Gender: {selectedPatient.gender}</p>
            <p>Date of Birth: {selectedPatient.dateOfBirth}</p>
            <p>Address: {selectedPatient.addressLine1} {selectedPatient.addressLine2} {selectedPatient.city}, {selectedPatient.state} {selectedPatient.postalCode}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientListPage;
