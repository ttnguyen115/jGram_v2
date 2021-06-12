import React from 'react'
import CommentCard from './CommentCard'

const CommentDisplay = ({comment, post, replyCm}) => {
    return (
        <div className="comment_display">
            <CommentCard comment={comment} post={post} commentId={comment._id} >
                <div className="pl-4">
                    {
                        replyCm.map((item, index) => (
                            item.reply &&
                            <CommentCard 
                                comment={item}
                                key={index}
                                post={post}
                                commentId={comment._id}
                            />
                        ))
                    }
                </div>
            </CommentCard>
        </div>
    )
}

export default CommentDisplay
