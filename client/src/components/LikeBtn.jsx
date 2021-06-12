import React from 'react'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useSelector } from 'react-redux';

const LikeBtn = ({isLike, handleLike, handleUnlike, size}) => {
    const { themeReducer } = useSelector(state => state);

    return (
        <>
            {
                isLike
                ? <FavoriteIcon className="mx-2 my-1 ml-0" color="error" onClick={handleUnlike} fontSize={size}
                    style={{filter: themeReducer ? 'invert(1)' : 'invert(0)'}}
                />
                : <FavoriteBorderIcon className="m-2" onClick={handleLike} fontSize={size} />
            }
        </>
    )
}

export default LikeBtn
