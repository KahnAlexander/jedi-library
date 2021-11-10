import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {
    IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDatabase } from '../../contexts/DatabaseContext';
import { useState, useEffect, forwardRef } from 'react';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteModal(props) {
    const { sectionKey } = props;
    const [open, setOpen] = useState(false);
    const [knowledgeItemId, setKnowledgeItemId] = useState('');

    const {
      deleteKnowledge 
    } = useDatabase();

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = (event) => {
        if (event.target.value === 'confirm') {
            handleDeleteKnowledge();
        }
        setOpen(false);
    };
    const handleDeleteKnowledge = async () => {
        deleteKnowledge(knowledgeItemId, async (res) => {
            window.location.reload();
        });
    }

    useEffect(() => {
        setKnowledgeItemId(sectionKey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <IconButton color="error" variant="outlined" aria-label="Delete Knowledge Item" onClick={handleClickOpen}>
                <DeleteIcon />
            </IconButton>   
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Are you sure?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Deleting this knowledge item is permanent, click below if you want to proceed with delete. 
                    </DialogContentText>
                </DialogContent>

                <Button variant="outlined" color="error" sx={{m: 2, mt: 0}} value="confirm" onClick={handleClose}>Yes, I'm sure, delete it</Button>
                <Button variant="outlined" color="primary" sx={{m: 2, mt: 0}} value="decline" onClick={handleClose}>No, I want to keep it</Button>
            </Dialog>
        </div>
    );
}
