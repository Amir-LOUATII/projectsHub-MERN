import React from "react";
import { Modal, Button } from "react-bootstrap";
import classes from "./Comments.module.css";
import { Link } from "react-router-dom";

const LikedUser = (props) => {
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Person who liked this project:
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.likes.length > 0 &&
            props.likes.map((like) => {
              return (
                <article
                  className="my-2 d-flex align-items-center"
                  key={like._id}
                >
                  <Link
                    to={`/userprofile/${like.createdBy._id}`}
                    className="text-decoration-none"
                  >
                    <img
                      src={like.createdBy.image}
                      alt={like.createdBy.name}
                      className={classes["comment-img"]}
                    />
                    <span
                      className={`${classes.link} text-dark h5 d-inline-block ms-1`}
                    >
                      {like.createdBy.name}
                    </span>
                  </Link>
                </article>
              );
            })}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} className={classes.btn}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LikedUser;
