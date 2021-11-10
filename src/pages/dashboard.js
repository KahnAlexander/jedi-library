import React from 'react'
import {
    Card, 
    CardContent,
    Button
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext'

export default function Dashboard() {
    const { currentUser } = useAuth();

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center'
        }}>
            <Card sx={{ minWidth: 275, display: 'flex', justifyContent: 'center'}}>
                <CardContent sx={{display: 'block'}}>
                    <h2 style={{display: 'flex', justifyContent: 'center', marginBottom: 10}}>Profile</h2>
                    <p style={{display: 'flex', justifyContent: 'center', marginBottom: 10}}><strong>Email:</strong>{currentUser.email}</p>
                    {/* <Button variant="contained" onClick={() => alert('clicked!')}>Click Me</Button> */}
                    <hr/><br/>
                    <h3>Todos:</h3>
                    <p>Finish send email button</p>
                    <p>Finish logo</p>
                    <p>Finish dashboard</p>
                    <p>Fill in rest of content on homepage</p>
                    <p>Fill in rest of content on resume page</p>
                </CardContent>
            </Card>
        </div>
    )
}
