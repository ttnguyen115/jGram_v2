import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { checkImage } from '../../api/imageUpload';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { updateProfileUser } from '../../redux/actions/profileAction';

const EditProfile = ({setOnEdit}) => {
    const { authReducer, themeReducer } = useSelector(state => state);
    const dispatch = useDispatch();
    const initialState = {
        fullname: '', mobile: '', address: '', website: '', story: '', gender: ''
    }
    const [userData, setUserData] = useState(initialState);
    const { fullname, mobile, address, website, story, gender } = userData;
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        setUserData(authReducer.user);
    }, [authReducer.user]);

    const changeAvatar = (e) => {
        const file = e.target.files[0];
        const err = checkImage(file);
        
        if (err) return dispatch({ type: GLOBALTYPES.ALERT, payload: {error: err} });
        setAvatar(file);
    }
    
    const handleInput = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(updateProfileUser({userData, avatar, authReducer}));
    }

    return (
        <div className="fixed top-0 left-0 z-20 w-full h-screen overflow-auto bg-0008">
            <button className="absolute btn btn-danger top-10px right-10px"
                onClick={() => setOnEdit(false)}
            >
                Close
            </button>
            
            <form className="w-full p-5 mx-auto my-5 bg-white rounded-md max-w-450px" onSubmit={handleSubmit}>
                <div className="relative w-40 h-40 mx-auto my-3 overflow-hidden border rounded-full cursor-pointer">
                    <img src={avatar ? URL.createObjectURL(avatar) : authReducer.user.avatar} alt="avatar"
                        style={{ filter: themeReducer ? 'invert(1)' : 'invert(0)' }} 
                        className="block object-cover w-full h-full"    
                    />

                    <span className="absolute bottom-0 left-0 w-full text-center text-yellow-400 transition duration-300 ease-in-out h-2/4">
                        <CameraAltIcon />
                        <p>Change</p>
                        <input type="file" name="file" id="file_up" accept="image/*" onChange={changeAvatar}
                            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                        />
                    </span>
                </div>

                <div className="form_group">
                    <label htmlFor="fullname">Full Name</label>
                    <div className="">
                        <input type="text" className="form-control" id="fullname"
                            name="fullname" value={fullname} onChange={handleInput}
                        />
                    </div>
                </div>
                
                <div className="form_group">
                    <label htmlFor="mobile">Mobile</label>
                    <div className="">
                        <input type="text" className="form-control" id="mobile"
                            name="mobile" value={mobile} onChange={handleInput}
                        />
                    </div>
                </div>
                
                <div className="form_group">
                    <label htmlFor="address">Address</label>
                    <div className="">
                        <input type="text" className="form-control" id="address"
                            name="address" value={address} onChange={handleInput}
                        />
                    </div>
                </div>
                
                <div className="form_group">
                    <label htmlFor="website">Website</label>
                    <div className="">
                        <input type="text" className="form-control" id="website"
                            name="website" value={website} onChange={handleInput}
                        />
                    </div>
                </div>
                
                <div className="form_group">
                    <label htmlFor="story">Story</label>
                    <div className="">
                        <textarea className="form-control" id="story" cols="30" rows="4"
                            name="story" value={story} onChange={handleInput}
                        />
                    </div>
                </div>

                <label htmlFor="gender">Gender</label>
                <div className="px-0 mb-4 input-group-prepend">
                    <select value={gender} name="gender" id="gender" className="capitalize custom-select" onChange={handleInput} >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <button className="btn btn-info w-100" type="submit">Save</button>
            </form>
        </div>
    )
}

export default EditProfile
