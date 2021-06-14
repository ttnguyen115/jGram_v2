// Material UI
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
// React
import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import Avatar from '../Avatar';
// Redux
import { useSelector } from 'react-redux';

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
            icon: <HomeOutlinedIcon id="Home" fontSize="large" color={isActive('/') && 'primary'} />, 
            path: '/' 
        },
        
        { 
            label: 'Message',
            icon: <QuestionAnswerOutlinedIcon id="Message" fontSize="large" color={isActive('/message') && 'primary'} />, 
            path: '/message' 
        },
        
        { 
            label: 'Notify', 
            icon: <FavoriteBorderOutlinedIcon id="Notify" fontSize="large" color={isActive('/notify') && 'primary'} />, 
            path: '/notify' 
        },
        
        { 
            label: 'Discover', 
            icon: <ExploreOutlinedIcon id="Discover" fontSize="large" color={isActive('/discover') && 'primary'} />, 
            path: '/discover' 
        }
    ]
    
    return (
        <div className="fixed bottom-0 left-0 z-10 w-full bg-gray-200 border shadow h-70px">
            <ul className="flex flex-row items-center justify-around h-full navbar-nav">
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
                        <Avatar src={authReducer.user.avatar} size={3} />
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Menu
