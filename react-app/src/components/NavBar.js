import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import { menuIcon } from "./Navicons";
import "./css/navbar.css";

const NavBar = () => {
  const user = useSelector((state) => state?.session?.user);
  const [showDropDown, setShowDropDown] = useState(false);

  const openDropDown = () => {
    setShowDropDown(!showDropDown);

    const closeModal = () => {
      setShowDropDown(false)
    }
    if (showDropDown === true) {
      document.addEventListener('click', closeModal)

    }
    return document.removeEventListener('click', closeModal)
  };

  return (
    <nav className="navbar">
      <div className="navbarcomponents">
        <NavLink to="/" exact={true} activeClassName="active">
          Home LOGO GOES HERE
        </NavLink>
        <div className="navbardropdown" onClick={openDropDown}>
          {menuIcon}

          {showDropDown && (
            <div className="menudropdown">
              {!user && (
                <>
                  <NavLink to="/login" exact={true} activeClassName="active">
                    Login
                  </NavLink>

                  <NavLink to="/sign-up" exact={true} activeClassName="active">
                    Sign Up
                  </NavLink>
                </>
              )}
              {user && (
                <>
                  <NavLink
                    to="/spots/new"
                    exact={true}
                    activeClassName="active"
                  >
                    New Spot
                  </NavLink>
                  <NavLink
                    to={`/users/${user.id}`}
                    >Profile</NavLink>

                  <LogoutButton />
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
