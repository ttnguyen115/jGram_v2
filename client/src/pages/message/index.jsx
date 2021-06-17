import React from 'react'
import LeftSide from '../../components/message/LeftSide'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

const Message = () => {
    return (
        <div className="flex w-full mt-4 border rounded-md bg-gray-50" 
            style={{height: 'calc(100vh - 200px)'}}>
            <div className="px-0 col-md-4 border-right">
                <LeftSide />
            </div>
            
            <div className="px-0 col-md-8">
                <div className="flex flex-col items-center justify-center h-full">
                    <ChatBubbleOutlineIcon fontSize="large" />
                    <h2 className="text-3xl">Message</h2>
                </div>
            </div>
        </div>
    )
}

export default Message
