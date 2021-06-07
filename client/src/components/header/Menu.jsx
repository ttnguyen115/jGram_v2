// Material UI
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// React
import React from 'react'
import { Link, useLocation } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/authAction';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import Avatar from '../Avatar';

const Menu = () => {
    const { authReducer, themeReducer } = useSelector(state => state);
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    
    const isActive = (pn) => {
        if (pathname === pn) {
            return true;
        }
    }
    
    const navLinks = [
        { 
            label: 'Home', 
            icon: <HomeOutlinedIcon id="Home" color={isActive('/') && 'primary'} />, 
            path: '/' 
        },
        
        { 
            label: 'Message',
            icon: <QuestionAnswerOutlinedIcon id="Message" color={isActive('/message') && 'primary'} />, 
            path: '/message' 
        },
        
        { 
            label: 'Notify', 
            icon: <FavoriteBorderOutlinedIcon id="Notify" color={isActive('/notify') && 'primary'} />, 
            path: '/notify' 
        },
    ]
    
    return (
        <div className="fixed bottom-0 left-0 z-10 w-full shadow">
            <ul className="flex flex-row items-center justify-around navbar-nav">
                {
                    navLinks.map((link, index) => (
                        <li className={`px-2 nav-item ${isActive(link.path) ? 'opacity-100' : 'opacity-50'}`} key={index} >
                            <Link className='nav-link' to={link.path}>
                                {link.icon}
                            </Link>
                        </li>
                    ))
                }
                

                <li className="nav-item">
                    <Link className="nav-link" to={`/profile/${authReducer.user._id}`}>
                        <Avatar src={authReducer.user.avatar} />
                    </Link>
                    
                    <label htmlFor="theme" className="cursor-pointer"
                        onClick={() => dispatch({ type: GLOBALTYPES.THEME, payload: !themeReducer })}
                    >
                        { themeReducer ? <Brightness7Icon /> : <Brightness4Icon /> }
                    </label>
                        
                    <Link className="" to="/" onClick={() => dispatch(logout())} >
                        <ExitToAppIcon />
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Menu
