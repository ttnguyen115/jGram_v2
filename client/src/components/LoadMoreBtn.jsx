import React from 'react'
import Button from '@material-ui/core/Button';

const LoadMoreBtn = ({page, result, handleLoadMore, load}) => {
    return (
        <div>
            {
                result < 9 * (page - 1) ? '' : 
                !load && 
                <Button variant="contained" color="primary"
                    onClick={handleLoadMore}
                    className="block mx-auto"
                >
                    Load more
                </Button>   
            }
        </div>
    )
}

export default LoadMoreBtn
