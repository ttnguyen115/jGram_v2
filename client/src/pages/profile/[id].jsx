import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Loading from '../../components/alert/Loading'
import Info from '../../components/profile/Info'
import Posts from '../../components/profile/Posts'
import { getProfileUsers } from '../../redux/actions/profileAction'

const Profile = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { profileReducer, authReducer } = useSelector(state => state);

    useEffect(() => {
        if (profileReducer.ids.every(item => item !== id)) {
            dispatch(getProfileUsers({id, authReducer}));
        }
        
    }, [dispatch, authReducer, id, profileReducer.ids]);

    return (
        <div className="profile">
            <Info authReducer={authReducer} profileReducer={profileReducer} dispatch={dispatch} id={id} />
            
            {
                profileReducer.loading
                ? <Loading />
                : <Posts authReducer={authReducer} profileReducer={profileReducer} dispatch={dispatch} id={id} />
            }
        </div>
    )
}

export default Profile
