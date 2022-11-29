import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PlaceContext from './PlaceContext'

function PlaceState(props) {
    
    const initialPlaces = [];
    const [places,setPlaces] = useState(initialPlaces);
    const [likeAndDislike, setLikeAndDislike] = useState([]);

    const url = "http://localhost:8080";
    const navigate = useNavigate();


    const getAllPlaces = async() => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${url}/place`,{
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
            }
        })
        if(response.status === 200){
            const json = await response.json();
            setPlaces(json);
            console.log(json);
        }
        else{
            //give notification of error.
        }
    }

    //get places of particuler category
    const getPlacesByState = async(state) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${url}/place/${state}`,{
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
            }
        })
        // .then(response => response.json())
        // .then((response) => {
        //     setPlaces(response);
        // }).catch(error => console.log(error));
        // console.log(response)
        if(response.status === 200){
            const json = await response.json();
            setPlaces(json);
        }
        else{
            if(response.status === 500){
                navigate("/login");
            }
            //give notification of error.
        }
    }

    //get Places liked and disliked by user
    const getLikedAndDisliked = async () => {
        const token = localStorage.getItem('token');
        const url = "http://localhost:8080/place/vote/user";
        const response = await fetch(`${url}`,{
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
            }
        })
        //console.log(response);
        if (response.status === 200) {
            const json = await response.json();
            setLikeAndDislike(json);
        }
        else {
            // show error
        }
    }

    //vote
    const vote = async(placeId,voteType) =>{
        const token = localStorage.getItem('token');
        const url = "http://localhost:8080/place/vote";
        const response = await fetch(`${url}`,{
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
            },
            body : JSON.stringify({placeId,voteType})
        })
        //console.log(response);
        if (response.status === 200) {
            console.log(response);
        }
    }


    return (
        <PlaceContext.Provider value={{places,getAllPlaces,getPlacesByState,getLikedAndDisliked,likeAndDislike,setLikeAndDislike,vote}}>
            {props.children}
        </PlaceContext.Provider>
    )
}

export default PlaceState
