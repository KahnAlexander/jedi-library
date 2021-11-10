import { useState } from 'react'
// import emailjs from 'emailjs-com';

import {
    Box,
    Card,
    TextField
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const Contact = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    function sendEmail(e) {
        e.preventDefault();

        // emailjs.sendForm()
        console.log('SEND EMAIL', name, email, message);
    }

    const handleNameChange = (event) => {
        console.log('NAME EVENT', event.target.value)
        setName(event.target.value);
    }
    const handleEmailChange = (event) => {
        console.log('EMAIL EVENT', event.target.value)
        setEmail(event.target.value);
    }
    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    }
    const handleFormSubmit = async (event) => {
        setIsLoading(true);
        await sendEmail(event);
        setIsLoading(false);
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card m={3} sx={{padding: 4, width: '60%', backgroundColor: '#fafafa'}}>
                
                <div style={{display: 'block'}}>
                    <form onSubmit={handleFormSubmit}>
                        <div style={{display: 'flex', justifyContent: 'center', marginBottom: 30}}>
                            <h3>Please send an email below and I will respond shortly</h3>
                        </div>
                        <div style={{width: '40%'}}>
                            <TextField
                                id="name"
                                label="Name"
                                value={name}
                                type="text"
                                onChange={handleNameChange}
                                fullWidth
                                sx={{
                                    display: 'block',
                                    marginBottom: 2,
                                    backgroundColor: '#fff'
                                }}
                            />
                        </div>
                        <div style={{width: '40%'}}>
                            <TextField
                                id="email" 
                                label="Email"
                                value={email}
                                type="text"
                                onChange={handleEmailChange}
                                fullWidth
                                sx={{
                                    display: 'block',
                                    marginBottom: 2,
                                    backgroundColor: '#fff'
                                }}
                            />
                        </div>
                        <TextField
                            label="Message"
                            value={message}
                            type="text"
                            onChange={handleMessageChange}
                            fullWidth
                            multiline
                            minRows='4'
                            sx={{
                                display: 'block',
                                minHeight: '50px',
                                marginBottom: 2,
                                backgroundColor: '#fff'
                            }}
                        />
                        <LoadingButton
                            loading={isLoading}
                            loadingPosition="start"
                            startIcon={<MailOutlineIcon />}
                            variant="contained"
                            onClick={handleFormSubmit}>
                            Send Email
                        </LoadingButton>
                    </form>
                </div>
            </Card>
        </Box>
    )
}

export default Contact
