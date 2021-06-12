import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../../redux/actions/commentAction';

const InputComment = ({children, post, onReply, setOnReply}) => {
    const dispatch = useDispatch()
    const [content, setContent] = useState('');
    const { authReducer } = useSelector(state => state);

    const handleSubmit = e => {
        e.preventDefault();

        if (!content.trim()) {
            if (setOnReply) return setOnReply(false);
            return;
        }

        setContent('');
        
        const newComment = {
            content,
            likes: [],
            user: authReducer.user,
            createdAt: new Date().toISOString(),
            reply: onReply && onReply.commentId,
            tag: onReply && onReply.user
        }

        dispatch(createComment({ post, newComment, authReducer }));

        if (setOnReply) return setOnReply(false);
    }

    return (
        <form className="flex items-center card-footer" onSubmit={handleSubmit}>
            {children}
            <input type="text" placeholder="Add comment..." 
                value={content} onChange={e => setContent(e.target.value)}
                className="overflow-auto bg-gray-100 border-none outline-none flex-01"
            />

            <button type="submit" className="font-semibold text-blue-600 bg-gray-100 border-none outline-none">
                Post
            </button>
        </form>
    )
}

export default InputComment
