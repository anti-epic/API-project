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
  return (


<nav class="level">
  {/* <!-- Left side --> */}
  <div class="level-left">
    <div class="level-item pl-6">

      <NavLink exact to="/" style={{ textDecoration: 'none', fontSize: '28px', fontWeight: 'bold' }}>
       <div className='imgLogo'style={{display: 'inline'}}>
       <i className="fa-solid fa-house-crack"></i>
       </div>
  <div className='logoText'>Airbrb</div>
        </NavLink>

    </div>
    <div class="level-item">
      <div class="field has-addons">
      </div>
    </div>
  </div>

  {/* <!-- Right side --> */}
  <div class="level-right has-text-centered pr-6">
      {sessionUser ? (<>
         <NavLink className='level-item has-text-centered  bookingsButton' to='/bookings'> Bookings</NavLink>
       <NavLink className='level-item has-text-centered createSpotButton is-centered' to='/spots/create'> Airbrb your home</NavLink>
      </>
      ) : (
        <div className='level-item has-text-centered createSpotButton'>

<OpenModalMenuItem  itemText="Airbrb your home" modalComponent={<SignupFormModal />} />
</div>
      )

    }

    <div className='menuButton'>
      {isLoaded && (
        <li className='login'>
          <ProfileButton user={sessionUser} />
        </li>
      )}
      </div>
  </div>
</nav>

  );
}

export default Navigation;
