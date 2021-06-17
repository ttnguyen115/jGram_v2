import DeleteIcon from '@material-ui/icons/Delete';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import UserCard from '../UserCard';
import MsgDisplay from './MsgDispay';
import NearMeIcon from '@material-ui/icons/NearMe';

const RightSide = () => {
    const { authReducer, messageReducer } = useSelector(state => state);
    const dispatch = useDispatch();
    const { id } = useParams();
    const [user, setUser] = useState([]);
    const [text, setText] = useState('');

    useEffect(() => {
        const newUser = messageReducer.users.find(user => user._id === id);
        if (newUser) {
            setUser(newUser)
        }
    }, [messageReducer.users, id]);
    
    return (
        <>
            <div className="flex items-center justify-between w-full bg-gray-100 border-b h-60px">
                <UserCard user={user} >
                    <DeleteIcon color="primary" />
                </UserCard>
            </div>

            <div className="w-full px-2 overflow-y-auto" 
                style={{height: 'calc(100% - 110px)'}}>
                <div className="flex flex-col justify-end w-full min-h-full">
                    <div className="grid justify-start mt-2 justify-items-start other_message" style={{gridTemplateColumns: '70%'}} >
                        <MsgDisplay user={user} />
                    </div>
                    
                    <div className="grid justify-end mt-2 justify-items-end your_message" style={{gridTemplateColumns: '70%'}} >
                        <MsgDisplay user={authReducer.user} />
                    </div>
                </div>
            </div>

            <form className="flex items-center justify-between px-4 border-t">
                <input type="text" placeholder="Start your conversation..." onChange={e => setText(e.target.value)} 
                    className="w-full border-none outline-none h-49px"
                />

                <button disabled={text ? false : true} type="submit"
                    className="bg-white border-none outline-none"
                >
                    <NearMeIcon color={`${text && "primary"}`} />
                </button>
            </form>
        </>
    )
}

export default RightSide
