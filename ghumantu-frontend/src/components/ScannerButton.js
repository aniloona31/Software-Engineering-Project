import React from 'react'
import { useNavigate } from 'react-router-dom'

function ScannerButton() {
    const navigate = useNavigate();
    const goToWebQr = () => {
        const token = localStorage.getItem('token');
        if(token !== null){
            navigate("/Scanner");
        }
        else{
            navigate("/login");
        }
    }   
  return (
    <div>
        <button onClick={goToWebQr} type="button" className="flex flex-row justify-center p-3  mt-8 h-16 w-48 border rounded-lg shadow-2xl text-lg font-bold bg-indigo-400 hover:bg-indigo-500 hover:cursor-pointer">Get Your Ticket</button>
    </div>
  )
}

export default ScannerButton