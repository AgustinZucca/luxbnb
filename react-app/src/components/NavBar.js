import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import { menuIcon } from "./Navicons";
import "./css/navbar.css";
import { fetchAllSpots } from "../store/spots";
import LoginForm from "./auth/LoginForm";
import SignUpForm from "./auth/SignUpForm";
import logoIcon from '../images/Luxbnb_Logo-removebg-preview.png';
import hostSpot from '../images/hostSpot.jpeg'

const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.session?.user);
  const [showDropDown, setShowDropDown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const openDropDown = () => {
    setShowDropDown(!showDropDown);
    // const closeModal = () => {
    //   setShowDropDown(false);
    // };

    // document.addEventListener("click", closeModal);

    // return document.removeEventListener("click", closeModal);
  };

  const closeModal = () => {
    setShowDropDown(false);
    setShowLoginModal(false);
    setShowSignUpModal(false);
  };

  useEffect(() => {
    (async () => {
      await dispatch(fetchAllSpots());
    })();
  }, [dispatch]);

  return (
    <nav className="navbar">
      {showLoginModal && (
        <>
          <LoginForm close={() => setShowLoginModal(false)} signup={() => setShowSignUpModal(true)}/>
        </>
      )}
      {showSignUpModal && (
        <>
          <SignUpForm close={() => setShowSignUpModal(false)} showLogin={() => setShowLoginModal(true)}/>
        </>
      )}
      <div className="navbarcomponents">
        <NavLink
          to="/"
          exact={true}
          activeClassName="active"
          className={"navbarLinks"}
        >
          <div className="homeLinks">
            <img
              src={logoIcon}
              className="logo"
            ></img>
            <div>luxbnb</div>
          </div>
        </NavLink>
        <div className="navbardropdown" onClick={openDropDown}>
          {menuIcon}

          {showDropDown && (
            <>
              <div className="navbarpageBkg" onClick={() => closeModal()}></div>

              <div className="menudropdown">
                {!user && (
                  <>
                    <div
                      className={"navbarLinks"}
                      onClick={() => setShowLoginModal(true)}
                    >
                      Login
                    </div>

                    <div
                      className={"navbarLinks"}
                      onClick={() => setShowSignUpModal(true)}
                    >
                      Sign Up
                    </div>
                  </>
                )}
                {user && (
                  <>
                    <NavLink
                      to="/spots/new"
                      exact={true}
                      activeClassName="active"
                      className={"navbarLinks"}
                    >
                      <div>
                        <img
                          src={hostSpot}
                          className="hostSpotIcon"
                        />
                        Host Spot
                      </div>
                    </NavLink>
                    

                    <LogoutButton />
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
