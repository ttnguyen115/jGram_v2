import React from 'react'
import { useSelector } from 'react-redux'
import Posts from '../components/home/Posts'
import Status from '../components/home/Status'
import Loading from '../components/alert/Loading';

const Home = () => {
    const { postReducer } = useSelector(state => state);

    return (
        <div className="grid mx-0 home row">
            <div className="col-md-8">
                <Status />

                {
                    postReducer.Loading
                    ? <Loading />
                    : postReducer.result === 0 
                        ? <h2 className="font-bold text-center">No Post</h2> 
                        : <Posts />
                }
            </div>
            
            <div className="col-md-4">
                Right side
            </div>
        </div>
    )
}

export default Home
