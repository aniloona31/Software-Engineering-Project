import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Images() {

    const [image, setImage] = useState(null);
    const [images, setImages] = useState([]);
    const { state } = useLocation();
    const navigate = useNavigate();

    const getImage = (e) => {
        console.log(e.target.files[0]);
        setImage(
            e.target.files[0]
        )
    }

    const uploadImage = async () => {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('image', image, image.name);
        if (token !== null) {
            const url = `http://localhost:8080/photos/${state.placeName}`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            })
            if (response.status === 200) {
                console.log(response);
                setImage(null)
            }
            else {
                //error
                console.log(response);
            }
        }
        else {
            navigate("/login");
        }
    }

    useEffect(async () => {
        const token = localStorage.getItem('token');
        const url = `http://localhost:8080/photos/${state.placeName}`;
        if (token !== null) {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Authorizaation": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            if (response.status === 200) {
                const json = await response.json();
                // console.log(json);
                setImages(json);
            }
            else {
                //error
            }
        }
        else {
            navigate("/login");
        }
    }, []);

    return (
        <div>
            <div className='relative top-16 font-bold text-2xl shadow-lg h-32 w-full ' style={{ backgroundImage: `url(${state.image})`, backgroundSize: '100%', backgroundRepeat: 'no-repeat', opacity: 0.9 }}>
                <span className='flex tracking-wider justify-center text-5xl text-white z-10 py-9 mx-7'>{state.placeName}</span>
            </div>
            <div className='flex'>
                <label className='mt-20 mx-6 text-lg bg-indigo-300 p-4 border rounded font-bold shadow-lg hover:bg-indigo-400'>
                    Post Your Images
                    <input onChange={getImage} type="file" className='hidden' />
                </label>
                {image != null ? <button onClick={uploadImage} className='mt-20 mx-6 text-lg bg-indigo-300 p-4 border rounded font-bold shadow-lg hover:bg-indigo-400'>Upload</button> : <></>}
            </div>
            <div className='mt-6'>
                    {images.length > 0 ?
                        images.map((item) => {
                            return (
                                <div key={item.photoId}>
                                    <img className='h-52 mx-12 my-14 w-52 border rounded-lg' src={'data:image/jpeg;base64,' + item.image} />
                                </div>
                            )
                        })
                        : <></>}
                </div>
        </div>
    )
}

export default Images;
