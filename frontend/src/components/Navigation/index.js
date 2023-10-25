import React from 'react';
import logo from '../../assets/logo.png'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='nav-bar'>
      <div className='logo-box'>
        <NavLink className='home-link' exact to="/"><img id='logo' src={logo} alt="tree" /></NavLink>
        <NavLink className='home-link' exact to="/">FNTCBNB</NavLink>
      </div>


      <div className='user-box'>
        <div className='new-spot-box'>
          {sessionUser && (
            <NavLink id='create-spot-link' to='/spots'>Create a new spot</NavLink>
          )}
        </div>
        <div className="profile-box">
          {isLoaded && (
            <ProfileButton user={sessionUser} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
