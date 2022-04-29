import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Followers from "../components/Profile/Followers";
import Infos from "../components/Profile/Infos";
import Projects from "../components/Profile/Projects";
import { useSingleUserContext } from "../context/singleUserContext";
import UseHttp from "../hooks/useHttp.";
import Loading from "../UI/Loading";

import classes from "./Profile.module.css";

const Profile = () => {
  const { id } = useParams();
  const {
    getSingleUser,
    user,
    getSingleUserFollowers,
    userSuccess,
    getSingleUserFollowing,
    userIsPending,
  } = useSingleUserContext();
  useEffect(() => {
    getSingleUser(id);
  }, [id]);

  useEffect(() => {
    getSingleUserFollowers(id);
    getSingleUserFollowing(id);
  }, [id]);
  if (userIsPending) {
    return <Loading />;
  }
  return (
    <section className="pt-5 w-100">
      <Container>
        {userSuccess && (
          <>
            <Row className="justify-content-between ">
              <Col sm={12} md={12} lg={4}>
                <Infos {...user} success={userSuccess} />
              </Col>
              <Col sm={12} md={12} lg={8}>
                <Followers />
              </Col>
              <Projects projects={user.projects} succes={userSuccess} />
            </Row>
          </>
        )}
      </Container>
    </section>
  );
};

export default Profile;
