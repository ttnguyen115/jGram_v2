import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router'
import { getProfileUsers } from '../../redux/actions/profileAction';
import Avatar from '../Avatar';

const Info = () => {
    const { id } = useParams();
    const { authReducer, profileReducer } = useSelector(state => state);
    const dispatch = useDispatch();

    const [userData, setUserData] = useState([]);

    useEffect(() => {
        if (id === authReducer.user._id) {
            setUserData([authReducer.user]);
        } else {
            dispatch(getProfileUsers({users: profileReducer.users, id, authReducer}));
            const newData = profileReducer.users.filter(user => user._id === id);
            setUserData(newData);
        }
    }, [id, authReducer.user, dispatch, authReducer, profileReducer.users]);

    return (
        <div className="w-full px-3 py-5 m-auto max-w-800px">
            {
                userData.map(user => (
                    <div className="flex flex-wrap justify-around" key={user._id}>
                        <Avatar src={user.avatar} border="border" size={2} />
                        
                        <div className="flex-1 w-full mx-4 min-w-250px max-w-400px opacity-70">
                            <div className="flex flex-wrap items-center">
                                <h2 className="text-3xl font-semibold flex-3">{user.username}</h2>
                                <button className="flex-2 btn btn-outline-info">Edit Profile</button>
                            </div>

                            <div className="font-medium text-black">
                                <span className="mr-4 cursor-pointer hover:underline">{user.followers.length} followers</span>
                                <span className="ml-4 cursor-pointer hover:underline">{user.following.length} following</span>
                            </div>

                            <h6>{user.fullname} {user.mobile}</h6>
                            <p className="m-0">{user.address}</p>
                            <h6>{user.email}</h6>
                            <a href={user.website} target="_blank" rel="noreferrer">
                                {user.website}
                            </a>
                            <p>{user.story}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Info
