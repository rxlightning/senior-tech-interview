import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Button, CircularProgress, Typography } from '@mui/material';
import { styled } from "@mui/system";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";

const LoginContainer = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  border-radius: 8px;
  background-color: #f8f8f8;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 400px;
  margin-top: 80px;
`;

const TitleWrapper = styled("div")`
  margin-bottom: 32px;
  text-align: center;
`;

const Title = styled("h1")`
  margin: 0;
  font-size: 36px;
  font-weight: 500;
  color: #333;
`;

const StyledField = styled(Field)`
  margin-bottom: 16px;
`;

const StyledButton = styled(Button)`
  margin-top: 16px;
`;

const StyledError = styled(ErrorMessage)`
  color: red;
  margin-top: 8px;
`;

const StyledSubtitle = styled("p")`
  font-size: 16px;
  margin-bottom: 24px;
  text-align: center;
`;


const LoginForm = () => {
    // Remove token from local storage
    localStorage.removeItem('token');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (values, { setSubmitting }) => {
        setIsLoading(true);
        setIsError(false);

        try {
            const response = await axios.post("/api/login", values);
            localStorage.setItem('token', response.data); // Store the token in local storage
            navigate('/patients');
        } catch (error) {
            setIsError(true);
            // Remove token from local storage
            localStorage.removeItem('token');
        } finally {
            setIsLoading(false);
            setSubmitting(false);
        }
    };

    return (
        <Formik initialValues={{ email: '', password: '' }} onSubmit={handleSubmit}>
            {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
                <LoginContainer>
                    <StyledForm>
                        <TitleWrapper><Title>Login</Title></TitleWrapper>
                        <StyledSubtitle>Please enter your credentials to login.</StyledSubtitle>
                        <StyledField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            as={TextField}
                            variant="outlined"
                            fullWidth
                            value={values.email}
                            onBlur={handleBlur}
                            onChange={handleChange}
                        />
                        <StyledError name="email" component="div" />
                        <StyledField
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            as={TextField}
                            variant="outlined"
                            fullWidth
                            value={values.password}
                            onBlur={handleBlur}
                            onChange={handleChange}
                        />
                        <StyledError name="password" component="div" />
                        <StyledButton
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting || isLoading}
                        >
                            {isLoading ? <CircularProgress size={24} /> : 'Login'}
                        </StyledButton>
                        {isError && (
                            <Typography color="error" variant="body2" align="center">
                                Incorrect email or password. Please try again.
                            </Typography>
                        )}
                    </StyledForm>
                </LoginContainer>

            )}
        </Formik>
    );
};

export default LoginForm;