import React from 'react'
import UserCard from '../components/UserCard'
import FollowBtn from '../components/FollowBtn'
import { useDispatch, useSelector } from 'react-redux'
import ReplayIcon from '@material-ui/icons/Replay';
import Loading from '../components/alert/Loading'
import { getSuggestions } from '../redux/actions/suggestionAction'



const Discover = () => {
    const { authReducer, suggestionsReducer } = useSelector(state => state);
    const dispatch = useDispatch();

    return (
        <div className="mt-3">
            <UserCard user={authReducer.user} />

            <div className="flex items-center justify-between my-2">
                <h5 className="font-semibold">Suggestions</h5>
                {
                    !suggestionsReducer.loading &&
                    <ReplayIcon className="cursor-pointer" 
                        onClick={() => dispatch(getSuggestions(authReducer.token))}
                    />
                }
            </div>

            {
                suggestionsReducer.loading 
                ? <Loading />
                : <div className="suggestions">
                    {
                        suggestionsReducer.users.map(user => (
                            <UserCard key={user._id} user={user}>
                                <FollowBtn user={user} />
                            </UserCard>
                        ))
                    }
                </div>
            }

            <div className="my-2 text-center opacity-50">
                <a href="https://jettprofile.vercel.app/" target="_blank" rel="noreferrer"
                    className="text-blue-500 hover:underline"
                >
                    https://jettprofile.vercel.app/
                </a>

                <small className="block">
                    Welcome to my big project  
                </small>
                
                <small>
                    &copy; 2021 jGram version 2.0 by <b>Nguyen Thanh Trung</b>
                </small>
            </div>
        </div>
    )
}

export default Discover
