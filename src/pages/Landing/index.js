import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.scss';

const Landing = () => (
  <div className="landing">
    <div className="landing__container">
      <div className="landing__container--jumbotron">
        <h1>Get Your Parcels Delivered Anywhere With Our Services</h1>
        <div className="register-btn-container">
          <Link to="/register"><button className="register-button">Get Started</button></Link>
        </div>
      </div>
    </div>
    <div className="landing__illustration">
      <img src="https://res.cloudinary.com/dq7p8ff2f/image/upload/v1572634306/Assets/logistics-illustration.png" alt="page illustration" />
    </div>
  </div>
);

export default Landing;
