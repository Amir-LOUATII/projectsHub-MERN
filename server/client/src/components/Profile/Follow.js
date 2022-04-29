import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../context/authContext";
import { useSingleUserContext } from "../../context/singleUserContext";
import UseHttp from "../../hooks/useHttp.";
import { Button } from "react-bootstrap";

import classes from "../../pages/Profile.module.css";

function Follow({ _id }) {
  const { sendRequest, success } = UseHttp();
  const { followersSuccess, followers, getSingleUserFollowers } =
    useSingleUserContext();
  const [followed, setFollowed] = useState(true);
  const { user: loggedInUser } = useAuthContext();
  const {
    sendRequest: follow,
    success: followSuccess,
    isPending: followIsPending,
  } = UseHttp();
  const {
    sendRequest: unfollow,
    success: unfollowSuccess,
    isPending: unfollowIsPending,
  } = UseHttp();

  // check if the user is followed
  useEffect(() => {
    const fol = followers.find(
      (follower) => follower.follower._id === loggedInUser.id
    );

    if (fol) {
      setFollowed(true);
    } else {
      setFollowed(false);
    }
  }, [followers]);

  useEffect(() => {
    if (followSuccess || unfollowSuccess) {
      getSingleUserFollowers(_id);
    }
  }, [followSuccess, unfollowSuccess, _id]);

  // send follow request
  const followClickHandler = async () => {
    try {
      follow(
        {
          url: `/api/v1/followers/`,
          method: "POST",
          data: { followeeId: _id },
        },
        (data) => {
          return;
        }
      );
    } catch (error) {
      throw new Error("some thing went wrong can't fowwol the user");
    }
  };
  const unfollowClickHandler = async () => {
    try {
      unfollow(
        {
          url: `/api/v1/followers/unfollow`,
          method: "DELETE",
          data: { followeeId: _id },
        },
        (data) => {
          return;
        }
      );
    } catch (error) {
      throw new Error("some thing went wrong can't fowwol the user");
    }
  };
  return (
    <>
      {loggedInUser && loggedInUser.id !== _id && (
        <>
          {
            <>
              {followed ? (
                <Button
                  className={`${classes.btn} d-block mx-auto my-3 w-75`}
                  onClick={unfollowClickHandler}
                >
                  Unfollow
                </Button>
              ) : (
                <Button
                  className={`${classes.btn} d-block mx-auto my-3 w-75`}
                  onClick={followClickHandler}
                >
                  Follow
                </Button>
              )}{" "}
            </>
          }
        </>
      )}
    </>
  );
}

export default Follow;
