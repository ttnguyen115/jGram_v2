import React from 'react'
import Avatar from './Avatar';


const UserCard = ({user, border}) => {
    return (
        <div className={`flex items-center p-2 ${border}`}>
            <Avatar src={user.avatar} />

            <div className="ml-2">
                <span className="block">{user.username}</span>
                <span className="opacity-70">{user.fullname}</span>
            </div>
        </div>
    )
}

export default UserCard
