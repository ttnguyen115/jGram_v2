// Material UI
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
// React
import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import Avatar from '../Avatar';
import NotifyModal from '../NotifyModal';
// Redux
import { useSelector } from 'react-redux';

const MenuBar = () => {
    const { authReducer, notifyReducer } = useSelector(state => state);
    const { pathname } = useLocation();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    
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
                        <li className={`px-2 nav-item ${isActive(link.path) ? 'opacity-100' : 'opacity-50'}`} key={index}>
                            <Link className='nav-link' to={link.path}>
                                {link.icon}
                            </Link>
                        </li>
                    ))
                }
                
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}
                    className={`px-2 nav-item ${notifyReducer.data.length > 0 ? 'opacity-100' : 'opacity-50'}`}
                >
                    <Badge badgeContent={notifyReducer.data.length} color="error">
                        <FavoriteBorderIcon id="Notify" fontSize="large" />
                    </Badge>
                </Button>
                
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <NotifyModal />
                </Menu>
                

                <li className="nav-item">
                    <Link className="nav-link" to={`/profile/${authReducer.user._id}`}>
                        <Avatar src={authReducer.user.avatar} size={3} />
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default MenuBar
