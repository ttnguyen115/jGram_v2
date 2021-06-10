import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { follow, unfollow } from '../redux/actions/profileAction';

const FollowBtn = ({user}) => {
    const [followed, setFollowed] = useState(false);
    const dispatch = useDispatch();
    const { authReducer, profileReducer } = useSelector(state => state);

    useEffect(() => {
        if (authReducer.user.following.find(item => item._id === user._id)) {
            setFollowed(true);
        }
    }, [authReducer.user.following, user._id]);

    const handleFollow = async () => {
        setFollowed(true);
        await dispatch(follow({ users: profileReducer.users, user, authReducer }));
    }
    
    const handleUnfollow = async () => {
        setFollowed(false);
        await dispatch(unfollow({ users: profileReducer.users, user, authReducer }));
    }

    return (
        <>
        {
            followed
            ? <button className="btn btn-outline-danger"
                onClick={handleUnfollow}
            >
                Unfollow
            </button>
            
            : <button className="btn btn-outline-info"
                onClick={handleFollow}
            >
                Follow
            </button>
        }
        </>
    )
}

export default FollowBtn
