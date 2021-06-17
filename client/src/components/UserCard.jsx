import React from 'react'
import { Link } from 'react-router-dom';
import Avatar from './Avatar';


const UserCard = ({children, user, border, handleClose, setShowFollowers, setShowFollowing}) => {
    const handleCloseAll = () => {
        if (handleClose) handleClose();
        if (setShowFollowers) setShowFollowers(false);
        if (setShowFollowing) setShowFollowing(false);
    }

    return (
        <div className={`flex items-center p-2 justify-between ${border} w-full`}>
            <div className="">
                <Link to={`/profile/${user._id}`} onClick={handleCloseAll} 
                    className="flex items-center p-2 hover:no-underline"
                >
                    <Avatar src={user.avatar} size={1} />

                    <div className="ml-2">
                        <span className="block">{user.username}</span>
                        <span className="opacity-70">{user.fullname}</span>
                    </div>
                </Link>
            </div>

            { children }
        </div>
    )
}

export default UserCard
