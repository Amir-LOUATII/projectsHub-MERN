import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useAuthContext } from "../../context/authContext";

import Likes from "./Likes";
import CommentsForm from "./CommentsForm";
import SingleComment from "./SingleComment";
import classes from "./Comments.module.css";
import UseHttp from "../../hooks/useHttp.";
import { useProjectContext } from "../../context/projectContext";

const Comments = (props) => {
  const { user } = useAuthContext();
  const { comments, getSingleProjectComments, project } = useProjectContext();
  const { _id } = props;
  const { isPending, error, success, sendRequest } = UseHttp();

  useEffect(() => {
    if (_id) {
      sendRequest({ url: `/api/v1/projects/${_id}/comments` }, (data) => {
        getSingleProjectComments(data.comments);
      });
    }
  }, []);
  return (
    <Card>
      <Card.Header>
        <Likes id={_id} />
      </Card.Header>
      <Card.Body className={classes.comments}>
        {!comments.length && !isPending && (
          <span className="h4 text-muted">No comments yet.</span>
        )}
        {comments.length > 0 &&
          comments.map((comment) => {
            return (
              <SingleComment
                key={comment._id}
                {...comment}
                projectId={project._id}
              />
            );
          })}
      </Card.Body>
      <Card.Footer>
        <CommentsForm projectId={project._id} />
      </Card.Footer>
    </Card>
  );
};

export default Comments;
