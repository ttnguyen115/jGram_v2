import React from 'react'
import CardHeader from './home/postCard/CardHeader'
import CardBody from './home/postCard/CardBody';
import CardFooter from './home/postCard/CardFooter';

import Comments from './home/Comments';
import InputComment from './home/InputComment';

const PostCard = ({post}) => {
    return (
        <div className="my-6 shadow">
            <CardHeader post={post} />
            <CardBody post={post} />
            <CardFooter post={post} />

            <Comments post={post} />
            <InputComment post={post} />
        </div>
    )
}

export default PostCard
