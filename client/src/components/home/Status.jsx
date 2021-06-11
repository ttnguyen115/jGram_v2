import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../Avatar';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';

const Status = () => {
    const { authReducer } = useSelector(state => state);
    const dispatch = useDispatch();

    return (
        <div className="flex items-center p-4 my-3 bg-white rounded shadow-sm">
            <Avatar src={authReducer.user.avatar} size={1} />
            
            <button 
                className="flex-grow px-2 py-3 mx-3 text-left text-gray-600 bg-gray-100 border-none rounded-full outline-none hover:bg-gray-300"
                onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: true })}
            >
                {authReducer.user.username}, what are your thinking?
            </button>
        </div>
    )
}

export default Status
