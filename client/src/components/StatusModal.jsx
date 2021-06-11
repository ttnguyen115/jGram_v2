import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { GLOBALTYPES } from '../redux/actions/globalTypes';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import Button from '@material-ui/core/Button';

const StatusModal = () => {
    const { authReducer } = useSelector(state => state);
    const dispatch = useDispatch();

    const [content, setContent] = useState('');

    return (
        <div className="fixed top-0 z-10 w-full h-screen overflow-auto lef-0 bg-0008">
            <form className="w-full p-4 mx-auto my-8 bg-white rounded max-w-450px">
                <div className="flex items-center justify-between pb-2.5 mb-2 border-b-2">
                    <h5 className="m-0 text-2xl font-semibold">Create Post</h5>
                    <span 
                        onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: false })}
                        className="text-2xl font-bold text-red-700 cursor-pointer"
                    >&times;</span>
                </div>

                <div className="status_body">
                    <textarea 
                        value={content}
                        name="content" 
                        onChange={e => setContent(e.target.value)}
                        placeholder={`${authReducer.user.username}, What are you thinking?`} 
                        className="w-full outline-none resize-none min-h-150px b-none"
                    />

                    <div className="relative flex items-center justify-center my-2">
                        <CameraAltIcon fontSize="large" className="cursor-pointer" />

                        <div className="relative mx-2 my-0 overflow-hidden">
                            <ImageOutlinedIcon fontSize="large" className="cursor-pointer" />
                            <input 
                                type="file" 
                                name="file" 
                                multiple 
                                accept="image/*" 
                                className="absolute top-0 left-0 opacity-0"
                            />
                        </div>
                    </div>
                </div>      
            
                <div className="">
                    <Button variant="contained" color="primary" className="w-full">Post</Button>
                </div>
            </form>
        </div>
    )
}

export default StatusModal
