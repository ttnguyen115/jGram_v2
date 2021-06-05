import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions/authAction';

const Login = () => {
    const dispatch = useDispatch();
    const initialState = { email: '', password: '' };
    const [userData, setUserData] = useState(initialState);
    const { email, password } = userData;

    const [typePass, setTypePass] = useState(false);

    const handleChangeInput = e => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault();

        dispatch(login(userData));
    }

    return (
        <div className="flex items-center justify-center w-full min-h-screen bg-gray-50">
            <form onSubmit={handleSubmit} className="max-w-sm px-4 bg-white border">
                {/* <h3 className="mb-4 text-center uppercase">jGram</h3> */}
                <img src="jgramLogo.png" alt="" className="w-full max-w-xs m-auto" />
                
                <div className="form-group">
                    <label htmlFor="emailLogin">Email address</label>
                    <input type="email" className="form-control" id="emailLogin" name="email"
                    aria-describedby="emailHelp" onChange={handleChangeInput} value={email} />
                    <small id="emailHelp" className='form-text text-muted'>We'll never share your email with anyone else.</small>
                </div>

                <div className="form-group">
                    <label htmlFor="passwordLogin">Password</label>

                    <div className="relative">
                        <input type={ typePass ? "text" : "password" }
                            className="form-control" id="passwordLogin"
                            onChange={handleChangeInput} value={password} name="password" />

                        <small onClick={() => setTypePass(!typePass)} className="absolute cursor-pointer top-1/4 right-1.5 opacity-50 hover:opacity-100 duration-100">
                            {typePass ? 'Hide' : 'Show'}
                        </small>
                    </div>
                   
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
