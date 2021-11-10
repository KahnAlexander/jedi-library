import React, { useEffect, useState } from 'react'
import { useDatabase } from '../contexts/DatabaseContext';
import { styled } from '@mui/material/styles';
import { 
    TextField, 
    Alert, 
    Card, 
    Grid, 
    Button, 
    Checkbox, 
    FormControlLabel, 
    IconButton,
    Slider,
    Typography,
    Box,
    Divider
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { useHistory } from 'react-router-dom';

const CustomBadge = styled('div')(({ theme }) => ({
  padding: '6px 8px 6px 8px',
  borderRadius: '18px',
  backgroundColor: '#1976d2',
  fontSize: theme.typography.pxToRem(14),
  color: '#fff',
  display: 'flex',
  alignItems: 'center'
}));

const marks = [
  { value: 0, label: 1 },
  { value: 25, label: 2 },
  { value: 50, label: 3 }, 
  { value: 75, label: 4 }, 
  { value: 100, label: 5 }
]

export default function KnowledgeItem(props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [content, setContent] = useState([]);
    const [uses, setUses] = useState([]);
    const [currentUse, setCurrentUse] = useState('');
    const [key, setKey] = useState('');
    const [comfort, setComfort] = useState(0);

    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertText, setAlertText] = useState('');
    const history = useHistory();
    const { 
      updateKnowledge
    } = useDatabase();

    const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));   
    const throwAlert = async (text='Update successful!', type='success') => {
        setAlertText(text);
        setAlertType(type);
        setShowAlert(true);
        await sleep(3000);
        setShowAlert(false);
    }
    const handleUpdate = (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        const newItem = {
            title,
            description,
            content: content ? content : [],
            uses: uses ? uses : [],
            disabled,
            key,
            comfort: comfort ? comfort : 0
        }

        updateKnowledge(newItem, (res) => {
            setIsLoading(false);
            history.push('/library');
        }, (err) => {
            throwAlert('Failed to update record!', 'error');
        })
    }
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }
    const handleDisabledChange = (event) => {
        setDisabled(event.target.checked);
    }
    const handleComfortChange = (event, newValue) => {
        setComfort(newValue);
    }
    const handleUseChange = (event) => {
        setCurrentUse(event.target.value);
    }
    const handleLessonLabel = (event) => {
        const stubContent = [...content];
        let lessonObj = stubContent.find((lesson) => lesson.label === event.target.id);
        lessonObj.label = event.target.value;

        setContent(stubContent);
    }
    const handleLessonBlurb = (event) => {
        const stubContent = [...content];
        let lessonObj = stubContent.find((lesson) => lesson.label === event.target.id);
        lessonObj.blurb = event.target.value;

        setContent(stubContent);
    }
    const handleAddLessonClick = () => {
        const stubContent = content ? [...content] : [];
        stubContent.push({
            label: '',
            blurb: ''
        })
        setContent(stubContent);
    }
    const handleDeleteLessonClick = (event, clickedLabel) => {
        const stubContent = [...content];
        const removeIndex = stubContent.indexOf(stubContent.find((lesson) => lesson.label === clickedLabel));
        if (removeIndex > -1) {
            stubContent.splice(removeIndex, 1);
        }
        setContent(stubContent);
    }
    const handleAddUseClick = () => {
        const stubUses = uses ? [...uses] : [];
        stubUses.push({
            label: currentUse
        });
        setUses(stubUses);
        setCurrentUse('');
    }
    const handleUseDelete = (event, useLabel) => {
        const stubUses = uses ? [...uses] : [];
        const removeIndex = stubUses.indexOf(stubUses.find((use) => use.label === useLabel));
        if (removeIndex > -1) {
            stubUses.splice(removeIndex, 1);
        }
        setUses(stubUses);
    }

    useEffect(() => {
        setTitle(props.location.item?.title);
        setDescription(props.location.item?.description);
        setContent(props.location.item?.content);
        setDisabled(Boolean(props.location.item?.disabled));
        setKey(props.location.item?.key);
        setComfort(props.location.item?.comfort);
        setUses(props.location.item?.uses);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center'
        }}>
            <div style={{display: 'block'}}>
                <Card sx={{ minWidth: 400, width: 1000, p: 3, marginBottom: 5}}>
                    <form style={{display: 'block'}} onSubmit={handleUpdate}>
                        <h2 style={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}>Update Knowledge</h2>
                        <Divider sx={{ m: 3 }} />                        
                        
                        <div style={{display: 'flex', marginBottom: 15}}>
                            <FormControlLabel control={<Checkbox checked={disabled} onChange={handleDisabledChange} sx={{marginLeft: 2}} />} label="Disabled?" />
                            <Typography sx={{ marginLeft: 10, marginTop: 1.5 }}>Comfort Level:</Typography>
                            <Slider defaultValue={0} value={comfort} marks={marks} sx={{ width: 250, marginLeft: 5 }} onChange={handleComfortChange} />
                        </div>

                        <div style={{display: 'flex'}}>
                            <Grid container spacing={2}>
                                <Grid item xs={4} sx={{display: 'flex', alignItems: 'center'}}>
                                    <Typography sx={{ m: 2, mt: 0.5, width: '20%' }}>Related Uses:</Typography>
                                    <TextField
                                        id="outlined-uses"
                                        label="Add skill use"
                                        value={currentUse}
                                        type="text"
                                        onChange={handleUseChange}
                                        sx={{
                                            display: 'flex',
                                            width: '70%'
                                        }}
                                    />
                                    <IconButton sx={{mr: 2}} aria-label="add" color="success" variant="contained" onClick={handleAddUseClick}>
                                        <AddBoxIcon fontSize="medium" />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={8} sx={{display: 'flex', flexWrap: 'wrap'}}>
                                {
                                    uses && uses.length 
                                    ? uses.map((use) => { return (
                                        <Box m={0.5} mt={1.5} data-id={use.label} id={use.label} sx={{flexWrap: 'wrap', maxWidth: '50%'}}>
                                            <CustomBadge key={use.label} data-id={use.label} id={use.label}>
                                                {use.label}
                                                <IconButton data-id={use.label} size="small" sx={{p: 0}} key={use.label} id={use.label} onClick={(event) => handleUseDelete(event, use.label)}>
                                                    <CloseIcon data-id={use.label} value={use.label} key={use.label} id={use.label} fontSize="small" />
                                                </IconButton>
                                            </CustomBadge>
                                        </Box>
                                    )})
                                    : <></>
                                }
                                </Grid>
                            </Grid>
                        </div>
                        
                        <TextField
                            id="outlined-title"
                            label="Title"
                            value={title}
                            type="text"
                            onChange={handleTitleChange}
                            fullWidth
                            sx={{
                                display: 'flex',
                                marginTop: 2
                            }}
                        />
                        <TextField
                            id="outlined-description"
                            label="Description"
                            value={description}
                            type="text"
                            onChange={handleDescriptionChange}
                            fullWidth
                            multiline
                            minRows='4'
                            sx={{
                                display: 'flex',
                                marginTop: 2,
                                minHeight: '50px'
                            }}
                        />

                        <Grid container spacing={2} sx={{marginTop: 0.25}}>
                        {
                            content && content.length 
                            ? content.map((lesson) => { return (
                                <Grid item xs={12} md={6}>
                                    <Grid container>
                                        <Grid item xs={10}>
                                            <TextField
                                                id={lesson.label}
                                                label="Lesson Title"
                                                value={lesson.label}
                                                type="text"
                                                onChange={handleLessonLabel}
                                                fullWidth
                                                sx={{
                                                    display: 'flex',
                                                    marginTop: 2
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={2} 
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center'
                                        }}>
                                            <IconButton key={lesson.label} id={lesson.label} sx={{marginTop:2}} onClick={(event) => handleDeleteLessonClick(event, lesson.label)}>
                                                <DeleteIcon color="error" />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                    <TextField
                                        id={lesson.label}
                                        label="Lesson Content"
                                        value={lesson.blurb}
                                        type="text"
                                        onChange={handleLessonBlurb}
                                        fullWidth
                                        multiline
                                        minRows='4'
                                        sx={{
                                            display: 'flex',
                                            marginTop: 2,
                                            minHeight: '50px'
                                        }}
                                    />
                                </Grid>)
                            })
                            : <></>
                        }
                            <Grid item xs={12} md={6}>
                                <LoadingButton
                                    loading={isLoading}
                                    loadingPosition="start"
                                    startIcon={<AddIcon />}
                                    variant="outlined"
                                    onClick={handleAddLessonClick}
                                    sx={{
                                        width: 1,
                                        marginTop: 2
                                    }}>
                                    Add Lesson
                                </LoadingButton> 
                            </Grid>
                        </Grid>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <LoadingButton
                                loading={isLoading}
                                loadingPosition="start"
                                startIcon={<EditIcon />}
                                variant="contained"
                                sx={{
                                    width: 1,
                                    display: 'flex',
                                    marginTop: 2
                                }}
                                type='submit'>
                                Update
                            </LoadingButton> 
                        </div>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <Button 
                                color="error"
                                fullWidth
                                variant="outlined"
                                sx={{
                                    width: 1,
                                    marginTop: 2
                                }}
                                onClick={() => history.push('/library')}
                            >
                                Cancel</Button>
                        </div>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                        { showAlert 
                            ? <Alert severity={alertType} sx={{
                                    width: 1,
                                    marginTop: 2
                                }}>{alertText}</Alert>
                            : <></>
                        }
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    )
}