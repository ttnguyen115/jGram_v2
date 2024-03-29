import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getDataAPI } from '../../api/fetchData';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { getConversations, MESS_TYPES } from '../../redux/actions/messageAction';
import UserCard from '../UserCard';

const LeftSide = ({user}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { authReducer, messageReducer, onlineReducer } = useSelector(state => state);
    const [search, setSearch] = useState('');
    const [searchUsers, setSearchUsers] = useState([]);
    const pageEnd = useRef();
    const [page, setPage] = useState(0);
    

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
        dispatch({ type: MESS_TYPES.ADD_USER, payload: { ...user, text: '', media: [] } });
        dispatch({ type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: onlineReducer });
        return history.push(`/message/${user._id}`);
    }

    const isActive = (user) => {
        if (id === user._id) return 'active';
        return '';
    }

    useEffect(() => {
        if (messageReducer.firstLoad) return;
        dispatch(getConversations({ authReducer }));
    }, [authReducer, messageReducer.firstLoad, dispatch]);

    // Load more btn
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
           if (entries[0].isIntersecting) {
            setPage(p => p + 1);
           } 
        }, {
            threshold: 0.1
        });

        observer.observe(pageEnd.current);
    }, [setPage]);

    useEffect(() => {
        if (messageReducer.resultUsers >= (page - 1) * 9 && page > 1) {
            dispatch(getConversations({ authReducer, page }))
        }
    }, [dispatch, authReducer, messageReducer.resultUsers, page]);

    // Check User Online - Offline
    useEffect(() => {
        if (messageReducer.firstLoad) {
            dispatch({ type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: onlineReducer })
        }
    }, [onlineReducer, messageReducer.firstLoad, dispatch])

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
                                        {
                                            user.online
                                            ? <FiberManualRecordIcon fontSize="small" style={{color: 'green', fontSize: '12px'}} />
                                            : authReducer.user.following.find(item => 
                                                item._id === user._id
                                            ) && <FiberManualRecordIcon fontSize="small"  style={{fontSize: '12px'}} />
                                        }
                                    </UserCard>
                                </div>
                            ))
                        }
                    </>
                }

                <button ref={pageEnd} className="opacity-0">Load More</button>
            </div>
        </>
    )
}

export default LeftSide
