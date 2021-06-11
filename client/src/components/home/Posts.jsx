import React from 'react'
import { useSelector } from 'react-redux'
import CardHeader from './postCard/CardHeader';
import CardBody from './postCard/CardBody';
import CardFooter from './postCard/CardFooter';

const Posts = () => {
    const { postReducer } = useSelector(state => state);

    return (
        <div className="posts">
            {
                postReducer.posts.map(post => (
                    <div className="my-6 shadow" key={post._id}>
                        <CardHeader post={post} />
                        <CardBody post={post} />
                        <CardFooter post={post} />
                    </div>
                ))
            }
        </div>
    )
}

export default Posts
