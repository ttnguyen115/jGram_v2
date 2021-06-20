import React from 'react';
import { useSelector } from 'react-redux';
import Loading from '../components/alert/Loading';
import Posts from '../components/home/Posts';
import Status from '../components/home/Status';

const Home = () => {
    const { postReducer } = useSelector(state => state);

    return (
        <div className="grid mx-0 home row">
            <div className="col-12">
                <Status />

                {
                    postReducer.Loading
                    ? <Loading />
                    : (postReducer.result === 0 || postReducer.posts.length === 0)
                        ? <h2 className="font-bold text-center">No Post</h2> 
                        : <Posts />
                }
            </div>
        </div>
    )
}

export default Home
