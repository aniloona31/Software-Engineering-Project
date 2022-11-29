import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';


function PaymentGateway() {

    const [checkout, setCheckout] = useState({
        customerName: "",
        email: "",
        phoneNumber: "",
        quantitiy : 0 
    })

    const [price,setPrice] = useState(0);

    const {state} = useLocation();
    const navigate = useNavigate();

    useEffect (() =>{
        console.log("i am at checkout ",state)
        const token = localStorage.getItem('token')
        if(token !== null){
            if(state.placeName !== null){
                setPrice(30);
            }else{
                navigate('/')
            }
        }
    },[])

    const initPayment = (data) => {
		const options = {
			key: data.secretId,
            name: data.pgName,
			amount: data.applicationFee,
			description: "Test Transaction",
			order_id: data.razorpayOrderId,
            currency: "INR",
			handler: async (response) => {
                // console.log(response)
				try {
                    const token = localStorage.getItem('token');
					const verifyUrl = "http://localhost:8080/verify/payment";
					const resp = await fetch(verifyUrl, {
                        method : "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body : JSON.stringify({
                            "razorpay_payment_id" : response.razorpay_payment_id,
                            "razorpay_order_id": response.razorpay_order_id,
                            "razorpay_signature" : response.razorpay_signature
                        })
                    });
					if(resp.status === 200){
                        const url = "http://localhost:8080/get-ticket";
                        const res = await fetch(url, {
                            method : "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`
                            },
                            body : JSON.stringify({
                                placeName : state.placeName,
                                cost : price,
                                quantitiy : parseInt(checkout.quantitiy)
                            })
                        });

                        if(res.status === 200){
                            const json = await res.json();
                            console.log(json);
                            navigate('/')
                        }
                    }else{
                        navigate('/');
                    }
				} catch (error) {
					console.log(error);
				}
			},
			theme: {
				color: "#3399cc",
			},
		};
		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	};

    const handlePayment = async (e) => {
        e.preventDefault();
        try {
            // console.log(typeof checkout.quantitiy);
            if (localStorage.getItem('token') !== null) {
                const token = localStorage.getItem('token');
                const url = "http://localhost:8080/payment-gateway/createOrder";
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        "customerName": checkout.customerName,
                        "email": checkout.email,
                        "phoneNumber": checkout.phoneNumber,
                        "amount": parseInt(checkout.quantitiy)*price
                    })
                })
                // console.log(response);
                if(response.status == 200){
                    const json = await response.json();
                    // console.log(json);
                    initPayment(json);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => {
        setCheckout({
            ...checkout,
            [e.target.name] : e.target.value
        })
    }


    return (
        <div className='mx-96 my-28'>
            <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md">
                <form>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-group mb-6">
                            <input onChange={handleChange} value={checkout.customerName} name="customerName" type="text" className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput123"
                                aria-describedby="emailHelp123" placeholder="name" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-group mb-6">
                            <input type="date" className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput123"
                                aria-describedby="emailHelp123" placeholder="date" />
                        </div>
                    </div>    
                    <div className="form-group mb-6">
                        <input onChange={handleChange} value={checkout.email} name="email" type="email" className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput125"
                            placeholder="Email address" />
                    </div>
                    <div className="form-group mb-6">
                        <input onChange={handleChange} value={checkout.quantitiy} name="quantitiy" type="number" className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput126"
                            placeholder="Quantity" />
                    </div>

                    <div className="form-group mb-6">
                        <input onChange={handleChange} value={checkout.phoneNumber} name="phoneNumber" type="text" className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput126"
                            placeholder="phone" />
                    </div>

                    <button type="submit" className="
      w-full
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out" onClick={e => handlePayment(e)}>Checkout</button>
                </form>
            </div>
        </div>
    )

}

export default PaymentGateway