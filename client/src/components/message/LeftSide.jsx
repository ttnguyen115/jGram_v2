import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getDataAPI } from '../../api/fetchData';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { addUser, getConversations } from '../../redux/actions/messageAction';
import UserCard from '../UserCard';

const LeftSide = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { authReducer, messageReducer } = useSelector(state => state);
    const [search, setSearch] = useState('');
    const [searchUsers, setSearchUsers] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!search) return setSearchUsers([]);

        try {
            const res = await getDataAPI(`search?username=${search}`, authReducer.token);
            setSearchUsers(res.data.users);
        } catch (err) {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
        }
    }

    const handleAddUser = (user) => {
        setSearch('');
        setSearchUsers([]);
        dispatch(addUser({ user, messageReducer }));
        return history.push(`/message/${user._id}`);
    }

    const isActive = (user) => {
        if (id === user._id) return 'active'
    }

    useEffect(() => {
        if (messageReducer.firstLoad) return;
        dispatch(getConversations({ authReducer }));
    }, [authReducer, messageReducer.firstLoad, dispatch])

    return (
        <>
            <form className="flex items-center justify-between w-full bg-gray-100 border-b h-60px"
                onSubmit={handleSearch}
            >
                <input type="text" value={search} placeholder="Search user message..."
                    onChange={e => setSearch(e.target.value)}
                    className="h-full px-1 bg-gray-100 border-none outline-none flex-01"
                />

                <button type="submit" className="hidden">Search</button>
            </form>

            <div className="w-full overflow-y-auto" style={{height: 'calc(100% - 60px)'}}>
                {
                    searchUsers.length !== 0
                    ? <>
                        {
                            searchUsers.map(user => (
                                <div key={user._id}
                                    className={`flex items-center justify-between px-4 py-2 text-gray-500 no-underline border cursor-pointer ${isActive(user)}`} 
                                    onClick={() => handleAddUser(user)}
                                >
                                    <UserCard user={user} />
                                </div>
                            ))
                        }
                    </>
                    
                    : <>
                        {
                            messageReducer.users.map(user => (
                                <div key={user._id}
                                    className={`flex items-center justify-between px-2 py-1 text-gray-500 no-underline border cursor-pointer ${isActive(user)}`} 
                                    onClick={() => handleAddUser(user)}
                                >
                                    <UserCard user={user} msg={true}>
                                        <FiberManualRecordIcon 
                                            fontSize="small" 
                                            style={{color: 'green', fontSize: '10px'}} 
                                        />
                                    </UserCard>
                                </div>
                            ))
                        }
                    </>
                }
            </div>
        </>
    )
}

export default LeftSide
