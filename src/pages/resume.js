import React, { useEffect, useState } from 'react'
import { useDatabase } from '../contexts/DatabaseContext';
import resume from '../resources/KahnResume.pdf';
import CustomBadge from '../components/CustomBadge';
import { Grid, Box } from '@mui/material';

const Resume = () => {
    const [knowledge, setKnowledge] = useState([]);
    const [uses, setUses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { readAllKnowledge } = useDatabase();

    useEffect(() => {
      let knowledgeList = [];
      let useList = [];
      readAllKnowledge((res) => {
        for (const [key, value] of Object.entries(res)) {
            knowledgeList.push({
            ...value,
            key: key
            });

            if (value.uses) for (const [key, use] of Object.entries(value.uses)) {
                if (!useList.find((useFromList) => useFromList.label === use.label)) {
                    useList.push({...use});
                }
            }
        }
        setKnowledge(knowledgeList);
        setUses(useList);
        setIsLoading(false);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Grid container spacing={2} sx={{
            display: 'flex',
            justifyContent: 'center'
        }}>
            <Grid item xs={12} lg={4} sx={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                <iframe 
                    title='Resume PDF' 
                    src={resume}
                    height='820em'
                    width='600px'>
                </iframe>
            </Grid>
            <Grid item xs={12} lg={4} sx={{
                display: 'flex',
                justifyContent: 'left'
            }}>
                <Box sx={{display: 'block'}}>
                    <Box sx={{display: 'flex', flexWrap: 'wrap', marginTop: '50px', marginBottom: '50px'}}>
                        { uses.map((use) => { 
                            return (
                                use.label && 
                                <Box m={0.5} mt={1}>
                                    <CustomBadge key={'related_badge_' + use?.label}>{use?.label}</CustomBadge>
                                </Box>
                            )}) 
                        }
                    </Box>
                
                    <p style={{
                        display: 'flex',
                        justifyContent: 'left'
                    }}>
                        My skills are focused on web development with javascript frameworks. <br/><br/>
                        I am well-trained with the Salesforce platform, and Salesforce front-end customization using Lightning Web Components, and the Aura component framwork.<br/>

                    </p>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Resume
