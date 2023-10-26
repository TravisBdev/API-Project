import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './ProfileButton.css'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ProfileButton({ user }) {
  const history = useHistory()
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className="profile-controls">
      <div className="menu-btns">
        <i class="fa-solid fa-bars fa-lg" id="burger-btn"></i>
        <button onClick={openMenu}>
          <i className="fas fa-user-circle" />
        </button>
      </div>

      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="user-menu">
            <div>Hello, {user.firstName}</div>
            <div>{user.firstName} {user.lastName}</div>
            <div>{user.email}</div>
            <div className="manage-spots-box">
              <NavLink id='manage-btn' to='/spots/current'>Manage Spots</NavLink>
            </div>
            <div>
              <button onClick={logout}>Log Out</button>
            </div>
          </div>
        ) : (
          <div className="login-menu">
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileButton;
