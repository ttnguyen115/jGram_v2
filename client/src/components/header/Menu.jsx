// Material UI
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
// React
import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import Avatar from '../Avatar';
// Redux
import { useSelector } from 'react-redux';
import Setting from './Setting';

const Menu = () => {
    const { authReducer } = useSelector(state => state);
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
        }
    ]
    
    return (
        <div className="fixed bottom-0 left-0 z-10 w-full bg-gray-300 shadow">
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

                <Setting className="cursor-pointer" />

                <li className="nav-item">
                    <Link className="nav-link" to={`/profile/${authReducer.user._id}`}>
                        <Avatar src={authReducer.user.avatar} size={1} />
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Menu
