import React from "react";
import { Outlet, NavLink } from "react-router-dom";
const NavBar = () => {
  return (
    <>
      <nav className="navBar">
        <h1>lOgO</h1>
        <div className="navBarContent">
          <ul>
            <li>
              <NavLink to="/">Weather Now</NavLink>
            </li>
            <li>
              <NavLink to="/plan-trip">Plan Trip</NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default NavBar;
