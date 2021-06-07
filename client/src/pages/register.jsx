import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { register } from '../redux/actions/authAction';

import TextField from '@material-ui/core/TextField';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, FormHelperText } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Register = () => {
    const { authReducer, alertReducer } = useSelector(state => state);
    const history = useHistory();
    const dispatch = useDispatch();
    const [typePass, setTypePass] = useState(false);
    const [typeCfPass, setTypeCfPass] = useState(false);
    
    const initialState = { fullname: '', username: '', cf_password: '', gender: 'male', email: '', password: '' };
    const [userData, setUserData] = useState(initialState);
    const { email, password, fullname, username, cf_password } = userData;

    useEffect(() => {
        if (authReducer.token) {
            history.push("/");
        }
    }, [authReducer.token, history]);

    const handleChangeInput = e => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault();

        dispatch(register(userData));
    }

    return (
        <div className="flex items-center justify-center w-full h-screen min-h-screen bg-gray-50">
            <form onSubmit={handleSubmit} className="max-w-sm px-4 bg-white border">
                <img src="jgramLogo.png" alt="" className="w-full max-w-xs m-auto" />
                
                <div className="form-group">
                    <TextField
                        name="fullname"
                        id="fullname"
                        label="Full Name"
                        variant="outlined"
                        onChange={handleChangeInput} 
                        value={fullname}
                        className="w-full"
                        error={alertReducer.fullname ? true : false}
                        helperText={alertReducer.fullname ? alertReducer.fullname : ''}
                    />
                </div>
                
                <div className="form-group">
                    <TextField
                        name="username"
                        id="username"
                        label="User Name"
                        variant="outlined"
                        onChange={handleChangeInput} 
                        value={username}
                        className="w-full"
                        error={alertReducer.username ? true : false}
                        helperText={alertReducer.username ? alertReducer.username : ''}
                    />
                </div>
                
                <div className="form-group">
                    <TextField
                        name="email"
                        id="email"
                        label="Email"
                        variant="outlined"
                        onChange={handleChangeInput} 
                        value={email}
                        className="w-full"
                        error={alertReducer.email ? true : false}
                        helperText={alertReducer.email ? alertReducer.email : ''}
                    />
                </div>

                <div className="form-group">
                    <FormControl className="w-full" variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password"
                            error={alertReducer.password ? true : false}
                        >Password</InputLabel>
                        <OutlinedInput
                            name="password"
                            label="Password"
                            id="password"
                            type={typePass ? 'text' : 'password'}
                            value={password}
                            onChange={handleChangeInput} 
                            endAdornment={
                            <InputAdornment position="end" >
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        edge="end"
                                        onClick={() => setTypePass(!typePass)}
                                    >
                                        {typePass ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={70} 
                            error={alertReducer.password ? true : false}
                        />
                        <FormHelperText id="component-error-text" error>{alertReducer.password ? alertReducer.password : ''}</FormHelperText>
                    </FormControl>
                </div>
                
                <div className="form-group">
                    <FormControl className="w-full" variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password"
                            error={alertReducer.cf_password ? true : false}
                        >Confirm Password</InputLabel>
                        <OutlinedInput
                            name="cf_password"
                            id="cf_password"
                            type={typeCfPass ? 'text' : 'password'}
                            value={cf_password}
                            onChange={handleChangeInput} 
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        edge="end"
                                        onClick={() => setTypeCfPass(!typeCfPass)}
                                    >
                                        {typeCfPass ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={135} 
                            error={alertReducer.cf_password ? true : false}
                        />
                        <FormHelperText id="component-error-text" error>{alertReducer.cf_password ? alertReducer.cf_password : ''}</FormHelperText>
                    </FormControl>
                </div>

                <div className="justify-between mx-0 mb-1 row">
                    <label htmlFor="male">
                        Male: <input type="radio" id="male" name="gender" value="male" defaultChecked onChange={handleChangeInput} />
                    </label>
                    
                    <label htmlFor="female">
                        Female: <input type="radio" id="female" name="gender" value="female" onChange={handleChangeInput} />
                    </label>
                    
                    <label htmlFor="other">
                        Other: <input type="radio" id="other" name="gender" value="other" onChange={handleChangeInput} />
                    </label>
                </div>
                
                <button type="submit" className={`btn w-100 ${email && password ? `btn-primary` : `btn-dark`}`} >
                    Register
                </button>

                <p className="my-5 text-center ">
                    Already have an account? <Link to="/" className='block text-lg font-semibold text-red-500 duration-300 hover:no-underline'>Login Now</Link>
                </p>
            </form>
        </div>
    )
}

export default Register
