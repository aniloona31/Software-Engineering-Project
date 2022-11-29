import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginContext from '../Context/login/LoginContext';
import PlaceContext from '../Context/places/PlaceContext';
function Place(props) {

    const initialState = "";
    const [heart, setHeart] = useState(initialState);
    const [up, setUp] = useState(false);
    const [down, setDown] = useState(false);

    const { placeId, address, budget, description, image, likes, dislikes, placeName, subCategory } = props.place;

    const context = useContext(LoginContext);
    const { wishlist, setWishlist, addToWishlist, removeFromWishlist } = context;

    const contextTwo = useContext(PlaceContext);
    const { likeAndDislike, vote } = contextTwo;

    const navigate = useNavigate();

    useEffect(() => {
        let check = false;
        //console.log("here is wishlist" + wishlist);
        wishlist.forEach((element) => {
            if (element.placeId === placeId) {
                check = true;
            }
        });
        if (check === true) {
            setHeart("red-400");
        }
        else {
            setHeart("white");
        }

        //if (likeAndDislike != null) {
        likeAndDislike.forEach((element) => {
            if (element.placeId === placeId) {
                if (element.voteType === "like") {
                    setUp(true);
                    setDown(false);
                }
                else {
                    setUp(false);
                    setDown(true);
                }
            }
        })
        //}
    }, [])

    //update wishlist
    const changeWishlist = () => {
        if (heart === 'white') {
            setHeart("red-500");
            setWishlist(
                wishlist.concat(props.place)
            )
            addToWishlist(placeId);

        } else {
            setHeart("white");
            setWishlist(
                wishlist.filter((item) => {
                    return (item.placeId !== placeId)
                })
            )
            removeFromWishlist(placeId);
        }
    }

    const goToPayment = () =>{
        navigate('/checkout',{state:{placeName}})
    }
    const changeLike = (type) => {
        if (type == "up" && down === false) {
            setUp(!up);
            vote(placeId, "like");
        }
        else if (type == "down" && up === false) {
            setDown(!down)
            vote(placeId, "dislike")
        }
        else if (type == "up" && down === true) {
            setDown(false)
            setUp(true)
            vote(placeId, "like")
        }
        else if (type == "down" && up === true) {
            setDown(true)
            setUp(false)
            vote(placeId, "dislike")
        }
    }

    //secnding placeId and placeName as object with useNavigate hook.
    const goToReviews = () => {
        navigate(`/reviews`, { state: { placeId, placeName, image } });
    }

    const goToPhotos = () => {
        navigate('/images', { state: { placeId, placeName, image } });
    }

    return (
        <>
            <div className="container mt-8 pt-8 md:p-0">

                <div className="shadow-lg flex flex-wrap w-full lg:w-4/5 mx-auto">

                    <div className="bg-cover bg-bottom border rounded w-full md:w-1/3 h-64 md:h-auto relative" style={{ backgroundImage: `url(${image})`, height: 220 }}>
                        <div className="absolute text-xl">
                            <i onClick={changeWishlist} className={`fa fa-heart text-${heart} ml-4 mt-4 cursor-pointer`}></i>
                        </div>
                    </div>
                    <div className="bg-indigo-200 w-full md:w-2/3">
                        <div className="h-full mx-auto px-6 md:px-0 md:pt-6 md:-ml-6 relative">
                            <div className="bg-white lg:h-full p-6 -mt-6 md:mt-0 relative mb-4 md:mb-0 flex flex-wrap md:flex-wrap items-center">
                                <div className="w-full lg:w-1/5 lg:border-right lg:border-solid rounded text-center md:text-left">
                                    <h3 className='font-bold italic'>{placeName}</h3>
                                    <p className="font-bold mb-0 mt-3 text-grey-dark text-sm italic">{address}</p>
                                    <hr className="w-1/4 md:ml-0 mt-4  border rounded lg:hidden" />
                                </div>
                                <div className="w-full lg:w-3/5 lg:px-3">
                                    <p className="text-md mt-4 lg:mt-0 text-justify md:text-left text-sm">
                                        {description}
                                    </p>
                                </div>

                                <div className="w-full lg:w-1/5 mt-6 lg:mt-0 lg:px-4 text-center md:text-left">
                                    <button onClick={goToPhotos} className=" text-black bg-indigo-200 tracking-wide hover:shadow-lg mb-2 border border-solid rounded  w-1/3 lg:w-full py-2">Images</button>
                                    <button onClick={goToReviews} className=" text-black bg-indigo-200 tracking-wide hover:shadow-lg border border-solid rounded  w-1/3 lg:w-full py-2">Reviews</button>
                                    <button onClick={goToPayment} className=" text-black bg-indigo-200 tracking-wide hover:shadow-lg border border-solid rounded  w-1/3 lg:w-full py-2 mt-2">Book Ticket</button>
                                    <button onClick={() => changeLike("up")}>{(up === false) ? <i className={`far flex mx-4 mt-4 cursor-pointer text-indigo-400 fa-thumbs-up fa-lg`}></i> : <i className="fas fa-thumbs-up mx-4 text-indigo-400 mt-4 fa-lg cursor-pointer"></i>}</button>
                                    <button onClick={() => changeLike("down")}>{(down === false) ? <i className={`far fa-thumbs-down flex text-indigo-400 cursor-pointer fa-lg`}></i> : <i className="fas fa-thumbs-down text-indigo-400 fa-lg cursor-pointer"></i>}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Place
