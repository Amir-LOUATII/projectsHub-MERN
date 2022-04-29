import React, { useEffect, useState } from "react";
import Project from "../components/Home/Project";
import { Col, Container, Row, ButtonGroup, Button } from "react-bootstrap";
import { useAuthContext } from "../context/authContext";
import { useProjectsContext } from "../context/projectsContext";

import classes from "./Home.module.css";
import Loading from "../UI/Loading";

const Home = () => {
  const { user } = useAuthContext();
  const {
    projects,
    tags,
    technologies,
    updateTags,
    filteredProjects,
    updateFilter,
    filter,
    success,
    isPending,
    getProjects,
  } = useProjectsContext();

  useEffect(() => {
    getProjects();
    return () => {
      updateTags([]);
    };
  }, []);
  const checkHandler = (e) => {
    const value = e.target.value;
    if (tags.includes(value)) {
      const newState = tags.filter((item) => item !== value);
      updateTags(newState);
    }
    if (!tags.includes(value)) {
      const newState = [...tags, value];
      updateTags(newState);
    }
  };
  if (isPending) {
    return <Loading />;
  }
  return (
    <section className="h-100 container-lg">
      <h1 className="text-center pt-3 ">Projects</h1>
      <div className="d-flex justify-content-center align-items-center">
        {user && (
          <ButtonGroup size="sm" className="mt-1 d-block mx-auto">
            <Button
              key={1}
              className={
                filter == "all"
                  ? `${classes.btn} ${classes.active}`
                  : classes.btn
              }
              data-filter="all"
              onClick={(e) => updateFilter(e.target.dataset.filter)}
            >
              All
            </Button>
            <Button
              key={2}
              data-filter="mine"
              onClick={(e) => updateFilter(e.target.dataset.filter)}
              className={
                filter === "mine"
                  ? `${classes.btn} ${classes.active}`
                  : classes.btn
              }
            >
              mine
            </Button>
          </ButtonGroup>
        )}
      </div>
      <div className="pt-3">
        {technologies && (
          <>
            <span className="h5 mb-2 d-block">Filter:</span>
            <div className="d-flex flex-wrap">
              {technologies.map((tec, index) => {
                return (
                  <div className="form-check me-3  " key={index}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={tec}
                      id={tec}
                      onChange={checkHandler}
                    />
                    <label className="form-check-label" htmlFor={tec}>
                      {tec}
                    </label>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
      <Container className="pt-3 px-0 pb-3">
        <Row className="justify-content-start gy-4">
          {!filteredProjects.length && success && (
            <h1 className="h2  text-muted text-center">
              No project matched you search.
            </h1>
          )}
          {projects &&
            filteredProjects.map((project, index) => {
              return (
                <Col
                  xs={12}
                  md={user ? 12 : 6}
                  lg={user ? 6 : 4}
                  xl={user ? 6 : 4}
                  key={index}
                >
                  <Project {...project} projects={projects} />
                </Col>
              );
            })}
        </Row>
      </Container>
    </section>
  );
};

export default Home;
