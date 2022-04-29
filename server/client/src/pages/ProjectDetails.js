import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Comments from "../components/details/Comments";
import Details from "../components/details/Details";
import { useAuthContext } from "../context/authContext";

import { FaEdit } from "react-icons/fa";
import classes from "./Project-details.module.css";
import EditForm from "../components/details/EditForm";
import UseHttp from "../hooks/useHttp.";
import { useProjectContext } from "../context/projectContext";
import Loading from "../UI/Loading";

const ProjectDetails = () => {
  const { id } = useParams();
  const { isPending, error, success, sendRequest: getProject } = UseHttp();

  const { user } = useAuthContext();
  const [modalShow, setModalShow] = useState(false);
  const { getSingleProject, project, getSingleProjectLikes } =
    useProjectContext();
  useEffect(() => {
    getProject({ url: `/api/v1/projects/${id}` }, (data) => {
      getSingleProject(data.project);
    });
  }, []);
  if (isPending) return <Loading />;
  return (
    <Container className={`${classes["project-details"]} pt-5 pb-3`}>
      <header className="d-flex justify-content-between align-items-center">
        <Link to="/" className={`${classes.btn} d-block  my-3 btn w-auto `}>
          Back to projects
        </Link>
        {user &&
          Object.keys(project).length &&
          user.id === project.createdBy._id && (
            <div className="d-flex justify-content-end align-items-center">
              <div
                className={`${classes.edit} h5 ms-auto text-right`}
                onClick={() => setModalShow(true)}
              >
                <FaEdit className="d-inline-block ms-1 text-success"></FaEdit>
              </div>
            </div>
          )}
      </header>
      {error && <h1 className="h2 text-center pt-3">{error}</h1>}
      {!isPending && !project && (
        <h1 className="h2 text-center pt-3">Failed to fetch data</h1>
      )}
      {Object.keys(project).length && (
        <Row className="align-items-center gy-2">
          <Col xs={12} lg={6}>
            <Details {...project} />
          </Col>
          <Col xs={12} lg={6}>
            <Comments {...project} />
          </Col>
        </Row>
      )}
      <EditForm
        project={project}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </Container>
  );
};

export default ProjectDetails;
