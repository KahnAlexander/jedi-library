import { useEffect, useState } from 'react';
import styled from 'styled-components'
import { CircularProgress, ButtonGroup, Button, Box, Grid } from '@mui/material';
import AppsIcon from '@mui/icons-material/Apps';
import ListIcon from '@mui/icons-material/List';
import ProjectCard from '../components/ProjectCard';
import axios from 'axios';

export const List = styled.div`
    display: block;
    align-items: center;
    // margin-right: -24px;  

    // margin-right: 24px;

    @media screen and (max-width: 768px) {
        display: none;
    }
`


const Code = () => {

    const [projects, setProjects] = useState([]);
    const [user, setUser] = useState('');
    const [displayGrid, setDisplayGrid] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    const handleGridClick = () => {
        setDisplayGrid(true);
    }

    const handleListClick = () => {
        setDisplayGrid(false);
    }

    useEffect(() => {

        async function fetchProjects() {
            if (JSON.parse(localStorage.getItem('projects'))?.length) {
                setProjects(JSON.parse(localStorage.getItem('projects')));
                // console.log('existing: ', JSON.parse(localStorage.getItem('projects')));
            } else {
                try {
                    let response = await axios.get('https://api.github.com/users/KahnAlexander/repos');
                    if (response?.data?.length) { 
                        setProjects(response.data);
                        // console.log('project data: ', response.data)
                        localStorage.setItem('projects', JSON.stringify(response.data));
                    }
                } catch (e) {
                    console.log('error: ', e);
                }
            }
        }

        async function fetchUserData() {
            if (JSON.parse(localStorage.getItem('gitUser'))) {
                setUser(JSON.parse(localStorage.getItem('gitUser')));
                // console.log('user: ', JSON.parse(localStorage.getItem('gitUser')));
            } else {
                try {
                    let response = await axios.get('https://api.github.com/users/KahnAlexander');
                    // console.log('user data: ', response.data)
                    if (response?.data) { 
                        setUser(response.data);
                        localStorage.setItem('gitUser', JSON.stringify(response.data));
                    }
                } catch (e) {
                    console.log('error: ', e);
                }
            }
        }

        setIsLoading(true);
        fetchProjects();
        fetchUserData();
        setIsLoading(false);
    }, []);

    return (
        <>
            <ButtonGroup variant="outlined" sx={{float: 'right', marginRight: 20, marginBottom: 1 }}>
                <Button onClick={handleGridClick}>
                    <AppsIcon />
                </Button>
                <Button onClick={handleListClick}>
                    <ListIcon />
                </Button>
            </ButtonGroup>

            <Grid 
                container 
                spacing={2} 
                pl={4} pr={2} 
                sx={{
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                { isLoading 
                    ? <CircularProgress /> 
                    : projects.map(project => 
                        displayGrid 
                        ? <Grid item xs={12} md={4} lg={2} mb={2}>
                            <ProjectCard cardStyle='grid' project={project} user={user} />
                        </Grid>
                        : <Grid item xs={12} mb={2} pb={2} sx={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <ProjectCard cardStyle='list' project={project} user={user} />
                        </Grid>
                    )
                }
            </Grid>
        </>
    )
}

export default Code
