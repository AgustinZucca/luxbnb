import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import { menuIcon } from "./Navicons";
import "./css/navbar.css";
import { fetchAllSpots } from "../store/spots";
import LoginForm from "./auth/LoginForm";
import SignUpForm from "./auth/SignUpForm";
import logoIcon from '../images/Luxbnb_Logo-removebg-preview.png';
import hostSpot from '../images/hostSpot.jpeg'
import bookings from '../images/booking.png'


const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory()
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
      setShowDropDown(false);
    setShowLoginModal(false);
    setShowSignUpModal(false);
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
          className={"navbarLinksHome"}
        >
          <div className="homeLinks">
            <img
              src={logoIcon}
              className="logo"
            ></img>
            <div>luxbnb</div>
          </div>
        </NavLink>
        <div>Host/Book a Luxury spot!</div>
        <div className="navbardropdown" onClick={openDropDown}>
          {menuIcon}

          {showDropDown && (
            <>
              <div className="navbarpageBkg" onClick={() => closeModal()}></div>

              <div className="menudropdown">
                {!user && (
                  <>
                    <div
                      className={"navbarLinks1"}
                      onClick={() => setShowLoginModal(true)}
                    >
                      Login
                    </div>

                    <div
                      className={"navbarLinks1"}
                      onClick={() => setShowSignUpModal(true)}
                    >
                      Sign Up
                    </div>
                    <div
                      className={"navbarLinks"} onClick={() => history.push('/aboutme')}
                    >About Me</div>
                  </>
                )}
                {user && (
                  <>
                    <NavLink
                      to="/spots/new"
                      exact={true}
                      activeClassName="active"
                      className={"navbarLinks1"}
                    >
                      <div>
                        <img
                          src={hostSpot}
                          className="hostSpotIcon"
                        />
                        Host Spot
                      </div>
                    </NavLink>
                    <NavLink
                      to={`/users/${user.id}/bookings`}
                      exact={true}
                      activeClassName="active"
                      className={"navbarLinks1"}
                    >
                      <div>
                        <img
                          src={bookings}
                          className="hostSpotIcon"
                        />
                        Bookings
                      </div>
                    </NavLink>
                    <NavLink
                    to='/aboutme'
                    exact={true}
                      activeClassName="active"
                      className={"navbarLinks"}
                    >About Me</NavLink>
                    

                    <LogoutButton close={() => closeModal()}/>
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
