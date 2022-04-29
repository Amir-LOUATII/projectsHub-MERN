import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import classes from "../../pages/Profile.module.css";
import { useAuthContext } from "../../context/authContext";
import UseHttp from "../../hooks/useHttp.";
import { useSingleUserContext } from "../../context/singleUserContext";
import Follow from "./Follow";
import ProfileImage from "./ProfileImage";

const Infos = () => {
  const {
    user: { name, createdAt, _id, job },
    userSuccess: success,
  } = useSingleUserContext();

  const date = new Date(createdAt);
  return (
    <>
      {success && (
        <>
          <ProfileImage />
          <Follow _id={_id} />
          <h1
            className={`${classes.name} h3 text-center d-block mt-3 text-muted`}
          >
            {name}
          </h1>
          <h2
            className="h6
                "
          >
            Job:
            <span className="text-muted text-capitalize d-inline-block ms-2">
              {job}
            </span>
          </h2>
          <h2
            className="h6
                "
          >
            Joined at:
            <span className="text-muted d-inline-block ms-1">
              {success && format(date, "dd-MM-yyyy")}
            </span>
          </h2>
        </>
      )}
    </>
  );
};

export default Infos;
