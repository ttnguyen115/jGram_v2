// Material UI
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
// React
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/authAction';
import { GLOBALTYPES } from '../redux/actions/globalTypes';
import Avatar from './Avatar';

const Header = () => {
    const { authReducer, themeReducer } = useSelector(state => state);
    const dispatch = useDispatch();
    const { pathname } = useLocation();

    const isActive = (pn, id) => {
        if (pathname === pn) {
            return true;
        }
    }
    
    const navLinks = [
        { 
            label: 'Home', 
            icon: <HomeOutlinedIcon id="Home" color={isActive('/', 'Home') ? 'primary' : ''} />, 
            path: '/' 
        },
        
        { 
            label: 'Message',
            icon: <QuestionAnswerOutlinedIcon id="Message" color={isActive('/message', 'Message') ? 'primary' : ''} />, 
            path: '/message' 
        },
        
        { 
            label: 'Discover', 
            icon: <ExploreOutlinedIcon id="Discover" color={isActive('/discover', 'Discover') ? 'primary' : ''} />, 
            path: '/discover' 
        },
        
        { 
            label: 'Notify', 
            icon: <FavoriteBorderOutlinedIcon id="Notify" color={isActive('/notify', 'Notify') ? 'primary' : ''} />, 
            path: '/notify' 
        },
    ]
    
    return (
        <div>
            <nav className="flex items-center justify-between navbar navbar-expand-lg">
                <Link to="/">
                    <h1 className="p-0 font-bold uppercase navbar-brand hover:text-black focus:text-black">jGram</h1>
                </Link>

                <div className="menu">
                    <ul className="flex-row navbar-nav">
                        {
                            navLinks.map((link, index) => (
                                <li className='px-2 nav-item' key={index} >
                                    <Link className="nav-link" to={link.path} >
                                        {link.icon}
                                    </Link>
                                </li>
                            ))
                        }
                        

                        <li className="nav-item dropdown">
                            <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                            >
                                <Avatar src={authReducer.user.avatar} />
                            </span>
                            
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to={`/profile/${authReducer.user._id}`}>Profile</Link>   
                                 
                                <label htmlFor="theme" className="dropdown-item"
                                    onClick={() => dispatch({ type: GLOBALTYPES.THEME, payload: !themeReducer })}
                                >
                                    { themeReducer ? 'Light mode' : 'Dark mode'}
                                </label>
                                
                                <div className="dropdown-divider"></div>
                                <Link className="dropdown-item" to="/" onClick={() => dispatch(logout())} >Logout</Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Header
