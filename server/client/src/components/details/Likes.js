import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../context/authContext";
import { AiOutlineHeart } from "react-icons/ai";
import { AiTwotoneHeart } from "react-icons/ai";

import classes from "./Comments.module.css";
import LikedUser from "./LikedUser";
import { useProjectContext } from "../../context/projectContext";
import UseHttp from "../../hooks/useHttp.";
import { Link } from "react-router-dom";
const Likes = ({ id }) => {
  const [liked, setLiked] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const { user } = useAuthContext();
  const { likes, getSingleProjectLikes } = useProjectContext();
  const { sendRequest: getProjectLikes, isPending } = UseHttp();

  const {
    isPending: likePending,
    error: likeError,
    success: likeSucess,
    sendRequest: like,
  } = UseHttp();
  const {
    isPending: unLikePending,
    error: unLikeError,
    success: unLikeSucess,
    sendRequest: unlike,
  } = UseHttp();

  async function unLikeClickHandler(e) {
    unlike(
      {
        url: `/api/v1/likes`,
        data: { project: id, createdBy: user.id },
        method: "DELETE",
      },
      (data) => {
        return;
      }
    );
  }

  useEffect(() => {
    if (likeSucess && !liked) {
      setLiked(true);
    }
    if (unLikeSucess && liked) {
      setLiked(false);
    }
    getProjectLikes({ url: `/api/v1/projects/${id}/likes` }, (data) => {
      getSingleProjectLikes(data.likes);
    });
  }, [likeSucess, unLikeSucess]);

  async function likeClickHandler(e) {
    like(
      {
        url: `/api/v1/likes`,
        data: { project: id, createdBy: user.id },
        method: "POST",
      },
      (data) => {
        return;
      }
    );
    setLiked(true);
  }

  useEffect(() => {
    if (likes.find((item) => item.createdBy._id === user.id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [likes]);
  return (
    <>
      <header>
        <div className="d-inline-block ">
          {!liked ? (
            <span onClick={likeClickHandler}>
              <AiOutlineHeart className={classes.heart} />{" "}
              {likes.length ? "like, " : "like"}
            </span>
          ) : (
            <span onClick={unLikeClickHandler}>
              <AiTwotoneHeart className={`${classes["fill-heart"]} me-2`} />
            </span>
          )}
        </div>
        {likes.length == 1 && !liked && (
          <Link
            to={`/userprofile/${likes[0].createdBy._id}`}
            className="ms-2 text-dark text-decoration-none"
          >
            {" "}
            Liked by
            <span className="ms-1 text-decoration-underline">
              {likes[0].createdBy.name}
            </span>
          </Link>
        )}
        {(likePending || unLikePending || isPending) && <span></span>}
        {likes.length == 1 && liked && <span className="ms-0"> liked </span>}
        {liked.length > 1 && !liked && (
          <span className="ms-2">
            Liked by {likes[0].name} and{" "}
            <span
              onClick={() => setModalShow(true)}
              className={`${classes.other} text-muted text-decoration-underline ms-2`}
            >
              {likes.length - 1} other(s) person(s)
            </span>
          </span>
        )}
        {likes.length > 1 && liked && (
          <span className="ms-2">
            Liked by you and
            <span
              onClick={() => setModalShow(true)}
              className={`${classes.other} text-muted text-decoration-underline ms-2`}
            >
              {likes.length - 1} other(s) person(s)
            </span>
          </span>
        )}
      </header>
      <LikedUser
        show={modalShow}
        onHide={() => setModalShow(false)}
        likes={likes}
      />
    </>
  );
};

export default Likes;
