import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    height: '90vh',
    float: 'left'
  }
}));

const MediaTab = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            
                <div>
                    <div><button>Facebook</button></div>
                    <div><button>Instagram</button></div>
                    <div><button>Etsy</button></div>
                </div>
        </div>
    );
}

export default MediaTab;