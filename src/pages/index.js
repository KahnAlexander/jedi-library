import React from 'react'
import { 
    Box, 
    Divider, 
    Grid
} from '@mui/material';

const Home = () => {
    return (
        <Box
            sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center'
        }}>

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} pt={10}>
                    <Grid item xs={10} md={5} sx={{justifyContent: 'right', display: 'flex'}}>

                        {/* <Box sx={{height: '16em'}}><img alt="Zohan" src={require('../resources/Kahnye.JPG').default} /></Box> */}
                        <img width="500" height="500" alt="Zohan" src={require('../resources/headshot.JPG').default} />

                    </Grid>
                    <Grid item xs={2} md={2}>
                        <Divider orientation='vertical' flexitem="true"><h3>Alexander Kahn</h3></Divider>
                    </Grid>
                    <Grid item xs={12} md={5} sx={{marginTop: '8em'}}>

                        <Box><h3>Software Engineer, State Farm Insurance Companies</h3></Box>
                        <Box>
                            <br/>
                            <p>
                                Front-end web developer supporting a Salesforce product.
                                <br/>
                                Experience with full-stack Salesforce and integration development. 
                            </p>
                            <br/>
                            <p>
                                I enjoy nature, fitness, exploring web development, politics and culture, and philosophy.
                            </p>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default Home
