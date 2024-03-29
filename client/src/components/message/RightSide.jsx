import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteIcon from '@material-ui/icons/Delete';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import NearMeIcon from '@material-ui/icons/NearMe';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { imageUpload } from '../../api/imageUpload';
import { imageShow } from '../../api/mediaShow';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { addMessage, deleteConservation, getMessages, loadMoreMessages } from '../../redux/actions/messageAction';
// import Icons from '../Icons';
import UserCard from '../UserCard';
import MsgDisplay from './MsgDispay';

const RightSide = () => {
    const { authReducer, messageReducer, socketReducer } = useSelector(state => state);
    const dispatch = useDispatch();
    const { id } = useParams();
    const refDisplay = useRef();
    const pageEnd = useRef();
    const history = useHistory();
    
    const [user, setUser] = useState([]);
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [loadImage, setLoadImage] = useState(false);
    const [data, setData] = useState([]);
    const [result, setResult] = useState(9);
    const [page, setPage] = useState(0);
    const [isLoadMore, setIsLoadMore] = useState(false);
    
    useEffect(() => {
        const newData = messageReducer.data.find(item => item._id === id);
        if (newData) {
            setData(newData.messages);
            setResult(newData.result);
            setPage(newData.page);
        }
        
    }, [messageReducer.data, id]);

    useEffect(() => {
        if (id && messageReducer.users.length > 0) {
            setTimeout(() => {
                refDisplay.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }, 50);
            
            const newUser = messageReducer.users.find(user => user._id === id);
            if (newUser) setUser(newUser);
        }
    }, [messageReducer.users, id]);

    const handleChangeMedia = e => {
        const files = [...e.target.files];
        let err = '';
        let newImages = [];

        files.forEach(file => {
            if (!file) return err = 'File does not exist!';

            if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                return err = 'Image format is incorrect!';
            }

            return newImages.push(file);
        });

        if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
        setImages([...images, ...newImages]);
    }
    
    const handleDeleteMedia = (index) => {
        const newArr = [...images];
        newArr.splice(index, 1);
        setImages(newArr);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!content.trim() && images.length === 0) return;

        setContent('');
        setImages([]);
        
        setLoadImage(true);
        let newArr = [];
        if (images.length > 0) newArr = await imageUpload(images);

        const msg = {
            sender: authReducer.user._id,
            recipient: id,
            content,
            media: newArr,
            createdAt: new Date().toISOString()
        }
        setLoadImage(false);
        await dispatch(addMessage({ msg, authReducer, socketReducer }));

        if (refDisplay.current) {
            refDisplay.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }

    useEffect(() => {
        const getMessagesData = async () => {
            if(messageReducer.data.every(item => item._id !== id)){
                await dispatch(getMessages({ authReducer, id }));

                setTimeout(() => {
                    refDisplay.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
                }, 50);
            }
        }

        getMessagesData();
    }, [dispatch, authReducer, id, messageReducer.data])

    // Load more btn
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
               setIsLoadMore(p => p + 1);
            } 
        }, {
            threshold: 0.1
        });

        observer.observe(pageEnd.current);
    }, [setIsLoadMore]);

    useEffect(() => {
        if (isLoadMore > 1) {
            if (result >= page * 9) {
                dispatch(loadMoreMessages({ authReducer, id, page: page + 1 }));
                setIsLoadMore(1);
            }
        }
        // eslint-disable-next-line
    }, [isLoadMore]);

    const handleDeleteConservation = () => {
        if (window.confirm('Do you want to delete this conversation?')) {
            dispatch(deleteConservation({ authReducer, id }));
            return history.push('/message');
        }
    }

    return (
        <>
            <div className="flex items-center justify-between w-full bg-gray-100 border-b cursor-pointer h-60px">
                {
                    user.length !== 0 && 
                    <UserCard user={user} >
                        <DeleteIcon color="primary" onClick={handleDeleteConservation} />
                    </UserCard>
                }
            </div>

            <div className="w-full px-2 overflow-y-auto" 
                style={{height: images.length > 0 ? 'calc(100% - 180px)' : 'calc(100% - 110px)'}}>
                <div className="flex flex-col justify-end w-full min-h-full" ref={refDisplay}>
                    <button className="-mt-4 opacity-0" ref={pageEnd}>Load more</button>
                    
                    {
                        data.map((msg, index) => (
                            <div className="" key={index}>
                                {
                                    msg.sender !== authReducer.user._id && 
                                    <div className="grid justify-start mt-2 justify-items-start other_message" style={{gridTemplateColumns: '70%'}} >
                                        <MsgDisplay user={user} msg={msg} />
                                    </div>
                                }

                                {
                                    msg.sender === authReducer.user._id && 
                                    <div className="grid justify-end mt-2 justify-items-end your_message" style={{gridTemplateColumns: '70%'}} >
                                        <MsgDisplay user={authReducer.user} msg={msg} data={data} />
                                    </div>
                                }
                            </div>
                        ))
                    }

                    {
                        loadImage &&
                        <div className="grid justify-end mt-2 justify-items-end your_message">
                            <CircularProgress />
                        </div>
                    }
                </div>
            </div>

            <div style={{display: images.length > 0 ? 'grid' : 'none'}}
                className="grid w-full gap-2 px-1 overflow-hidden bg-gray-100 rounded-sm h-70 grid-cols-message place-items-center"
            >
                {
                    images.map((image, index) => (
                        <div className="relative w-full h-full max-w-70px max-h-70px" key={index}>
                            {
                                imageShow(URL.createObjectURL(image))
                            }

                            <span onClick={() => handleDeleteMedia(index)}
                                className="absolute top-0 right-0 z-10 px-1 font-bold text-red-500 bg-white border border-red-500 rounded-full cursor-pointer"
                            >&times;</span> 
                        </div>
                    ))
                }
            </div>

            <form className="flex items-center justify-between px-4 border-t"
                onSubmit={handleSubmit}
            >
                <input type="text" placeholder="Start your conversation..." onChange={e => setContent(e.target.value)}
                    value={content} 
                    className="w-full border-none outline-none h-49px"
                />

                {/* <Icons setContent={setContent} content={content} /> */}

                <div className="relative mx-3 overflow-hidden">
                    <ImageOutlinedIcon color="primary" />
                    <input type="file" name="file" multiple accept="image/*" onChange={handleChangeMedia} 
                        className="absolute top-0 left-0 opacity-0"
                    />
                </div>

                <button disabled={(content || images.length > 0) ? false : true} type="submit"
                    className="bg-white border-none outline-none"
                >
                    <NearMeIcon color={`${content && "primary"}`} />
                </button>
            </form>
        </>
    )
}

export default RightSide
