import React, { useState } from 'react'

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import MailIcon from '@mui/icons-material/Mail';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  Card,
  TextField,
  Dialog
} from '@mui/material';

const SocialDial = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const actions = [
    { icon: <LinkedInIcon />, name: 'LinkedIn', handler: () => window.open('https://www.linkedin.com/in/kahn-alex/') },
    { icon: <GitHubIcon />, name: 'GitHub', handler: () => window.open('https://github.com/KahnAlexander') },
    { icon: <MailIcon/>, name: 'GMail', handler: () => setOpen(true) }
  ];

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
  const handleClose = () => {
    setOpen(false);
  };

  return ( 
    <>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, left: 16 }}
        icon={<EmojiPeopleIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.handler}
          />
        ))}
      </SpeedDial>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Card m={3} sx={{padding: 4, backgroundColor: '#fafafa'}}>
              
            <div style={{display: 'block'}}>
              <form onSubmit={handleFormSubmit}>
                <div style={{display: 'flex', justifyContent: 'center', marginBottom: 30}}>
                  <h3>Please write a message below and I will respond shortly</h3>
                </div>
                <div>
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
                <div>
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
                  onClick={handleFormSubmit}
                >
                  Send Email
                </LoadingButton>
              </form>
            </div>
          </Card>
        </Box>
      </Dialog>
    </>
  )
}

export default SocialDial