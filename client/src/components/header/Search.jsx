import React, { useEffect, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { getDataAPI } from '../../api/fetchData';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { Link } from 'react-router-dom'
import UserCard from '../UserCard';
import { fade, InputBase, makeStyles } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
    },
      
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
      
    inputRoot: {
        color: 'inherit',
        border: '1px solid gray',
        width: '100%',
        borderRadius: '10px',
    },

    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
    },
}))

const Search = () => {
    const classes = useStyle();
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);
    const { authReducer } = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        if (search) {
            getDataAPI(`search?username=${search}`, authReducer.token)
            .then(res => setUsers(res.data.users))
            .catch(err => {
                dispatch({ 
                    type: GLOBALTYPES.ALERT, 
                    payload: {
                        error: err.response.data.msg
                    } 
                })
            })
        } else {
            setUsers([]);
        }
    }, [authReducer.token, search, dispatch]);

    const handleClose = () => {
        setSearch('');
        setUsers([]);
    }

    return (
        <form className="relative block w-full m-auto">
            {/* <input type="text" name="search" value={search} 
                onChange={e => setSearch(e.target.value.toLowerCase().replace(/ /g, ''))} 
                className="w-full border rounded outline-none bg-gray-50 min-w-250px"
            />

            <div className="absolute flex text-xs transform translate-x-24 -translate-y-5 pointer-events-none top-1/2 left-1/2"
                style={{ opacity: search ? 0 : 0.5 }}
            >
                <SearchIcon style={{ fontSize: 18 }} />
                <span>Search</span>
            </div> */}

            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={e => setSearch(e.target.value.toLowerCase().replace(/ /g, ''))}
                    name="search" value={search}
                />
            </div>

            <div 
                className={`absolute top-0 font-bold text-red-700 cursor-pointer right-5px ${users.length === 0 ? 'opacity-0' : 'opacity-100'} text-2xl`}
                onClick={handleClose}
            >&times;</div>

            <div 
                className="absolute w-full overflow-auto bg-gray-50 min-w-250px mt-0.5"
                style={{ maxHeight: 'calc(100vh - 150px)' }}
            >
                {
                    search && users.map(user => (
                        <Link key={user._id} to={`/profile/${user._id}`} 
                            onClick={handleClose}
                        >
                            <UserCard user={user} border="border" />
                        </Link>
                    ))
                }
            </div>
        </form>
    )
}

export default Search
