import React, { useEffect, useState } from "react";
import UseHttp from "../hooks/useHttp.";
import classes from "./Sidebar.module.css";
import { Link } from "react-router-dom";

export default function OnlineUsers() {
  const { isPending, sendRequest: getOnlineUsers, error, success } = UseHttp();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getOnlineUsers({ url: "/api/v1/users/online" }, (data) => {
      setUsers(data.users);
    });
  }, []);

  return (
    <>
      <h2 className="h5 text-dark mt-3">Online Users ({users.length}):</h2>
      {!users.length && <></>}
      {users &&
        users.map((user) => {
          return (
            <Link
              key={user._id}
              to={`/userprofile/${user._id}`}
              className="position-relative text-decoration-none text-light d-block my-2"
            >
              <img
                src={user.image}
                alt={user.name}
                className={classes["online-img"]}
              />
              <span className="d-inline-block ms-1">{user.name}</span>
              <span className={classes.online}></span>
            </Link>
          );
        })}
    </>
  );
}
