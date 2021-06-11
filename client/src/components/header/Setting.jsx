import SettingsIcon from '@material-ui/icons/Settings';
import React from 'react'
import Popover from '@material-ui/core/Popover';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { logout } from '../../redux/actions/authAction';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    items: {
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
    },
}))

const Setting = () => {
    const classes = useStyles();
    const { themeReducer } = useSelector(state => state);
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    
    return (
        <div>
            <SettingsIcon fontSize="large" onClick={handleClick} />

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
                        onClick={() => dispatch({ type: GLOBALTYPES.THEME, payload: !themeReducer })}
                    >
                        { themeReducer ? <span><Brightness7Icon />Light mode</span> : <span><Brightness4Icon />Dark mode</span> }
                    </label>
                            
                    <Link className="" to="/" onClick={() => dispatch(logout())} >
                        <span><ExitToAppIcon />Log Out</span>
                    </Link>
                </div>
            </Popover>
        </div>
    )
}

export default Setting
