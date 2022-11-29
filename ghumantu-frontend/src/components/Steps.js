import React from 'react'
import './Steps.css';
function Steps() {
    return (
        <div>
            <h1 className='mt-4 font-extrabold flex flex-row justify-center' >STEPS TO GET YOUR TICKET</h1>
        <div className='mt-7 flex flex-row justify-center'>
            <ul class="card-wrapper">
                <li class="card">
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA4uqADoInHXSMuAOKaokqsvxc3w5iR5kVpw&usqp=CAU
' alt='' />
                    <h3><a href="">Sign in</a></h3>

                </li>
                <li class="card">
                    <img src=' https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmrVK-C1--xo-nfQrR6Pb5G9U4CqP6jkcAGw&usqp=CAU' alt='' />
                    <h3><a href="">Scan QR-code</a></h3>
                    <p></p>
                </li>
                <li class="card">
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkAGFnxDwsS-oeIIVnf1puiFwS-bUK-90rlQ&usqp=CAU' alt='' width="250" height="220" />
                    <h3><a href="">Make Payment</a></h3>
                    <p></p>
                </li>
            </ul>
        </div>
        </div>
    )
}

export default Steps