import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { follow, unfollow } from '../redux/actions/profileAction';
import Button from '@material-ui/core/Button';

const FollowBtn = ({user}) => {
    const [followed, setFollowed] = useState(false);
    const dispatch = useDispatch();
    const { authReducer, profileReducer, socketReducer } = useSelector(state => state);

    useEffect(() => {
        if (authReducer.user.following.find(item => item._id === user._id)) {
            setFollowed(true);
        }

        return () => setFollowed(false);
    }, [authReducer.user.following, user._id]);

    const handleFollow = async () => {
        setFollowed(true);
        await dispatch(follow({ users: profileReducer.users, user, authReducer, socketReducer }));
    }
    
    const handleUnfollow = async () => {
        setFollowed(false);
        await dispatch(unfollow({ users: profileReducer.users, user, authReducer, socketReducer }));
    }

    return (
        <>
        {
            followed
            ? <Button variant="contained" color="secondary"
                onClick={handleUnfollow}
            >
                Unfollow
            </Button>
            
            : <Button variant="contained" color="primary"
                onClick={handleFollow}
            >
                Follow
            </Button>
        }
        </>
    )
}

export default FollowBtn
