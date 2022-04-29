import React, { useState } from "react";
import { useAuthContext } from "../context/authContext";
import { Link } from "react-router-dom";
import classes from "./Sidebar.module.css";
import OnlineUsers from "./onlineUsers";

const CurrentUserDetails = () => {
  const { user } = useAuthContext();
  return (
    <aside
      className={` ${classes.sidebar} p-3 pt-1 d-xs-flex justify-content-between align-item-center d-md-block shadow-sm`}
    >
      <header className="pt-3 mb-3 overflow-hidden">
        {user && (
          <Link
            to={`/userprofile/${user.id}`}
            className="d-flex align-items-center text-decoration-none "
          >
            <img
              src={user.image}
              alt={user.name}
              className="shadow-md
              me-1"
              key={1}
            />
            <div className="d-block text-capitalize fw-bold text-light" key={2}>
              <p className="my-0">{user.name}</p>
              <p className={`${classes.job} my-0 text-wrap`}>{user.job}</p>
            </div>
          </Link>
        )}
      </header>
      {user && (
        <>
          <h1 className="h6" key={1}>
            Followers: <span>{user.numberOfFollowers}</span>
          </h1>
          <h1 className="h6" key={2}>
            Following: <span>{user.following}</span>
          </h1>
          <h1 className="h6" key={3}>
            Submitted project: <span>{user.numberOfProjects}</span>
          </h1>
        </>
      )}

      <div className="ms-2">
        <OnlineUsers />
      </div>
    </aside>
  );
};

export default CurrentUserDetails;
