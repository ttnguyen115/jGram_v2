import React from 'react'
import Avatar from '../Avatar'

const MsgDisplay = ({user}) => {
    return (
        <>
            <div className="flex mb-1">
                <Avatar src={user.avatar} size={1} />
                <span>{user.username}</span>
            </div>

            <div className="px-3 py-2 mb-1 chat_text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, ab. Quae eos unde ducimus optio excepturi iusto esse explicabo eius eaque pariatur eveniet, nihil voluptatum inventore sint, vel veniam voluptatem?
            </div>

            <div className="text-gray-500 text-md">
                April 2021
            </div>
        </>
    )
}

export default MsgDisplay
