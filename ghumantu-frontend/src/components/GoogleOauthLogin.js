import React, { useContext } from 'react'
import GoogleLogin from 'react-google-login';
import LoginContext from '../Context/login/LoginContext';
function GoogleOauthLogin() {
    const context = useContext(LoginContext);
    const {googleLogin} = context;
    const handleLogin = (res) => {
        console.log("pressed");
        googleLogin(res);
    }

    const handleFailure = () =>{
        alert("failed");
    }

    return (
        <div>
             <GoogleLogin
              clientId="109272294286-vh4661ubcljnocqt52kfnucfck4mo1ap.apps.googleusercontent.com"
              buttonText="Log in with Google"
              onSuccess={handleLogin}
              onFailure={handleFailure}
              cookiePolicy={'single_host_origin'}
            ></GoogleLogin>
        </div>
    )
}

export default GoogleOauthLogin
