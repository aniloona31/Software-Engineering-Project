import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ScannerButton from './ScannerButton';
import Slider from './Slider';
import Steps from './Steps';
// import SubCategory from './SubCategory';

function Header() {

    const navigate = useNavigate();

    //get question from context api
    const location = useLocation();
    let initialOpen = {
        menu: false
    }
    const [open, setOpen] = useState(initialOpen);
    const openMenu = () => {
        setOpen({
            menu: !(open.menu)
        })
    }

    //get current users questions
    const getMyQuestions = () => {
        if (localStorage.getItem('token') !== null) {
            navigate("/questions/user")
        }
        else {
            navigate("/login");
        }
    }

    //go to all quaestions
    const goToQuestions = () => {
        if (localStorage.getItem('token') !== null) {
            navigate("/questions")
        }
        else {
            navigate("/login");
        }
    }

    //logout
    const logout = () =>{
        localStorage.removeItem('token');
        setOpen(false)
        navigate("/login");
    }

    //wishList
    const goToWishlist = () => {
        navigate("/wishlist");
    }

    return (
        <>
            <div>
                <nav className="bg-gray-800 fixed z-10 shadow-lg top-0 w-full">
                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="relative flex items-center justify-between h-16">
                            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex items-center text-gray-100 font-bold font-mono text-xl">
                                    Ghumantu
                                </div>
                                <div className="hidden sm:block sm:ml-6">
                                    <div className="flex space-x-4">
                                        <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Home</Link>

                                        {/* <Link to="/about" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</Link> */}
                                        <button onClick={goToQuestions} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Questions</button>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <button type="button" className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                    <span className="sr-only">View notifications</span>
                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                </button>

                                {localStorage.getItem('token')!==null ? <div className="ml-3 relative">
                                    <div>
                                        <button onClick={openMenu} type="button" className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                            <span className="sr-only">Open user menu</span>
                                            <img className="font-bold h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                        </button>
                                    </div>

                                    {open.menu === true ? <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                                        <Link to="/" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">Your Profile</Link>
                                        <button onClick={goToWishlist} className="curson-pointer block px-4 py-2 text-sm text-gray-700" tabIndex="-1" id="user-menu-item-0">Wishlist</button>
                                        <button onClick={getMyQuestions} className="curson-pointer block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">My Questions</button>
                                        <button onClick={logout} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">Log out</button>
                                    </div> : <div></div>}
                                </div> : <></>}
                            </div>
                        </div>
                    </div>


                    <div className="sm:hidden" id="mobile-menu">
                        <div className="px-2 pt-2 pb-3 space-y-1">

                            <Link to="#" className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium" aria-current="page">Home</Link>

                            <Link to="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">About</Link>


                        </div>
                    </div>
                </nav>
            </div>
            <div className='mt-6'>
                {location.pathname === "/" ? <Slider/> : <></>}
            </div>
            <div className='flex flex-row justify-center'>
            {location.pathname === "/" ? <ScannerButton  /> : <></>}
            </div>
            {location.pathname === "/" ? <Steps  /> : <></>}
            {/* {(location.pathname === "/" || location.pathname === "/Tourism" || location.pathname === "/Party" || location.pathname === "/Basic" || location.pathname === "/Food" || location.pathname === "/Shopping" || location.pathname === "/Grocery" || location.pathname === "/Electronics" || location.pathname === "/Gedi" ) ? <SubCategory /> : <></>} */}
        </>
    )
}

export default Header
