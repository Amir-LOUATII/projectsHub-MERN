import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useAuthContext } from "../../context/authContext";
import { useProjectContext } from "../../context/projectContext";
import UseHttp from "../../hooks/useHttp.";

import classes from "./Comments.module.css";

const CommentsForm = ({ projectId, _id }) => {
  const [comment, setComment] = useState("");
  const { user: loggedInUser } = useAuthContext();
  const { getSingleProjectComments } = useProjectContext();
  const { isPending, success, error, sendRequest: addComment } = UseHttp();
  const {
    isPending: isloadingComments,
    success: gettingCommentsSuccess,
    error: gettingCommentsError,
    sendRequest: getComments,
  } = UseHttp();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (comment) {
      addComment(
        {
          url: "/api/v1/comments",
          data: {
            createdBy: loggedInUser.id,
            project: projectId,
            text: comment,
          },
          method: "POST",
        },
        (data) => {
          return;
        }
      );
      setComment("");
    }
  };

  useEffect(() => {
    if (success) {
      getComments({ url: `/api/v1/projects/${projectId}/comments` }, (data) => {
        getSingleProjectComments(data.comments);
        return;
      });
    }
  }, [success]);
  return (
    <Form className="d-flex align-items-center" onSubmit={submitHandler}>
      <Form.Group>
        <Form.Control
          placeholder="Write a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </Form.Group>
      <Button
        type="submit"
        className={`${classes.btn} d-block  my-3 btn w-auto `}
      >
        Add
      </Button>
    </Form>
  );
};

export default CommentsForm;
