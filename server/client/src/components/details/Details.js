import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useProjectContext } from "../../context/projectContext";

const Details = () => {
  const {
    project: {
      createdAt,
      projectName,
      description,
      tags,
      respositryURL,
      siteURL,
      createdBy,
    },
  } = useProjectContext();
  return (
    <Card style={{ width: "100%" }}>
      <Card.Header>
        <Card.Title className="h3 text-capitalize">{projectName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <span>created by: </span>
          <Link to={`/userprofile/${createdBy._id}`} className="text-muted">
            {" "}
            {createdBy.name}
          </Link>
          <small className="text-decoration-underline ms-2">
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </small>
        </Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <span className="h6 me-2"> description:</span>
          {description
            ? description
            : "No description provided by the creator of this project"}
        </Card.Text>
        <div>
          {tags.map((tag, index) => {
            return (
              <span
                className="ms-1 text-primary"
                key={index}
              >{` #${tag}`}</span>
            );
          })}
        </div>
        <Card.Link href={respositryURL} target="_blank">
          View code
        </Card.Link>
        <Card.Link href={siteURL} target="_blank">
          Preview site
        </Card.Link>
      </Card.Body>
    </Card>
  );
};

export default Details;
