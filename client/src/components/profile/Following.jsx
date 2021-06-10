import React from 'react'
import { useSelector } from 'react-redux';
import FollowBtn from '../FollowBtn';
import UserCard from '../UserCard';

const Following = ({users, setShowFollowing}) => {
    const { authReducer } = useSelector(state => state);

    return (
        <div className="fixed top-0 left-0 z-10 flex items-center justify-center w-full h-screen bg-0008">
            <div className="absolute px-3 py-3 overflow-auto bg-white border rounded w-350px h-400px">
                <div className="flex items-start justify-center w-full">
                    <h5 className="text-2xl text-center">Following</h5>
                </div>
                
                <hr />

                {
                    users.map(user => (
                        <UserCard key={user._id} user={user} setShowFollowing={setShowFollowing}>
                            {
                                authReducer.user._id !== user._id && <FollowBtn user={user} />
                            }
                        </UserCard>
                    ))
                }

                <div className="absolute top-0 text-2xl font-bold text-red-700 cursor-pointer right-5px" 
                    onClick={() => setShowFollowing(false)}
                >
                    &times;
                </div>
            </div>
        </div>
    )
}

export default Following
