import React from 'react'
import { useSelector } from 'react-redux'

const Avatar = ({ src, size }) => {
    const { themeReducer } = useSelector(state => state);

    const imgSize = [
        'h-5 w-5',
        'h-7 w-7',
        'h-36 w-36'
    ]
    
    return (
        <img 
            src={src}
            alt="avatar" 
            className={`object-cover rounded-full ${imgSize[size]}`}
            style={{filter: `${themeReducer ? 'invert(1)' : 'invert(0)'} `}}
        />
    )
}

export default Avatar
