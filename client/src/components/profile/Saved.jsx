import React, { useEffect, useState } from 'react';
import PostThumb from '../PostThumb';
import LoadMoreBtn from '../LoadMoreBtn';
import Loading from '../alert/Loading'
import { getDataAPI } from '../../api/fetchData'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'

const Saved = ({authReducer, dispatch}) => {
    const [savePosts, setSavePosts] = useState([]);
    const [result, setResult] = useState(9);
    const [page, setPage] = useState(2);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        setLoad(true);
        getDataAPI(`getSavePosts`, authReducer.token)
        .then(res => {
            setSavePosts(res.data.savePosts);
            setResult(res.data.result);
            setLoad(false);
        })
        .catch(err => {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
        })

        return () => setSavePosts([]);
    }, [authReducer.token, dispatch])

    const handleLoadMore = async () => {
        setLoad(true);
        const res = await getDataAPI(`getSavePosts?limit=${page * 9}`, authReducer.token);
        setSavePosts(res.data.savePosts);
        setResult(res.data.result);
        setPage(page + 1);
        setLoad(false);
    }

    return (
        <div>
            <PostThumb posts={savePosts} result={result} />

            {
                load && <Loading />
            }

            <LoadMoreBtn result={result} page={page}
                load={load} handleLoadMore={handleLoadMore}
            />
        </div>
    )
}

export default Saved
