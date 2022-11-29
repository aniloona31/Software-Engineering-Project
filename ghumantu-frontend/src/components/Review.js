import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ReviewItem from './ReviewItem';

function Review() {
    const [reviews, setReviews] = useState(null);

    const navigate = useNavigate();

    //retriving the state object passed by the useNavigate hook using the useLocation hook.
    const { state } = useLocation();

    const [review, setReview] = useState("");

    const [modal, setModal] = useState(false);

    const showModal = () => {
        setModal(!modal);
    }

    const handleChange = (e) => {
        setReview(e.target.value);
    }

    const postReview = async () => {
        if (localStorage.getItem('token') !== null) {
            const token = localStorage.getItem('token');
            const url = "http://localhost:8080/place/review";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    "review": `${review}`,
                    "placeId": state.placeId
                })
            })
            if (response.status === 200) {
                //show added
                const json = await response.json();
                if(reviews === null){
                    setReviews(json);
                }
                else{
                    setReviews(
                    reviews.concat(json)
                    )
                }
            }
            else {
                //show error
            }
            setReview("");
            setModal(!modal);
        }
        else {
            navigate("/login");
        }
    }

    const getReviews = async() =>{
        const url = `http://localhost:8080/place/review/${state.placeId}`;
        const token = localStorage.getItem('token');

        if (token !== null) {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            //console.log(response);
            if (response.status === 200) {
                const json = await response.json();
                setReviews(json);
                // console.log(reviews)
            }
            else {
                //error
            }
        }
        else {
            navigate("/login");
        }
    }

    useEffect(() => {
        getReviews();
    }, []);

    return (
        <div>
            <div className='relative top-16 font-bold text-2xl shadow-lg h-32 w-full' style={{ backgroundImage: `url(${state.image})`, backgroundSize: '100%', backgroundRepeat: 'no-repeat', opacity: 0.9 }}>
                <span className='flex tracking-wider justify-center text-5xl text-white z-10 py-9 mx-7'>{state.placeName}</span>
            </div>

            <button onClick={() => showModal()} className='mt-20 mx-6 text-lg bg-indigo-300 p-4 border rounded font-bold shadow-lg hover:bg-indigo-400'>Post Your Review</button>
            {modal === true ? <div className="fixed z-10 overflow-y-auto top-0 w-full left-0" id="modal">
                <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-gray-900 opacity-75" />
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
                    <div className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <label>Review</label>
                            <textarea type="text" onChange={handleChange} value={review} className="w-full bg-gray-100 p-2 mt-2 mb-3" />
                        </div>
                        <div className="bg-gray-200 px-4 py-3 text-right">
                            <button type="button" className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2" onClick={() => showModal()}><i className="fas fa-times"></i> Cancel</button>
                            <button type="button" onClick={postReview} className="py-2 px-4 bg-indigo-300 text-white rounded hover:bg-indigo-500 mr-2"><i className="fas fa-plus"></i> Submit</button>
                        </div>
                    </div>
                </div>
            </div> : <></>}

            <div className='my-8 mt-12'>
                {reviews!==null ? reviews.map((item) => {
                    return (
                        <div className="px-10 py-2 mx-28 my-2" key={item.reviewId}>
                            <ReviewItem review={item} />
                        </div>
                    )
                }) : <div className='mt-28 flex justify-center font-bold text-2xl'>No reviews to display</div>}
            </div>
        </div>
    )
}

export default Review
