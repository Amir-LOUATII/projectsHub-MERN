import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import classes from "./Project.module.css";
import { FaTrash } from "react-icons/fa";
import DeleteMsg from "./DeleteMsg";
import UseHttp from "../../hooks/useHttp.";

const Project = ({
  projectName,
  createdBy,
  siteURL,
  _id,
  respositryURL,
  numberOfLikes,
  numberOfComments,
  screenShot,
}) => {
  const { user } = useAuthContext();
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const { isPending, error, success, sendRequest } = UseHttp();
  const deleteProject = async () => {
    sendRequest(
      { url: `/api/v1/projects/${_id}`, method: "DELETE" },
      (data) => {
        return;
      }
    );
  };

  useEffect(() => {
    if (success) {
      window.location.reload();
    }
  }, [success]);
  return (
    <Card
      style={{ width: "100%" }}
      className={`${classes.card} shadow-sm position-realtive p-1`}
    >
      <Card.Body className="position-relative">
        {user && createdBy._id === user.id && (
          <>
            <FaTrash
              className={`${classes["trash-icon"]} position-absolute text-danger`}
              onClick={() => setShowDeleteModal(true)}
            />
          </>
        )}
        <Card.Img
          src={screenShot}
          style={{ width: "100%", height: "250px" }}
        ></Card.Img>
        <Card.Title className="text-capitalize mt-3">
          {projectName.length < 40
            ? projectName
            : `${projectName.substr(0, 30)}...`}
        </Card.Title>
        {createdBy.name && (
          <Card.Subtitle className="mb-2 text-muted text-capitalize">
            Created by:{" "}
            <Link
              to={`/userprofile/${createdBy._id}`}
              className={`${classes.link} text-muted text-decoration-none`}
            >
              {createdBy.name}
            </Link>
          </Card.Subtitle>
        )}
        <Card.Text>
          {numberOfLikes}{" "}
          <Link to={`/project/${_id}`} className="text-muted">
            likes
          </Link>{" "}
          | {numberOfComments}{" "}
          <Link to={`/project/${_id}`} className="text-muted">
            comments
          </Link>
        </Card.Text>
        <Card.Link href={respositryURL} target="_blank">
          View code
        </Card.Link>
        <Card.Link href={siteURL} target="_blank">
          Preview site
        </Card.Link>
        <Link
          to={`/project/${_id}`}
          className={`${classes.details} d-block mx-auto mt-3 btn w-auto `}
        >
          Details
        </Link>
      </Card.Body>
      <DeleteMsg
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        projectname={projectName}
        deleteProject={deleteProject}
      />
    </Card>
  );
};

export default Project;
