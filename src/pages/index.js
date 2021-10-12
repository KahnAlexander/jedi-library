import React from 'react'
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

const Home = () => {
    return (
        <Box
            sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center'
        }}>
            <Box>
                <Box sx={{marginTop: '50px', marginRight: '50px'}}>
                    <img alt="Zohan" src={require('../resources/zohan.jpeg').default} />
                </Box>
            </Box>

            <Divider sx={{height: '500px', maxHeight: '500px'}} orientation="vertical" flexItem />
            
            <Box sx={{marginTop: '150px', marginLeft: '50px'}}>
                <Box><h1>Alex Kahn</h1></Box>
                <Box><h4>Software Developer, State Farm Insurance Companies</h4></Box>
                <Box>
                    <br/>
                    <p>
                        Front-end web developer supporting a Salesforce product.
                        <br/>
                        Experience with full-stack Salesforce and integration development.
                    </p>
                    <br/>
                    <p>
                        I enjoy backpacking, rock climbing, learning Javascript frameworks, <br/>and current events.
                    </p>
                </Box>
            </Box>
        </Box>
    )
}

export default Home
