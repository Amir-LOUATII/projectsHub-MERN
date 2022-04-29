import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "./User.module.css";

const User = (props) => {
  const { name, image, job, _id, numberOfProjects } = props;
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <div className="w-100 d-flex justify-content-center align-items-center">
          <img src={image} alt={name} className={classes.img} />
        </div>
        <Card.Text className="h5 mt-3">
          Name: <span className="text-muted ">{name}</span>
        </Card.Text>
        <Card.Text className="h5 mt-3 ">
          Job: <span className="text-muted text-capitalize">{job}</span>
        </Card.Text>
        <Card.Text className="h5 mt-3 ">
          Submitted projects:{" "}
          <span className="text-muted text-capitalize">{numberOfProjects}</span>
        </Card.Text>
        <Link
          to={`/userprofile/${_id}`}
          className="text-center d-block bg-light"
        >
          View profile
        </Link>
      </Card.Body>
    </Card>
  );
};

export default User;
