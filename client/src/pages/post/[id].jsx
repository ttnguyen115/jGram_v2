import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loading from '../../components/alert/Loading';
import PostCard from '../../components/PostCard';
import { getPost } from '../../redux/actions/postAction';

const Post = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { authReducer, detailPostReducer } = useSelector(state => state)
    const [post, setPost] = useState([]);

    useEffect(() => {
        dispatch(getPost({ detailPostReducer, id , authReducer}));
        
        if (detailPostReducer.length > 0) {
            const newArr = detailPostReducer.filter(post => post._id === id);
            setPost(newArr);
        }
    }, [authReducer, detailPostReducer, id, dispatch]);

    return (
        <div className="posts">
            {
                post.length === 0 &&
                <Loading />
            }

            {
                post.map(item => (
                    <PostCard key={item._id} post={item} />
                ))
            }
        </div>
    )
}

export default Post
