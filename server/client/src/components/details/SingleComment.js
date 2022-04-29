import { formatDistanceToNow } from "date-fns/esm";
import React, { useEffect } from "react";
import classes from "./Comments.module.css";
import { FaTrash } from "react-icons/fa";
import { useAuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";
import UseHttp from "../../hooks/useHttp.";
import { useProjectContext } from "../../context/projectContext";

const SingleComment = ({ createdBy, createdAt, _id, text, projectId }) => {
  const { user } = useAuthContext();
  const { getSingleProjectComments } = useProjectContext();
  const { sendRequest: deleteComment, success } = UseHttp();
  const { sendRequest: getComments } = UseHttp();
  const deleteClickHandler = async () => {
    deleteComment(
      { url: `/api/v1/comments/${_id}`, method: "DELETE" },
      (data) => {
        return;
      }
    );
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
    <article
      className={`${classes.comment} shadow-sm border p-2 mb-2 d-flex algin-items-center justify-content-start`}
    >
      <Link to={`/userprofile/${createdBy.id}`}>
        <img
          src={createdBy.image}
          alt={createdBy.name}
          className={classes["comment-img"]}
        />
      </Link>
      <div className="ms-3 bg-light w-100">
        <div className="d-flex justify-content-between ">
          <Link
            to={`/userprofile/${createdBy._id}`}
            className=" text-decoration-none"
          >
            <p className={`${classes.link}  text-dark h6`}>{createdBy.name}</p>
          </Link>
          <small className="ms-1 text-muted">
            {formatDistanceToNow(new Date(createdAt), {
              addSuffix: true,
            })}
          </small>
          {user && createdBy._id === user.id && (
            <div className={classes.icons}>
              <span className=" ms-auto" onClick={deleteClickHandler}>
                <FaTrash className=" text-muted " />
              </span>
            </div>
          )}
        </div>
        <p className="p-1">{text}</p>
      </div>
    </article>
  );
};

export default SingleComment;
