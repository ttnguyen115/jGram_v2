import React from 'react'
import LeftSide from '../../components/message/LeftSide'
import RightSide from '../../components/message/RightSide'

const Conversation = () => {
    return (
        <div className="flex w-full mt-4 border rounded-md bg-gray-50" 
            style={{height: 'calc(100vh - 200px)'}}>
            <div className="px-0 col-md-4 border-right">
                <LeftSide />
            </div>
            
            <div className="px-0 col-md-8">
                <RightSide />
            </div>
        </div>
    )
}

export default Conversation
