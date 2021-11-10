import { makeStyles } from '@material-ui/core/styles';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useDatabase } from '../../contexts/DatabaseContext';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import DeleteModal from '../DeleteModal';
import CustomBadge from '../CustomBadge';
import { Link } from 'react-router-dom';
import { 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Typography,
  Stack,
  Divider,
  Box,
  Grid,
  Button,
  Switch,
  IconButton,
  Slider
} from '@mui/material';

const ContentButton = styled(Button)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(0.5)
}));

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightRegular,
    fontFamily: 'Tahoma'
  },
  contentPanel: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    height: '100%',
    borderRadius: '5px',
    border: 'solid', 
    borderWidth: '1px',
    borderColor: '#8AC4F3',
    color: '#000',
    fontWeight: theme.typography.fontWeightRegular,
    borderWeight: '0.5',
    padding: '25px',
    whiteSpace: 'pre-line'
  },
  accordion: {
    width: '95%',
    float: 'right'
  },
  parent: {
    display: 'flex'
  },
  switch: {
    width: '5%',
    float: 'left'
  },
  alertCheck: {
    marginLeft: 10
  }
}));

const marks = [
  { value: 0, label: 1 },
  { value: 25, label: 2 },
  { value: 50, label: 3 }, 
  { value: 75, label: 4 }, 
  { value: 100, label: 5 }
]

const LibrarySection = (props) => {
    const classes = useStyles();
    const { title, description, content, disabled, key, comfort, uses } = props.data;
    const { 
      updateKnowledge
    } = useDatabase();

    const [contentPanel, setContentPanel] = useState('Select a lesson');
    const [checked, setChecked] = useState(!disabled);
    const [showAlert, setShowAlert] = useState(false);
    const [showError, setShowError] = useState(false);

    const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));   
    const throwAlert = async (type='success') => {
        type === 'success' ? setShowAlert(true) : setShowError(true);
        await sleep(3000);
        setShowAlert(false);
        setShowError(false)
    }
    const handleContentClick = event => {
      let item = content.find(element => 
        element.label.toLowerCase() === event?.target?.innerText?.toLowerCase()
      );

      setContentPanel(item?.blurb);
    }
    const handleSwitchClick = () => {
      const newItem = {
        title,
        description,
        content: content ? content : [],
        uses: uses ? uses : [],
        disabled: !disabled,
        key,
        comfort: comfort ? comfort : 0
      }
      updateKnowledge(newItem, (res) => {
        setChecked(!checked);
        throwAlert();
      }, (err) => {
        throwAlert('error');
      })
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const { currentUser } = useAuth();

    return (
      <>
        <div className={currentUser ? classes.parent : ''}>
          {/* switch column */}
          {
            currentUser 
            ? <div className={classes.switch}>
                <Switch 
                  checked={checked} 
                  onChange={handleSwitchClick} 
                  sx={{marginTop: 1}}
                />
              </div>
            : <></>
          }
          <div className={currentUser ? classes.accordion : ''}>
            <Accordion disabled={!checked} sx={{marginBottom: '2px'}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">
                    <Typography className={classes.heading}><h4 className={classes.heading}>{title}</h4></Typography>
                    {showAlert && <CheckIcon className={classes.alertCheck} color="success" />}
                    {showError && <ErrorOutlineIcon className={classes.alertCheck} color="error" />}
                </AccordionSummary>
                <AccordionDetails>

                  <Divider />
                  <Box sx={{ display: 'block' }}>
                    <Box sx={{ display: 'flex', marginTop: 2 }}>
                      <Grid container spacing={0}>

                        <Grid item xs={3} mt={1} sx={{display: 'flex'}}>
                          <Typography sx={{ marginRight: 5, marginTop: 2, color: '#888' }}>Comfort:</Typography>
                          <Slider defaultValue={0} value={comfort} marks={marks} sx={{ width: 250 }} />
                        </Grid>

                        <Grid item xs={8} sx={{display: 'flex'}}>
                          <Typography sx={{ marginLeft: 10, marginRight: 1, marginTop: 3, color: '#888' }}>Related Usage:</Typography>
                          <Box m={0.5} mt={1.5} sx={{display: 'flex', flexWrap: 'wrap', maxWidth: '70%'}}>
                          {
                            uses && uses.length 
                            ? uses.map(use => { return (
                              <Box m={0.5} mt={1.5}>
                                <CustomBadge key={'related_badge_' + use.label}>{use.label}</CustomBadge>
                              </Box>
                            )})
                            : <></>
                          }
                          </Box>
                        </Grid>

                        <Grid item xs={1} sx={{display: 'flex', alignItems: 'center'}}>
                        {
                          currentUser && 
                          <div style={{ marginLeft: 'auto', marginTop: 10, display: 'flex' }}>
                            <Link to={{
                              pathname: '/knowledgeItem/:knowledgeItemId',
                              knowledgeItemId: key,
                              item: props.data
                            }}>
                              <IconButton color="primary" aria-label="Edit Knowledge Item">
                                <EditIcon />
                              </IconButton>
                            </Link>
                            <DeleteModal sectionKey={key} />
                          </div>
                        }
                        </Grid>

                      </Grid>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                      <Typography sx={{ marginTop: 3, marginBottom: 3}}>{description}</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                      
                      {
                        content?.length 
                        ? <Grid item xs={4} md={4}>
                            <Stack spacing={1}>
                              {content.map(item => 
                                <ContentButton 
                                  variant="outlined" 
                                  key={'content_button_' + item.label} 
                                  onClick={handleContentClick}>
                                    {item.label}
                                </ContentButton>
                              )}
                            </Stack>
                          </Grid>
                        : <></>
                      }

                      <Grid item xs={content?.length ? 8 : 12} md={content?.length ? 8 : 12}>

                        <Box className={classes.contentPanel}>
                          <Typography>{contentPanel}</Typography>
                        </Box>

                      </Grid>
                    </Grid>
                  </Box>

                </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </>
    );
}

export default LibrarySection;