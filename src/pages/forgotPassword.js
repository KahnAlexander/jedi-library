import React, { useState } from 'react';
import { TextField, Alert, Card } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertText, setAlertText] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handlePasswordReset = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await resetPassword(email);
            throwAlert();
        } catch(e) {
            console.log('Error: ', e)
            throwAlert('Failed to log in!', 'error');
        }
        
        setIsLoading(false);
    };
    const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));    

    const throwAlert = async (text='Check your inbox for more instructions', type='success') => {
        setAlertText(text);
        setAlertType(type);
        setShowAlert(true);
        await sleep(3000);
        setShowAlert(false);
    }

    const { resetPassword } = useAuth();

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center'
        }}>
            <div style={{display: 'block'}}>
                <Card sx={{ minWidth: 400, p: 5}}>
                    <form style={{display: 'block'}} onSubmit={handlePasswordReset}>
                        <h2 style={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}>Reset Password</h2>
                        <TextField
                            id="outlined-email"
                            label="Email"
                            value={email}
                            type="text"
                            onChange={handleEmailChange}
                            fullWidth
                            sx={{
                                display: 'flex',
                                marginTop: 2
                            }}
                        />

                        <div style={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <LoadingButton
                                loading={isLoading}
                                loadingPosition="start"
                                startIcon={<AutorenewIcon />}
                                variant="contained"
                                sx={{
                                    width: 1,
                                    display: 'flex',
                                    marginTop: 2
                                }}
                                type='submit'>
                                Reset Password
                            </LoadingButton> 
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: 15
                        }}>
                            <Link to="/login">Log In</Link>
                        </div>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                        { showAlert 
                            ? <Alert severity={alertType} sx={{
                                    width: 1,
                                    marginTop: 2
                                }}>{alertText}</Alert>
                            : <></>
                        }
                        </div>
                    </form>
                </Card>
                <div style={{display: 'block'}}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: 10
                    }}>
                        Need an account?  <Link to="/signup">Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword