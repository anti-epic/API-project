// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import OpenModalMenuItem from './OpenModalMenuItem';
import SignupFormModal from '../SignupFormModal';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  // console.log(sessionUser, 'sessionuser')
  return (
    <div className='container'>


    <ul className='navBar'>
      <li className="logo">

        <NavLink exact to="/" style={{ textDecoration: 'none', fontSize: '28px', fontWeight: 'bold' }}>
       <div className='imgLogo'style={{display: 'inline'}}>
       <i className="fa-solid fa-house-crack"></i>
       </div>
  <div className='logoText'>Airbrb</div>
        </NavLink>
      </li>
      <div className='buttonsContainer'>
      {sessionUser ? (<>
          <NavLink className='bookingsButton' to='/bookings'> Bookings</NavLink>
        <NavLink className='createSpotButton' to='/spots/create'> Airbrb your home</NavLink>
      </>
      ) : (
<OpenModalMenuItem className='createSpotButtonLoggedOut' itemText="Airbrb your home" modalComponent={<SignupFormModal />} />
      )

    }
    </div>
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
