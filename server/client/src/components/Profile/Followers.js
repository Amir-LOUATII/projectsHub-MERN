import React, { useState } from "react";
import classes from "../../pages/Profile.module.css";
import { Container, Card, Row, Col } from "react-bootstrap";
import ListOfFollowers from "./ListOfFollowers";
import ListOfFollowing from "./ListOfFollowing";
import { useSingleUserContext } from "../../context/singleUserContext";

const Followers = () => {
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const { followers, user, followersSuccess, following, followingSuccess } =
    useSingleUserContext();

  const followingClickHandler = () => {
    if (following.length > 0) {
      setShowFollowing(true);
    }
  };
  const followersClickHandler = () => {
    if (followers.length > 0) {
      setShowFollowers(true);
    }
  };

  return (
    <Container className="mt-5">
      {
        <>
          <Row className="gy-4 justify-content-center">
            {
              <Col sm={4} md={6} className="align-items-center ">
                <Card className={classes.box}>
                  <Card.Body className="h1 d-flex justify-content-center align-items-center">
                    <div
                      className="w-100 text-center"
                      onClick={followersClickHandler}
                    >
                      {followersSuccess && followers.length}
                      <span className="h5 d-block text-nowrap">
                        Follower(s)
                      </span>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            }
            {followingSuccess && (
              <Col sm={4} md={6}>
                <Card className={classes.box} onClick={followingClickHandler}>
                  <Card.Body className="h1 d-flex justify-content-center align-items-center">
                    <div className="w-100 text-center">
                      {following.length}
                      <span className="h5 d-block">Following</span>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            )}
            <Col sm={4} md={6}>
              <Card className={`${classes.box} ${classes.last}`}>
                <Card.Body className="h1 d-flex justify-content-center align-items-center">
                  <div className="w-100 text-center">
                    {user.numberOfProjects}
                    <span className="h6 d-block">Submitted project(s)</span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <ListOfFollowers
            show={showFollowers}
            onHide={() => setShowFollowers(false)}
            followers={followers}
          />
        </>
      }
      <ListOfFollowing
        show={showFollowing}
        onHide={() => setShowFollowing(false)}
      />
    </Container>
  );
};

export default Followers;
