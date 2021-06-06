import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { register } from '../redux/actions/authAction';

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
        <div className="flex items-center justify-center w-full min-h-screen bg-gray-50">
            <form onSubmit={handleSubmit} className="max-w-sm px-4 bg-white border">
                <img src="jgramLogo.png" alt="" className="w-full max-w-xs m-auto" />
                
                <div className="form-group">
                    <label htmlFor="fullname">Full Name</label>
                    <input type="text" className="form-control" id="fullname" name="fullname"
                        onChange={handleChangeInput} value={fullname} 
                        style={{ background: `${alertReducer.fullname ? `#fd2d6a14` : ''}` }}
                    />
                    <small className='form-text text-danger'>
                        {alertReducer.fullname ? alertReducer.fullname : ''}
                    </small>
                </div>
                
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" name="username"
                        onChange={handleChangeInput} value={username.toLowerCase().replace(/ /g, '')} 
                        style={{ background: `${alertReducer.username ? `#fd2d6a14` : ''}` }}
                    />
                    <small className='form-text text-danger'>
                        {alertReducer.username ? alertReducer.username : ''}
                    </small>
                </div>
                
                <div className="form-group">
                    <label htmlFor="emailLogin">Email address</label>
                    <input type="email" className="form-control" id="emailLogin" name="email"
                        aria-describedby="emailHelp" onChange={handleChangeInput} value={email} 
                        style={{ background: `${alertReducer.email ? `#fd2d6a14` : ''}` }}
                    />
                    <small className='form-text text-danger'>
                        {alertReducer.email ? alertReducer.email : ''}
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="passwordLogin">Password</label>

                    <div className="relative">
                        <input type={ typePass ? "text" : "password" }
                            className="form-control" id="passwordLogin"
                            onChange={handleChangeInput} value={password} name="password"
                            style={{ background: `${alertReducer.password ? `#fd2d6a14` : ''}` }}
                        />

                        <small onClick={() => setTypePass(!typePass)} className="absolute cursor-pointer top-1/4 right-1.5 opacity-50 hover:opacity-100 duration-100">
                            {typePass ? 'Hide' : 'Show'}
                        </small>
                    </div>
                   
                    <small className='form-text text-danger'>
                        {alertReducer.password ? alertReducer.password : ''}
                    </small>
                </div>
                
                <div className="form-group">
                    <label htmlFor="cf_password">Password Confirmation</label>

                    <div className="relative">
                        <input type={ typeCfPass ? "text" : "password" }
                            className="form-control" id="cf_password"
                            onChange={handleChangeInput} value={cf_password} name="cf_password" 
                            style={{ background: `${alertReducer.cf_password ? `#fd2d6a14` : ''}` }}    
                        />

                        <small onClick={() => setTypeCfPass(!typeCfPass)} className="absolute cursor-pointer top-1/4 right-1.5 opacity-50 hover:opacity-100 duration-100">
                            {typeCfPass ? 'Hide' : 'Show'}
                        </small>
                    </div>

                    <small className='form-text text-danger'>
                        {alertReducer.cf_password ? alertReducer.cf_password : ''}
                    </small>
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
                    Already have an account? <Link to="/login" className='block text-lg font-semibold text-red-500 duration-300 hover:no-underline'>Login Now</Link>
                </p>
            </form>
        </div>
    )
}

export default Register
