import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDataAPI } from '../../api/fetchData';
import { POST_TYPE } from '../../redux/actions/postAction';
import Loading from '../alert/Loading';
import LoadMoreBtn from '../LoadMoreBtn';
import PostCard from '../PostCard';

const Posts = () => {
    const dispatch = useDispatch()
    const { postReducer, authReducer } = useSelector(state => state);
    const [load, setLoad] = useState(false);

    const handleLoadMore = async () => {
        setLoad(true);
        const res = await getDataAPI(`posts?limit=${postReducer.page * 9}`, authReducer.token);
        dispatch({ 
            type: POST_TYPE.GET_POSTS, 
            payload: { ...res.data, page: postReducer.page + 1 }
        })
        setLoad(false);
    }

    return (
        <div>
            {
                postReducer.posts.map(post => (
                    <PostCard post={post} key={post._id} />
                ))
            }

            {
                load && <Loading />
            }

            <LoadMoreBtn result={postReducer.result} page={postReducer.page}
                load={load} handleLoadMore={handleLoadMore}
            />
        </div>
    )
}

export default Posts
