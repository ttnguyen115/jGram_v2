import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const Toast = ({ status, msg, handleOpen, handleShow }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(handleOpen);

    const handleClose = () => {
        handleShow();
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <Snackbar 
                open={open} 
                autoHideDuration={2000} 
                onClose={handleClose} 
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert onClose={handleClose} severity={status}>
                    {msg}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Toast
