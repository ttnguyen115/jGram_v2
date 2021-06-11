import React from 'react'
import { useState } from 'react'
import Carousel from '../../Carousel'

const CardBody = ({post, id}) => {
    const [readMore, setReadMore] = useState(false);
    
    return (
        <div className="">
            {
                post.images.length > 0 && <Carousel images={post.images} id={post._id} />
            }

            <div className="px-3 mb-1">
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
        </div>
    )
}

export default CardBody
