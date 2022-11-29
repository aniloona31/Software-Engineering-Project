import React, { useContext, useState } from 'react'
import LoginContext from '../Context/login/LoginContext';
import GoogleOauthLogin from './GoogleOauthLogin';
function Login() {

    const context = useContext(LoginContext);
    const {credentialLogin} = context;

    const initialCredentials = {
        "username" : "",
        "password" : ""
    }

    const [credentials,setCredentials] = useState(initialCredentials);

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name] : e.target.value
        })
    }

    const handleClick = () => {
        credentialLogin(credentials.username,credentials.password);
    }

    return (
        <div className='login-component'>
            
            <div className="mt-20 max-w-sm mx-auto bg-indigo-400 shadow-xl rounded my-8">
                <div className="text-center tracking-wider text-gray-600 py-4">Log in with</div>
                <div className="mx-24 mb-3 ">
                    <GoogleOauthLogin/>
                </div>
                <div className="bg-gray-200 pt-8 pb-16">
                    <div className="text-center text-gray-600 mb-6">Or sign in with Email & Password</div>
                    <div className="w-4/5 mx-auto">
                        <div className="flex items-center bg-white rounded shadow-md mb-4">
                            <span className="px-3">
                                <svg className="fill-current text-gray-500 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M18 2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h16zm-4.37 9.1L20 16v-2l-5.12-3.9L20 6V4l-10 8L0 4v2l5.12 4.1L0 14v2l6.37-4.9L10 14l3.63-2.9z" /></svg>
                            </span>
                            <input onChange={handleChange} className="w-full h-12 focus:outline-none" type="text" value={credentials.username} name="username" placeholder="Username" />
                        </div>
                        <div className="flex items-center bg-white rounded shadow-md mb-4">
                            <span className="px-3">
                                <svg className="fill-current text-gray-500 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M4 8V6a6 6 0 1 1 12 0h-3v2h4a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" /></svg>
                            </span>
                            <input onChange={handleChange} className="w-full h-12 focus:outline-none" type="password" value={credentials.password} name="password" placeholder="Password" />
                        </div>
                        <button onClick={handleClick} className="bg-indigo-600 block mx-auto text-white text-sm uppercase rounded shadow-md px-6 py-2">Log in</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
