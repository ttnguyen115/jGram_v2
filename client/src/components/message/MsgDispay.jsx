import React from 'react'
import Avatar from '../Avatar'
import { imageShow } from '../../api/mediaShow'

const MsgDisplay = ({user, msg}) => {
    return (
        <>
            <div className="flex mb-1">
                <Avatar src={user.avatar} size={1} />
                <span>{user.username}</span>
            </div>

            { msg.content && <div className="px-3 py-2 mb-1 chat_text">{msg.content}</div> }

            {
                msg.media.map((image, index) => (
                    <div key={index}>
                        {imageShow(image.url)}
                    </div>
                ))
            }

            <div className="text-gray-500 text-md">
                {new Date(msg.createdAt).toLocaleString()}
            </div>
        </>
    )
}

export default MsgDisplay
