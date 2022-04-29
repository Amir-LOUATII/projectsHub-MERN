import React from "react";
import classes from "./Sidebar.module.css";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineAppstoreAdd, AiOutlineUserSwitch } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

const Sidebar = () => {
  const { user } = useAuthContext();

  return (
    <aside
      className={` ${classes.sidebar} p-3  d-xs-flex justify-content-between align-item-center d-md-block shadow-sm`}
    >
      <header className="pt-1 mb-3 d-flex   d-md-none">
        {user && (
          <Link
            to={`/userprofile/${user.id}`}
            className="d-flex justify-content-center align-items-center text-decoration-none"
          >
            <img
              src={user.image}
              alt={user.name}
              className="shadow-md
              me-1"
              key={1}
            />
            <div
              className="d-inline-block text-capitalize fw-bold text-light"
              key={2}
            >
              <p className="my-0">{user.name}</p>
              <small className="mt-0 d-md-none">{user.job}</small>
            </div>
          </Link>
        )}
      </header>
      <div className="text-center h4 border border-light p-1 d-none d-sm-block">
        <span className="d-block"> Welcome </span>
        <span className={`${classes.name} "text-dark text-uppercase d-block"`}>
          {user &&
            (user.name.includes(" ")
              ? user.name.slice(0, user.name.indexOf(" "))
              : user.name)}
        </span>
      </div>
      <div className="pt-0 pt-md-3 ">
        <NavLink
          to="/"
          className={(linkData) =>
            linkData.isActive
              ? `${classes.active} text-light  text-decoration-none d-block`
              : "text-light  text-decoration-none d-block"
          }
        >
          <MdOutlineDashboard />
          <span> Dashboard</span>
        </NavLink>
        <NavLink
          to="/create"
          className={(linkData) =>
            linkData.isActive
              ? `${classes.active} text-light  text-decoration-none d-block`
              : "text-light  text-decoration-none d-block"
          }
        >
          <AiOutlineAppstoreAdd />
          <span> Create new project</span>
        </NavLink>
        <NavLink
          to="/users"
          className={(linkData) =>
            linkData.isActive
              ? `${classes.active} text-light  text-decoration-none d-block`
              : "text-light  text-decoration-none d-block"
          }
        >
          <AiOutlineUserSwitch />
          <span> Users</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
