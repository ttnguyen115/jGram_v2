import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Loading from '../../components/alert/Loading'
import Info from '../../components/profile/Info'
import Posts from '../../components/profile/Posts'
import Saved from '../../components/profile/Saved'
import { getProfileUsers } from '../../redux/actions/profileAction'

const Profile = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { profileReducer, authReducer } = useSelector(state => state);
    const [saveTab, setSaveTab] = useState(false);

    useEffect(() => {
        if (profileReducer.ids.every(item => item !== id)) {
            dispatch(getProfileUsers({id, authReducer}));
        }
        
    }, [dispatch, authReducer, id, profileReducer.ids]);

    return (
        <div className="w-full min-h-screen">
            <Info authReducer={authReducer} profileReducer={profileReducer} dispatch={dispatch} id={id} />

            {
                authReducer.user._id === id &&
                <div className="flex justify-center w-full border-t border-b">
                    <button className={`${saveTab ? '' : 'active border-black opacity-100 border-t border-b'} outline-none border-none bg-white uppercase font-bold text-lg py-1 px-4 mx-4 opacity-50 border-gray-300`} onClick={() => setSaveTab(false)}>Posts</button>
                    <button className={`${saveTab ? 'active border-black opacity-100 border-t border-b' : ''} outline-none border-none bg-white uppercase font-bold text-lg py-1 px-4 mx-4 opacity-50 border-gray-300`} onClick={() => setSaveTab(true)}>Saved</button>
                </div>
            }
            
            {
                profileReducer.loading
                ? <Loading />
                : <>
                    {
                        saveTab 
                        ? <Saved authReducer={authReducer} dispatch={dispatch} />
                        : <Posts authReducer={authReducer} profileReducer={profileReducer} dispatch={dispatch} id={id} />
                    } 
                </>
            }
        </div>
    )
}

export default Profile
