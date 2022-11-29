import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LoginContext from './LoginContext'

const LoginState = (props) => {
    const initialUser = {
        "username": "",
        "userId": null
    }
    const [user, setUser] = useState(initialUser);
    const navigate = useNavigate();

    const initialWishlist = [];
    const [wishlist, setWishlist] = useState(initialWishlist);

    //google Login
    const googleLogin = async (res) => {
        //console.log("i am here")
        console.log(res);
        const url = "http://localhost:8080/login";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": res.profileObj.name,
                "email": res.profileObj.email
            })
        })
        if (response.status === 200) {
            const json = await response.json();
            console.log(json);
            localStorage.setItem('token', json.token);
            setUser({
                "username": json.username,
                "userId": json.userId
            })
            //console.log(json);
            navigate("/");
        }
        else {
            //show alert
        }
    }

    //credentialLogin
    const credentialLogin = async (username, password) => {
        const url = "http://localhost:8080/PlaceFinder/auth/login";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": username,
                "email": password
            })
        })
        if (response.status === 200) {
            const json = await response.json();
            localStorage.setItem('token', json.token);
            setUser({
                "username": json.username,
                "userId": json.userId
            });
            navigate("/");
        }
        else {
            //show alert
        }
    }

    //logout method
    const logOut = () => {
        localStorage.removeItem('token');
        navigate("/login");
    }

    //add to wishlist
    const addToWishlist = async (id) => {
        const token = localStorage.getItem('token');
        const url = "http://localhost:8080/place/add-to-wishlist";
        const response = await fetch(`${url}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        console.log(response);
    }

    //remove from wishlist
    const removeFromWishlist = async (id) => {
        const token = localStorage.getItem('token');
        const url = "http://localhost:8080/place/remove-from-wishlist";
        const response = await fetch(`${url}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        if (response.status !== 200) {
            //something wrong happened
        }
    }

    //wishlist
    const getWishlist = async() =>{
        const url = "http://localhost:8080/PlaceFinder/auth";
        const token = localStorage.getItem('token');
        const response = await fetch(url,{
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
            }
        })
        // console.log(response);
        if(response.status === 200){
            const json = await response.json();
            setWishlist(json);
            // console.log(json);
        }
        else{
            //error;
        }
    }

    return (
        <LoginContext.Provider value={{ user, googleLogin, credentialLogin, logOut, wishlist, setWishlist, addToWishlist, removeFromWishlist ,getWishlist}}>
            {props.children}
        </LoginContext.Provider>
    )

}

export default LoginState;