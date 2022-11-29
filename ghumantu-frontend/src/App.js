import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Questions from './components/Questions';
import Answer from './components/Answer';
import Login from './components/Login';
import LoginState from './Context/login/LoginState';
import PlaceState from './Context/places/PlaceState';
import Review from './components/Review';
import QuestionState from './Context/questions/QuestionState';
import Wishlist from './components/Wishlist';
// import GMap from './components/Map';
import Images from './components/Images';
import Scanner from './components/Scanner';
import PaymentGateway from './components/PaymentGateway';

function App() {
  return (
    <>
      <Router>
        <LoginState>
          <PlaceState>
            <QuestionState>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/questions" element={<Questions />} />
                <Route path="/questions/user" element={<Questions />} />
                <Route path="/answers/:id" element={<Answer />} />
                <Route path="/login" element={<Login />} />
                <Route path="/reviews" element={<Review />} />
                <Route path="/:category" element={<Home />} />
                <Route path="/wishlist" element={<Wishlist />} />
                {/* <Route path="/map" element={<GMap />}></Route> */}
                <Route path="/images" element={<Images />} />
                <Route path="/Scanner" element={<Scanner/>}/>
                <Route path="/checkout" element={<PaymentGateway/>}/>
              </Routes>
            </QuestionState>
          </PlaceState>
        </LoginState>
      </Router>
    </>
  )
}
export default App
