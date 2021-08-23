
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from  '@material-ui/core'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetTickets } from './store/ticket';

export default function ResetTickets(){
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = () => {
        setIsOpen(true);
    }

    const handleClose = () => {
        setIsOpen(false);
    }

    const handleClear = () => {
        dispatch(resetTickets());
    }

    return (
        <>
            <Button onClick={handleOpen}>
            Reset
            </Button>
            <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Reset</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Resetting means all tickets will be removed from memory.
                        Do you want to proceed?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleClear} color="primary" variant='contained'>
                    Reset
                </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}