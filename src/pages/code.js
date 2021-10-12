import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import ProjectCard from '../components/ProjectCard';
import axios from 'axios';

import Box from '@mui/material/Box';

let isLoading = false;

const Code = () => {

    const [projects, setProjects] = useState([]);
    const [user, setUser] = useState('');

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

        isLoading = true;
        fetchProjects();
        fetchUserData();
        isLoading = false;
    }, []);

    return (
        <Box
            sx={{
            display: 'flex',
            flexWrap: 'wrap',
            bgcolor: 'background.paper',
            justifyContent: 'center',
            alignContent: 'flex-start'
        }}>
            {
                isLoading ? 
                <CircularProgress /> : 
                projects.map(project => <Box sx={{ p: 1, m: 1 }} key={project.name}><ProjectCard project={project} user={user}></ProjectCard></Box>)
            }
        </Box>
    )
}

export default Code
