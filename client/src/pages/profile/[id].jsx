import React from 'react'
import { useSelector } from 'react-redux'
import Loading from '../../components/alert/Loading'
import Info from '../../components/profile/Info'
import Posts from '../../components/profile/Posts'

const Profile = () => {
    const { profileReducer } = useSelector(state => state);

    return (
        <div className="profile">
            {
                profileReducer.loading
                ? <Loading />
                : <Info />
            }
            
            <Posts />
        </div>
    )
}

export default Profile
