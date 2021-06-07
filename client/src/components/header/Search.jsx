import { fade, InputBase, makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDataAPI } from '../../api/fetchData';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import UserCard from '../UserCard';

const useStyle = makeStyles((theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        width: '100%',
        [theme.breakpoints.up('sm')]: {
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
    const [load, setLoad] = useState(false);

    const handleClose = () => {
        setSearch('');
        setUsers([]);
    }

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!search) return;

        try {
            setLoad(true);
            const res = await getDataAPI(`search?username=${search}`, authReducer.token);
            setUsers(res.data.users);
            setLoad(false);
            
        } catch (err) {
            dispatch({ 
                type: GLOBALTYPES.ALERT, 
                payload: {
                    error: err.response.data.msg
                } 
            })
        }
    }

    return (
        <form className="relative block w-full m-auto" onSubmit={handleSearch}>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                
                <InputBase
                    placeholder="Enter to Search..."
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={e => setSearch(e.target.value.toLowerCase().replace(/ /g, ''))}
                    name="search" value={search}
                />
            </div>

            <div onClick={handleClose}
                className={`absolute top-0 font-bold text-red-700 cursor-pointer right-5px ${users.length === 0 ? 'opacity-0' : 'opacity-100'} text-2xl`}
            >&times;</div>

            <button type="submit"
                className="hidden"
            >
                Search
            </button>

            <div 
                className="absolute w-full overflow-auto bg-gray-50 min-w-250px mt-0.5"
                style={{ maxHeight: 'calc(100vh - 150px)' }}
            >
                {
                    search && users.map(user => (
                        <UserCard key={user._id} user={user} border="border" handleClose={handleClose} />
                    ))
                }
            </div>
        </form>
    )
}

export default Search
