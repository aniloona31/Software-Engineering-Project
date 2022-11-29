import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import LoginContext from '../Context/login/LoginContext'
import Place from './Place';

function Wishlist() {
    const context = useContext(LoginContext);
    const {wishlist,getWishlist} = context; 

    const navigate = useNavigate;

    useEffect(()=>{
        if(localStorage.getItem('token') !== null){
            getWishlist();
        }
        else{
            navigate("/login");
        }
    },[])

    return (
        <div>
            <div className='relative top-16 font-bold text-2xl shadow-lg h-20 w-full bg-gray-200'>
                <span className='flex justify-center py-5 mx-7'>Wishlist</span>
            </div>
            <h1 className="bg-gray-100 mt-16 pt-8 pb-8">
            {wishlist.length > 0 ? wishlist.map((item)=>{
                return (
                    <div key={item.placeId}>
                        <Place place={item}></Place>
                    </div>
                )
            }) : <div className='font-bold text-xl flex justify-center'>No Items To Show</div>}
        </h1>
        </div>
    )
}

export default Wishlist
