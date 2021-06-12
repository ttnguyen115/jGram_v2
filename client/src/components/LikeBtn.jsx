import React from 'react'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useSelector } from 'react-redux';

const LikeBtn = ({isLike, handleLike, handleUnlike}) => {
    const { themeReducer } = useSelector(state => state);

    return (
        <>
            {
                isLike
                ? <FavoriteIcon className="m-2" color="error" onClick={handleUnlike}
                    style={{filter: themeReducer ? 'invert(1)' : 'invert(0)'}}
                />
                : <FavoriteBorderIcon className="m-2" onClick={handleLike} />
            }
        </>
    )
}

export default LikeBtn
