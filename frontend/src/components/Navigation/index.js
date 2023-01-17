// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from "./logo.png"

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='container'>
    <div className='aboveNav'>
      We show total prices up front
    </div>

    <ul className='navBar'>
      <li className="logo">

        <NavLink exact to="/" style={{ textDecoration: 'none', color: 'blue', fontSize: '28px', fontWeight: 'bold' }}>


       <img className='imgLogo'src={logo} style={{display: 'inline'}}></img>

    Airbnb
        </NavLink>
      </li>
      <div className='menuButton'>
      {isLoaded && (
        <li className='login'>
          <ProfileButton user={sessionUser} />
        </li>
      )}
      </div>
    </ul>
      </div>
  );
}

export default Navigation;
