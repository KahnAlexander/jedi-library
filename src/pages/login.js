import React, { useState } from 'react';
import { TextField, Alert, Card } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import LoginIcon from '@mui/icons-material/Login';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertText, setAlertText] = useState('');

    const history = useHistory();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleLogIn = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await login(email, password);
            history.push('/dashboard');
        } catch(e) {
            console.log('Error: ', e)
            throwAlert('Failed to log in!', 'error');
            setIsLoading(false);
        }
    };
    const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));    

    const throwAlert = async (text='Logged in successfully!', type='success') => {
        setAlertText(text);
        setAlertType(type);
        setShowAlert(true);
        await sleep(3000);
        setShowAlert(false);
    }

    const { login } = useAuth();

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center'
        }}>
            <div style={{display: 'block'}}>
                <Card sx={{ minWidth: 400, p: 3}}>
                    <form style={{display: 'block'}} onSubmit={handleLogIn}>
                        <h2 style={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}>Log In</h2>
                        <TextField
                            required
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
                        <TextField
                            required
                            id="outlined-password"
                            label="Password"
                            value={password}
                            type="password"
                            onChange={handlePasswordChange}
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
                                startIcon={<LoginIcon />}
                                variant="contained"
                                sx={{
                                    width: 1,
                                    display: 'flex',
                                    marginTop: 2
                                }}
                                type='submit'>
                                Log In
                            </LoadingButton> 
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: 15
                        }}>
                            <Link to="/forgot-password">Forgot Password?</Link>
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

export default Login