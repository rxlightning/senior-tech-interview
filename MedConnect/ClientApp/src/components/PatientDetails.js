import React from 'react';
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import { pink, blue } from '@mui/material/colors';
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import { calculateAge } from './utils';

const styles = {
    card: {
        maxWidth: 400,
        margin: '0 auto',
        marginTop: 20,
    },
    heading: {
        fontSize: '1.5rem',
        marginBottom: 4
    },
    detail: {
        marginBottom: 2,
    },
};

const PatientDetails = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [patient, setPatient] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
  
        const fetchPatient = async () => {
            try {
                const response = await axios.get(`/api/patients/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${storedToken}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
                setPatient(response.data);

            } catch (error) {
                setPatient(null);
                if (error.response.status === 401)
                    navigate('/unauthorized');
                else 
                    console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPatient();
    }, [id, navigate]);

    if (!patient && isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Card sx={styles.card}>
            <CardContent>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h4" sx={styles.heading}>
                        {patient.firstName} {patient.lastName}
                    </Typography>
                    <div style={{ marginLeft: 'auto' }}>
                        <Avatar sx={{ bgcolor: patient.gender === 'Male' ? blue[500] : pink[500] }}>
                            <PersonOutlineTwoToneIcon />
                        </Avatar>
                    </div>
                </div>
                <Typography variant="body1" sx={styles.detail}>
                    DOB: {new Date(patient.dateOfBirth).toLocaleDateString()} (Age: {calculateAge(patient.dateOfBirth)})
                </Typography>
                <Typography variant="body1" sx={styles.detail}>
                    Gender: {patient.gender}
                </Typography>
                <Typography variant="body1" sx={styles.detail}>
                    Address: {patient.addressLine1} {patient.addressLine2}
                </Typography>
                <Typography variant="body1" sx={styles.detail}>
                    {patient.city}, {patient.state}. {patient.postalCode}
                </Typography>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Link to="/patients" style={{ textDecoration: 'none' }}>
                        <Typography variant="body1" sx={{ color: 'blue' }}>
                            &lt; Back to Patients
                        </Typography>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};

export default PatientDetails;