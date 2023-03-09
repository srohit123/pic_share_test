import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getItem, removeItem } from "../utils/helpers";
import { HOME, FAVOURITES, LOGIN } from "../utils/routesConstants";

import { logoutSuccess } from "../redux/slices/authSlice";

import AddNewPicModal from "./modals/AddNewPicModal";

const Header: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { isLogin } = useSelector((state: any) => state.auth);
  const username = getItem("username");
  const logoutHandler = () => {
    navigate(LOGIN);
    removeItem("token");
    removeItem("username");
    dispatch(logoutSuccess());
  };

  return (
    <>
      <header className="header-section container-fluid sticky-top">
        <nav className="navbar navbar-expand-lg">
          <NavLink to={HOME} className="navbar-brand">
            <img
              src="assets/images/logo.svg"
              className="img-fluid"
              alt="Logo Img"
            />
          </NavLink>
          <button
            className={`btn navbar-toggler ${!showNavbar && "collapsed"}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded={showNavbar ? true : false}
            aria-label="Toggle navigation"
            onClick={() => setShowNavbar(prevState => !prevState)}
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className={`collapse navbar-collapse ${showNavbar && "show"}`} id="navbarTogglerDemo02">
            {isLogin && (
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <NavLink to={HOME} className="nav-link" aria-current="page">
                    <span className="text">Home</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={FAVOURITES} className="nav-link">
                    <span className="text">Favourite</span>
                  </NavLink>
                </li>
              </ul>
            )}
            <div className="header-left-button">
              {isLogin ? (
                <>
                  <button
                    onClick={() => setShowModal(true)}
                    className="btn primary-btn header-btn"
                  >
                    Share Pic
                  </button>
                  <button className="btn link-text header-btn">
                    Hi {username}
                  </button>
                  <button
                    onClick={logoutHandler}
                    className="btn link-btn header-btn"
                  >
                    Log out
                  </button>
                </>
              ) : pathname !== LOGIN ? (
                <button
                  onClick={() => {
                    navigate(LOGIN);
                  }}
                  className="btn primary-btn header-btn"
                >
                  Log in
                </button>
              ) : null}
            </div>
          </div>
        </nav>
      </header>
      {showModal && <AddNewPicModal closeModal={() => setShowModal(false)} />}
    </>
  );
};

export default Header;
