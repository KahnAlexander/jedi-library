import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LibrarySection from '../components/LibrarySection';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  child: {
    width: '70%'
  }
}));

const Library = () => {
    const classes = useStyles();
    const sections = [
        { title: 'Javascript', description: 'Web scripting language, experience from common web JS Frameworks' },
        { title: 'ReactJS', description: "Javascript web framework" },
        { title: 'Salesforce LWC', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.' },
        { title: 'Salesforce Aura', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto sunt' },
        { title: 'Java', description: ' veniam aperiam dignissimos quaerat atque accusantium est reiciendis numqua' },
        { title: 'Python', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. ', disabled: true },
        { title: 'C', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. ', disabled: true }
    ];

    return (
        <div className={classes.root}>
            <div className={classes.child}>
                {sections.map((section) => section.disabled ? <LibrarySection title={section.title} description={section.description} key={section.title} disabled expanded={section.expanded}></LibrarySection> : <LibrarySection title={section.title} description={section.description} key={section.title}></LibrarySection>)}
            </div>
        </div>
    )
}

export default Library
