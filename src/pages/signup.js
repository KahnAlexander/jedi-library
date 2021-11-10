import React, { useState } from 'react';
import { TextField, Alert, Card } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { styled } from '@mui/material/styles';

const Root = styled('div')({
    display: 'flex',
    justifyContent: 'center'
})

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertText, setAlertText] = useState('');
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return throwAlert('Passwords don\'t match!', 'error');
        }

        try {
            setIsLoading(true);
            await signup(email, password);
            throwAlert();
        } catch(e) {
            console.log('Error: ', e)
            throwAlert('Failed to sign up!', 'error');
        }
        
        setIsLoading(false);
    }

    const throwAlert = async (text='Signed up successfully!', type='success') => {
        setAlertText(text);
        setAlertType(type);
        setShowAlert(true);
        await sleep(3000);
        setShowAlert(false);
    }

    const { signup } = useAuth();

    return (
        <Root>
            <div style={{display: 'block'}}>
                <Card sx={{ minWidth: 400, p: 3}}>
                    <form style={{display: 'block'}} onSubmit={handleSignUp}>
                        <h2 style={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}>Sign Up</h2>
                            
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
                            <TextField
                                required
                                id="outlined-confirm-password"
                                label="Confirm Password"
                                value={confirmPassword}
                                type="password"
                                onChange={handleConfirmPasswordChange}
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
                                    startIcon={<AddBoxOutlinedIcon />}
                                    variant="contained"
                                    sx={{
                                        width: 1,
                                        display: 'flex',
                                        marginTop: 2
                                    }}
                                    type="submit">
                                    Sign Up
                                </LoadingButton>
                            </div>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                            { showAlert 
                                ? <Alert severity={alertType} sx={{
                                        width: 1
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
                            Already have an account?  <Link to="/login">Log In</Link>
                        </div>
                    </div>
                </div>
        </Root>
    )
}

export default SignUp
