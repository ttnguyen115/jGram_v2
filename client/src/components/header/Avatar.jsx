import React from 'react'
import { useSelector } from 'react-redux'

const Avatar = ({ src }) => {
    const { themeReducer } = useSelector(state => state);
    
    return (
        <img 
            src={src}
            alt="avatar" 
            className="object-cover rounded-full h-7 w-7"
            style={{filter: `${themeReducer ? 'invert(1)' : 'invert(0)'} `}}
        />
    )
}

export default Avatar
