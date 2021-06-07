import React from 'react'
import { Link } from 'react-router-dom';
import Avatar from './Avatar';


const UserCard = ({user, border, handleClose}) => {
    const handleCloseAll = () => {
        if (handleClose) handleClose();
    }

    return (
        <div className={`flex items-center p-2 ${border}`}>
            <div className="">
                <Link to={`/profile/${user._id}`} onClick={handleCloseAll} 
                    className="flex items-center p-2"
                >
                    <Avatar src={user.avatar} />

                    <div className="ml-2">
                        <span className="block">{user.username}</span>
                        <span className="opacity-70">{user.fullname}</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default UserCard
