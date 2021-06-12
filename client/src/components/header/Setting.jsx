import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../redux/actions/authAction';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';


const useStyles = makeStyles(theme => ({
    items: {
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
    },
}))

const Setting = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { themeReducer } = useSelector(state => state);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logout())
        handleClose();
    }

    const handleModeChange = () => {
        dispatch({ type: GLOBALTYPES.THEME, payload: !themeReducer })
        handleClose();
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    
    return (
        <div>
            <Button aria-describedby={id} onClick={handleClick}>
                <SettingsIcon fontSize="large" />
            </Button>
            
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <div className={classes.items}>
                    <label htmlFor="theme" className="cursor-pointer"
                        onClick={handleModeChange}
                    >
                        { themeReducer ? <span><Brightness7Icon />Light mode</span> : <span><Brightness4Icon />Dark mode</span> }
                    </label>
                            
                    <Link className="" to="/" onClick={handleLogout} >
                        <span><ExitToAppIcon />Log Out</span>
                    </Link>
                </div>
            </Popover>
        </div>
    )
}

export default Setting
