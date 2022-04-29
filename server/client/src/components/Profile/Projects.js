import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import classes from "../../pages/Profile.module.css";
import Project from "../Home/Project";
const Projects = ({ projects, success }) => {
  return (
    <>
      <h1 className="h1 text-center  pt-3 text-muted">
        Projects ({projects.length})
      </h1>
      <div className={`${classes.underline} mx-auto`}></div>
      <Container className="pt-2">
        <Row className="pt-3 gy-4">
          {!projects.length && success && (
            <h1 className="h2 text-center">No submitted projects.</h1>
          )}
          {projects &&
            projects.map((project, index) => {
              return (
                <Col xs={12} md={12} lg={6} key={index}>
                  <Project {...project} />
                </Col>
              );
            })}
        </Row>
      </Container>
    </>
  );
};

export default Projects;
