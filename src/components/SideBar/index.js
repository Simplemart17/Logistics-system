import React from 'react';
import { Link } from 'react-router-dom';
import './SideBar.scss';

const SideBar = props => (
  <div className='sidebar'>
    <div className='sidebar__avatar'>
      <img src="https://res.cloudinary.com/drmrayjr0/image/upload/v1559304041/profile_mbyrmu.jpg" alt="profile" />
    </div>
    <div className='sidebar__details'>
      <p>{props.username}</p>
      <p>{props.email}</p>
    </div>
    <div className='line' ></div>
    <div className='sidebar__menu'>
      <ul className='sidebar__menu--content'>
        <li>
          <Link to='/addresses' className='sidebar__menu--link'>
            <img src="https://res.cloudinary.com/dq7p8ff2f/image/upload/v1572969948/Assets/address-icon.png" alt="address" />
            Addresses
          </Link>
        </li>
        <li>
          <Link to='/couriers' className='sidebar__menu--link'>
            <img src="https://res.cloudinary.com/dq7p8ff2f/image/upload/v1572969948/Assets/courier-icon.png" alt="courier" />
            Couriers
          </Link>
        </li>
        <li>
          <Link to='/shipments' className='sidebar__menu--link'>
            <img src="https://res.cloudinary.com/dq7p8ff2f/image/upload/v1572969948/Assets/shipment-icon.png" alt="shipment" />
            Shipments
          </Link>
        </li>
        <li>
          <Link to='/logout' className='sidebar__menu--link'>
            <img src="https://res.cloudinary.com/dq7p8ff2f/image/upload/v1572970020/Assets/download-icon.png" alt="logout" />
            Log out
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default SideBar;
