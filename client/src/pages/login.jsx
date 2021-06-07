import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/authAction';

import TextField from '@material-ui/core/TextField';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, FormHelperText } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Login = () => {
    const { authReducer, alertReducer } = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();
    const initialState = { email: '', password: '' };
    const [userData, setUserData] = useState(initialState);
    const { email, password } = userData;

    const [typePass, setTypePass] = useState(false);
    
    useEffect(() => {
        if (authReducer.token) history.push('/');
    }, [authReducer.token, history]);

    const handleChangeInput = e => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault();

        dispatch(login(userData));
    }

    return (
        <div className="flex items-center justify-center w-full h-screen min-h-screen bg-gray-50">
            <form onSubmit={handleSubmit} className="max-w-sm px-4 bg-white border">
                <img src="jgramLogo.png" alt="" className="w-full max-w-xs m-auto" />
                
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
                
                <button type="submit" className={`btn w-100 ${email && password ? `btn-primary` : `btn-dark`}`}
                disabled={email && password ? false : true}>
                    Login
                </button>

                <p className="my-5 text-center ">
                    You don't have an account? <Link to="/register" className='block text-lg font-semibold text-red-500 duration-300 hover:no-underline'>Register Now</Link>
                </p>
            </form>
        </div>
    )
}

export default Login
