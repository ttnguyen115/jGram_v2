import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDataAPI } from '../api/fetchData';
import Loading from '../components/alert/Loading';
import LoadMoreBtn from '../components/LoadMoreBtn';
import PostThumb from '../components/PostThumb';
import { DISCOVER_TYPES, getDiscoverPosts } from '../redux/actions/discoverAction';


const Discover = () => {
    const dispatch = useDispatch();
    const { authReducer, discoverReducer } = useSelector(state => state);
    const [load, setLoad] = useState(false)
    
    useEffect(() => {
        if (!discoverReducer.firstLoad) {
            dispatch(getDiscoverPosts(authReducer.token));
        }

    }, [dispatch, authReducer.token, discoverReducer.firstLoad]);

    const handleLoadMore = async () => {
        setLoad(true);
        const res = await getDataAPI(`post_discover?num=${discoverReducer.page * 9}`, authReducer.token);
        dispatch({ type: DISCOVER_TYPES.UPDATE_POST, payload: res.data });
        setLoad(false);
    }

    return (
        <div>
            {
                discoverReducer.loading
                ? <Loading />
                : <PostThumb posts={discoverReducer.posts} result={discoverReducer.result} />
            }

            {
                load && <Loading />
            }

            {
                !discoverReducer.loading &&
                <LoadMoreBtn result={discoverReducer.result} page={discoverReducer.page}
                    load={load} handleLoadMore={handleLoadMore}
                />
            }
        </div>
    )
}

export default Discover
