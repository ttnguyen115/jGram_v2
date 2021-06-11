import React, { useRef } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { GLOBALTYPES } from '../redux/actions/globalTypes';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import Button from '@material-ui/core/Button';
import { createPost } from '../redux/actions/postAction';

const StatusModal = () => {
    const { authReducer, themeReducer } = useSelector(state => state);
    const dispatch = useDispatch();

    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [stream, setStream] = useState(false);
    const [tracks, setTracks] = useState('');
    
    const videoRef = useRef();
    const canvasRef = useRef();
    
    const handleChangeImages = (e) => {
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

    const deleteImages = (index) => {
        const newArr = [...images];
        newArr.splice(index, 1);
        setImages(newArr);
    }

    const handleStream = () => {
        setStream(true);

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
            .then(mediaStream => {
                videoRef.current.srcObject = mediaStream;
                videoRef.current.play();
                
                const track = mediaStream.getTracks();
                setTracks(track[0]);
            })
            .catch(err => console.log(err))
        }
    }

    const handleCapture = () => {
        const width = videoRef.current.clientWidth;
        const height = videoRef.current.clientHeight;

        canvasRef.current.setAttribute("width", width);
        canvasRef.current.setAttribute("height", height);
        
        const ctx = canvasRef.current.getContext('2d');
        ctx.drawImage(videoRef.current, 0, 0, width, height);
        
        let URL = canvasRef.current.toDataURL();
        setImages([...images, { camera: URL }])
    }
    
    const handleStopStream = () => {
        tracks.stop();
        setStream(false);
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (images.length === 0) return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: 'Please add your photos!' } });
    
        dispatch(createPost({ content, images, authReducer }));

        setContent('');
        setImages([]);
        if (tracks) tracks.stop();
        dispatch({ type: GLOBALTYPES.STATUS, payload: false });
    }

    return (
        <div className="fixed top-0 z-10 w-full h-screen overflow-auto lef-0 bg-0008">
            <form className="w-full p-4 mx-auto my-8 bg-white rounded max-w-450px" onSubmit={handleSubmit}>
                <div className="flex items-center justify-between pb-2.5 mb-2 border-b-2">
                    <h5 className="m-0 text-2xl font-semibold">Create Post</h5>
                    <span 
                        onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: false })}
                        className="text-2xl font-bold text-red-700 cursor-pointer"
                    >&times;</span>
                </div>

                <div className="status_body">
                    <textarea 
                        value={content}
                        name="content" 
                        onChange={e => setContent(e.target.value)}
                        placeholder={`${authReducer.user.username}, What are you thinking?`} 
                        className="w-full outline-none resize-none min-h-150px b-none"
                    />

                    <div className="grid w-full py-3 overflow-x-hidden overflow-y-auto max-h-270px place-items-center grid-cols-status gap-2.5">
                        {
                            images.map((img, index) => (
                                <div 
                                    key={index} 
                                    className="relative w-full h-full"
                                >
                                    <img 
                                        alt="images"
                                        src={img.camera ? img.camera : URL.createObjectURL(img)}  
                                        style={{ filter: themeReducer ? 'invert(1)' : 'invert(0)' }} 
                                        className="block object-contain w-full h-full img-thumbnail"
                                    />
                                    <span 
                                        className="absolute top-0 right-0 z-10 flex items-center justify-center w-5 h-5 text-2xl font-bold text-red-700 bg-white border border-red-700 rounded-full cursor-pointer"
                                        onClick={() => deleteImages(index)}
                                    >&times;</span>
                                </div> 
                            ))
                        }
                    </div>

                    {
                        stream && 
                        <div className="relative">
                            <video autoPlay muted ref={videoRef} width="100%" height="100%"
                                style={{ filter: themeReducer ? 'invert(1)' : 'invert(0)' }}
                            />

                            <span 
                                onClick={handleStopStream}
                                className="absolute top-0 text-3xl font-bold text-red-700 cursor-pointer right-5px"
                            >&times;</span>
                            <canvas ref={canvasRef} style={{ display: 'none' }} />
                        </div>
                    }

                    <div className="relative flex items-center justify-center my-2">
                        {
                            stream 
                            ? <CameraAltIcon fontSize="large" className="cursor-pointer" onClick={handleCapture} />
                            : <>
                                <CameraAltIcon fontSize="large" className="cursor-pointer" onClick={handleStream} />

                                <div className="relative mx-2 my-0 overflow-hidden">
                                    <ImageOutlinedIcon fontSize="large" className="cursor-pointer" />
                                    <input 
                                        type="file" 
                                        name="file" 
                                        multiple 
                                        accept="image/*" 
                                        className="absolute top-0 left-0 opacity-0"
                                        onChange={handleChangeImages}
                                    />
                                </div>
                            </>
                        }   
                    </div>
                </div>      
            
                <div className="">
                    <Button variant="contained" color="primary" className="w-full"
                        type="submit"
                    >
                        Post
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default StatusModal
