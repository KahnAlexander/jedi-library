import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LibrarySection from '../components/LibrarySection';
import { useDatabase } from '../contexts/DatabaseContext';
import { useAuth } from '../contexts/AuthContext';
import { Button, CircularProgress, Card, CardHeader, CardContent } from '@mui/material';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  child: {
    width: '80%'
  },
  addButton: {
    marginLeft: '4vw',
    marginTop: '25px'
  }
}));

const Library = () => {
    const classes = useStyles();
    const [knowledge, setKnowledge] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();

    const { 
      createKnowledge,
      readAllKnowledge 
    } = useDatabase();

    const handleAddKnowledge = async () => {
      const newKey = await createKnowledge();
      history.push({
        pathname: '/knowledgeItem/' + newKey,
        item: {
          title: '',
          description: '',
          content: [],
          uses: [],
          disabled: true,
          key: newKey,
          comfort: 0
        } 
      }); 
    }

    useEffect(() => {
      let knowledgeList = [];
      readAllKnowledge((res) => {
        for (const [key, value] of Object.entries(res)) {
          knowledgeList.push({
            ...value,
            key: key
          });
        }
        setKnowledge(knowledgeList);
        setIsLoading(false);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { currentUser } = useAuth();

    return (
        <div className={classes.root}>
          {
            isLoading 
            ? <CircularProgress sx={{marginTop: 10}} />
            : <div className={classes.child}>
                <Card sx={{backgroundColor: '#363739', p: 2}}>
                  <CardHeader 
                    title="Library of Skills" 
                    titleTypographyProps={{color: '#fff'}} 
                    subheader="A library of my technical skills and relevant information regarding each topic. Skill meters indicate my comfort level with each topic" 
                    subheaderTypographyProps={{color: '#bbb'}} 
                  />
                  <CardContent>{
                    knowledge && knowledge.length 
                    ? knowledge.map((section) => 
                      <LibrarySection 
                        data={section}
                        key={section.key}>
                      </LibrarySection>
                    )
                    : <h2>No info found! Please refresh the page or yell at Alex to fix this.</h2>
                  }</CardContent>
                  { currentUser && <Button variant="contained" color="primary" onClick={handleAddKnowledge} className={currentUser ? classes.addButton : ''}>Add Knowledge</Button> }
                </Card>
              </div>
          }
        </div>
    )
}

export default Library
