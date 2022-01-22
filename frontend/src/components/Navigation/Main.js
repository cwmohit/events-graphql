import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

function MainNav() {
  const user = useContext(AuthContext);

  return (
    <div>
      <header className="p-3 bg-dark text-white">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a
              href="/"
              className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
            >
              <svg
                className="bi me-2"
                width="40"
                height="32"
                role="img"
                aria-label="Bootstrap"
              ></svg>
            </a>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <NavLink to="/" className="nav-link px-2 text-secondary">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/events" className="nav-link px-2 text-white">
                  Events
                </NavLink>
              </li>
              {
                user?.token &&
                <li>
                  <NavLink to="/bookings" className="nav-link px-2 text-white">
                    Bookings
                  </NavLink>
                </li>
              }
            </ul>

            <div className="text-end">
              {
                !user?.token ? 
                <NavLink to="/auth">
                  <button type="button" className="btn btn-outline-light me-2">
                    Login
                  </button>
                </NavLink> :  <button type="button" className="btn btn-outline-light me-2" onClick={() => user.logout()}>
                    Logout
                  </button>
              }
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default MainNav;
