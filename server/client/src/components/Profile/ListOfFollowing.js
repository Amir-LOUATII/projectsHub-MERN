import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSingleUserContext } from "../../context/singleUserContext";
import classes from "./ListOfFollowers.module.css";

const ListOfFollowing = (props) => {
  const { following, followingSuccess } = useSingleUserContext();
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {followingSuccess && (
        <>
          {" "}
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Followers:
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {following.length > 0 &&
              following.map((follow) => {
                const { followee: person } = follow;
                return (
                  <article
                    className="my-2 d-flex align-items-center"
                    key={person._id}
                  >
                    <Link
                      to={`/userprofile/${person._id}`}
                      className="text-decoration-none"
                      onClick={props.onHide}
                    >
                      <img
                        src={person.image}
                        alt={person.name}
                        className={classes["comment-img"]}
                      />
                      <span
                        className={`${classes.link} text-dark h5 d-inline-block ms-1`}
                      >
                        {person.name}
                      </span>
                    </Link>
                  </article>
                );
              })}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide} className={classes["close-btn"]}>
              Close
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};

export default ListOfFollowing;
