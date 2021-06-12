import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import CommentDisplay from '../home/comment/CommentDisplay'

const Comments = ({post}) => {
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState([]);

    const [next, setNext] = useState(2);

    useEffect(() => {
        const newCm = post.comments.filter(cm => !cm.reply);
        setComments(newCm);
        setShowComments(newCm.slice(newCm.length - next));
    }, [next, post.comments]);

    return (
        <div className="comments">
            {
                showComments.map(comment => (
                    <CommentDisplay key={comment._id} comment={comment} post={post} />
                ))
            }

            {
                comments.length - next > 0
                ? <div className="p-2 text-gray-500 cursor-pointer border-top"
                    onClick={() => setNext(next + 10)}
                >
                    See more comments...
                </div>
                
                : comments.length > 2 && 
                <div className="p-2 text-gray-500 cursor-pointer border-top"
                    onClick={() => setNext(2)}
                >
                    Hide comments...
                </div>
            }
        </div>
    )
}

export default Comments
