import { Zoom } from '@stahl.luke/react-reveal';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import LoginContext from '../Context/login/LoginContext';
import PlaceContext from '../Context/places/PlaceContext'
import Place from './Place'

function Home() {

    const navigate = useNavigate();
    // let { state } = useParams();
    let location = useLocation();

    const [selectedOption,setSelectedOption] = useState({
        value : "empty",
        label : "Select State"
    })

    const context = useContext(PlaceContext);
    const { places, getAllPlaces, getPlacesByState, getLikedAndDisliked } = context;

    const contextTwo = useContext(LoginContext);
    const { getWishlist } = contextTwo;

    const options = [
        { value: 'empty', label: 'Select State'},
        { value: 'Rajasthan', label: 'Rajasthan' },
        { value: 'Chandigarh', label: 'Chandigarh' },
        { value: 'Delhi', label: 'Delhi' },
        { value: 'Punjab', label: 'Punjab' }
    ];

    const handleChange =(selectedOption) =>{
        console.log(selectedOption)
        setSelectedOption(selectedOption);
        if(selectedOption.value !== "empty"){
            getPlacesByState(selectedOption.value);
            console.log(places);
        }
        else{
            getPlacesByState("empty")
        }
    }

    return (
        <h1 className="bg-gray-100 pt-8 pb-8">
            <h1 className='flex justify-center font-bold'>Select Prefered State</h1>
            <div className='flex justify-center mt-3'>
                <Select
                    value={selectedOption}
                    onChange={handleChange}
                    options={options}
                />
            </div>
            {places.length > 0 || selectedOption.value == "empty" ? places.map((item) => {
                return (
                    <Zoom>
                        <div key={item.placeId} className="justify-center">
                            <Place place={item}></Place>
                        </div>
                    </Zoom>
                )
            }) : <div className='font-bold text-xl'>No Items To Show</div>}
        </h1>
    )
}

export default Home
