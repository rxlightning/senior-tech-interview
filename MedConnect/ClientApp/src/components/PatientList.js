import React from 'react';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { calculateAge } from './utils';

const PatientList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [patients, setPatients] = useState([]);
    const navigate = useNavigate();

    const StyledTable = styled(Table)`
          min-width: 400px;
        `;

    const StyledTableCell = styled(TableCell)`
          padding: 16px;
        `;


    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const fetchPatients = async () => {
            try {
                const response = await axios.get("/api/patients", {
                    headers: {
                        "Authorization": `Bearer ${storedToken}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
                    setPatients(response.data);
                
            } catch (error) {
                setPatients(null);
                if (error.response.status === 401)
                    navigate('/unauthorized');
                else
                    console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPatients();
    }, [navigate]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!patients.length) {
        return <div>No patients found.</div>;
    }

    return (
        <div>
            <Typography variant="h5">Patient List</Typography>
            <br />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="h6">Name</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h6">Gender</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h6">DOB</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h6">Age</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {patients.map((patient) => (
                            <TableRow key={patient.patientId} hover>
                                <TableCell>
                                    <Link to={`/patient/${patient.patientId}`}>
                                        <Typography>{`${patient.firstName} ${patient.lastName}`}</Typography>
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Typography>{patient.gender}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>{new Date(patient.dateOfBirth).toLocaleDateString()}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>{calculateAge(patient.dateOfBirth)}</Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default PatientList;