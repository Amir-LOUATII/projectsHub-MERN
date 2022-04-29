import React from "react";
import { Modal, Button } from "react-bootstrap";
import classes from "./DeleteMsg.module.css";
const DeleteMsg = (props) => {
  const deleteClickHandler = () => {
    props.deleteProject();
    props.onHide();
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-center">
          Do you really want to delete {props.projectname}?
        </Modal.Title>
      </Modal.Header>

      <Modal.Footer>
        <Button onClick={props.onHide} className={classes["close-btn"]}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            deleteClickHandler();
          }}
          className={classes.btn}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteMsg;
