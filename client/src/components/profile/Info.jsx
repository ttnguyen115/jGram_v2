import Button from '@material-ui/core/Button';
import React, { useEffect, useState } from 'react';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import Avatar from '../Avatar';
import FollowBtn from '../FollowBtn';
import EditProfile from './EditProfile';
import Followers from './Followers';
import Following from './Following';
import Setting from '../header/Setting';

const Info = ({id, authReducer, profileReducer, dispatch}) => {
    const [userData, setUserData] = useState([]);
    const [onEdit, setOnEdit] = useState(false);
    const [showFollowers, setShowFollowers] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);

    useEffect(() => {
        if (id === authReducer.user._id) {
            setUserData([authReducer.user]);
        } else {
            const newData = profileReducer.users.filter(user => user._id === id);
            setUserData(newData);
        }
    }, [id, authReducer.user, dispatch, authReducer, profileReducer.users]);

    useEffect(() => {
        if (showFollowers || showFollowing || onEdit) {
            dispatch({ type: GLOBALTYPES.MODAL, payload: true })
        } else {
            dispatch({ type: GLOBALTYPES.MODAL, payload: false })
        }
    }, [showFollowers, showFollowing, onEdit, dispatch])
    
    return (
        <div className="w-full px-3 py-5 m-auto max-w-800px">
            {
                userData.map(user => (
                    <div className="flex flex-wrap justify-around" key={user._id}>
                        <Avatar src={user.avatar} border="border" size={2} />
                        
                        <div className="flex-1 w-full mx-4 min-w-250px max-w-500px opacity-70">
                            <div className="flex flex-wrap items-center">
                                <h2 className="text-3xl font-semibold flex-3">{user.username}</h2>
                                {
                                    user._id === authReducer.user._id
                                    ? <Button className="flex-2" variant="contained" color="primary" onClick={() => setOnEdit(true)} >Edit Profile</Button>
                                    : <FollowBtn user={user} />
                                }
                                
                                {
                                    user._id === authReducer.user._id && <Setting className="cursor-pointer" />
                                }
                            </div>

                            <div className="font-medium text-violet">
                                <span className="mr-4 cursor-pointer hover:underline"
                                    onClick={() => setShowFollowers(true)}
                                >
                                    {user.followers.length} followers
                                </span>
                                
                                <span className="ml-4 cursor-pointer hover:underline"
                                    onClick={() => setShowFollowing(true)}
                                >
                                    {user.following.length} following
                                </span>
                            </div>

                            <h6>{user.fullname} {user.mobile}</h6>
                            <p className="m-0">{user.address}</p>
                            <h6 className="m-0">{user.email}</h6>
                            <a href={user.website} target="_blank" rel="noreferrer">
                                {user.website}
                            </a>
                            <p>{user.story}</p>
                        </div>

                        {
                            onEdit && <EditProfile setOnEdit={setOnEdit} />
                        }

                        {
                            showFollowers &&
                            <Followers users={user.followers} setShowFollowers={setShowFollowers} />
                        }
                        
                        {
                            showFollowing &&
                            <Following users={user.following} setShowFollowing={setShowFollowing}  />
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default Info
