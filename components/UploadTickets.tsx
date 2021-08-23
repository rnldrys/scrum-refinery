import Button, { ButtonProps } from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useState, useCallback, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import parseCSV from '../src/csvParser'
import Dropzone from 'react-dropzone';
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import { addTickets } from './store/ticket';

interface FormField {
    [name: string]: {
        label: string,
        value: any,
        iterate: boolean,
    }
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dropZone: {
            borderStyle: 'dashed',
            borderWidth: theme.spacing(0.25),
            borderColor: theme.palette.grey[400],
            backgroundColor: theme.palette.grey[100],
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: theme.spacing(20),
            marginBottom: theme.spacing(2),
            padding: theme.spacing(2)
        },
        dropZoneText: {
            textAlign: 'center'
        },
        contentHeader: {
            marginTop: theme.spacing(2),
            fontWeight: 'bold',
        },
        formField: {
            width: `calc(50% - ${theme.spacing(2)}px)`,
            margin: theme.spacing(1),
        },
        sample: {
            margin: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
        }
    })
)

const ticketFormData = {
    key: {
        label: "Ticket #",
        value: -1,
        iterate: true,
    },
    type: {
        label: "Type",
        value: -1,
        iterate: true,
    },
    summary: {
        label: "Summary or Title",
        value: -1,
        iterate: true,
    },
    points: {
        label: "Story Points or Work Estimate",
        value: -1,
        iterate: true,
    },
    epic: {
        label: "Epic",
        value: -1,
        iterate: true,
    },
    description: {
        label: "Description",
        value: -1,
        iterate: true,
    },
}

const initFormData = {
    hasHeaders: {
        label: "Has Headers",
        value: true,
        iterate: false,
    },
    ...ticketFormData
}

export default function UploadTickets({buttonProps}: {buttonProps?: ButtonProps}){
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false)
    const [fileName, setFileName] = useState<string|undefined>(undefined);
    const [headers, setHeaders] = useState<Array<string>>([]);
    const [rawData, setRawData] = useState<Array<string>>([])
    const [sample, setSample] = useState<Array<string>>([]);
    const [formData, setFormData] = useState<FormField>(initFormData)

    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles.forEach(async (file: File) => {
            setFileName(file.name);
            const data = await parseCSV(file);
            const rows = data.split('\n')
            const headerOptions = rows[0].split(',');
            setHeaders(headerOptions);
            setRawData(rows);
            setSample(rows[1].split(','));
            const newData = { ...formData }
            headerOptions.forEach((val,index) => {
                Object.keys(formData).forEach((key)=> {
                    if(val.toLocaleLowerCase().includes(key.toLocaleLowerCase())){
                        newData[key].value = index;
                    }
                })
            })
            setFormData(newData);
        })
    }, [])

    const handleFormChange = useCallback((key: string)=>{
        return ((event:ChangeEvent<HTMLInputElement|any>) => {
            const newData = {
                ...formData,
            }
            if(key === "hasHeaders"){
                newData[key].value = event.target.checked;
            } else {
                newData[key].value = event.target.value;
            }
            setFormData(newData);
        })
    }, [])

    const handleOpen = () => {
        setIsOpen(true);
        setFileName(undefined);
    }

    const handleClose = () => {
        setIsOpen(false);
        setFormData(initFormData);
        setSample([]);
    }

    const handleImport = () => {
        const rows = formData.hasHeaders.value? rawData.slice(1) : rawData;
        const tickets = rows.map((row) => {
            const details = row.split(',');
            return Object.keys(ticketFormData).reduce((ticket: {[name: string]: string|number},key)=>{
                if(key === 'points'){
                    ticket[key] = Number.parseInt(details[formData[key].value]);
                } else {
                    ticket[key] = details[formData[key].value];
                }
                return ticket;
            },{});
        });
        console.log(tickets);
        dispatch(addTickets({tickets}));
        handleClose();
    }

    return (
        <>
            <Button {...buttonProps} onClick={handleOpen}>
            Upload
            </Button>
            <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Upload tickets</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add tickets in bulk, put the tickets&apos; details in a csv file, then
                        upload it here by clicking on the button below or dragging and dropping it below.
                    </DialogContentText>
                    <Dropzone onDrop={onDrop}>
                        {({getRootProps, getInputProps}) => (
                            <Box {...getRootProps()} className={classes.dropZone}>
                            <TextField inputProps={{...getInputProps()}} />
                            {
                                fileName? 
                                <>
                                    <Typography className={classes.dropZoneText}>{fileName}</Typography>
                                    <Button variant='contained'>Replace File</Button>
                                </>:
                                <>
                                    <Typography className={classes.dropZoneText}>Drag &apos;n&apos; drop a csv file here or</Typography>
                                    <Button variant='contained'>Select File</Button>
                                </>
                            }
                            </Box>
                        )}
                    </Dropzone>
                    {
                        fileName?
                        <>
                        <Typography className={classes.contentHeader}>Property Mapping</Typography>
                        <DialogContentText>
                            Choose which column in your csv file corresponds to the following ticket information
                        </DialogContentText>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formData.hasHeaders.value}
                                        name="hasHeaders"
                                        onChange={handleFormChange("hasHeaders")}
                                    />
                                }
                                label="Has Headers"
                            />
                        </FormGroup>
                        {
                            Object.keys(ticketFormData).map((key) => {
                                return (
                                    <FormControl key={`fc-${key}-select`} className={classes.formField}>
                                        <InputLabel id={`${key}-select-label`}>{formData[key].label}</InputLabel>
                                        <Select
                                            labelId={`${key}-select-label`}
                                            id={key}
                                            value={formData[key].value}
                                            onChange={handleFormChange(key)}
                                        >
                                            <MenuItem value={-1}>
                                                None
                                            </MenuItem>
                                            {
                                                headers.map((header, index) => {
                                                    const displayText = formData.hasHeaders.value? header : `Column ${index+1}`;
                                                    const keySuffix = formData.hasHeaders.value? header: `column-${index}`;
                                                    return (
                                                        <MenuItem
                                                        value={index}
                                                        key={`ticket-num-option-${keySuffix}`}
                                                        selected={header.toLocaleLowerCase().includes('key')}>
                                                            {displayText}
                                                        </MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                )
                            })
                        }
                        <Typography className={classes.contentHeader}>Ticket Sample</Typography>
                        <DialogContentText>
                            {
                                Object.keys(ticketFormData).map((key) => {
                                    return (
                                    <Typography className={classes.sample} key={`sample-data-${key}`}><b>{formData[key].label}</b>{`: `}
                                    {
                                        formData[key].value >= 0 ? sample[formData[key].value] : 'Not included in file'
                                    }
                                    </Typography>
                                    )
                                })
                            }
                        </DialogContentText>
                        </>:<></>
                    }
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleImport} color="primary" variant='contained' disabled={formData.key.value < 0 || formData.summary.value < 0}>
                    Upload
                </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}