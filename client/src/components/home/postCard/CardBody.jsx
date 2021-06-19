import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Carousel from '../../Carousel';

const CardBody = ({post, id}) => {
    const { themeReducer } = useSelector(state => state);
    const [readMore, setReadMore] = useState(false);
    
    return (
        <div className="">
            <div className="px-3 mb-1"
                style={{
                    filter: themeReducer ? 'invert(1)' : 'invert(0)',
                    color: themeReducer ? 'white' : '#111'
                }}
            >
                <span>
                    {
                        post.content.length < 60 
                        ? post.content 
                        : readMore 
                            ? post.content + ' ' 
                            : post.content.slice(0, 60) + '.....'
                    }
                </span>
                {
                    post.content.length > 60 &&
                    <span className="font-bold text-blue-700 cursor-pointer" onClick={() => setReadMore(!readMore)}>
                        {readMore ? 'Hide' : 'Read more'}
                    </span>
                }   
            </div>

            {
                post.images.length > 0 && <Carousel images={post.images} id={post._id} />
            }
        </div>
    )
}

export default CardBody
