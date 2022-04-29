import React, { useEffect } from "react";
import { useAuthContext } from "../../context/authContext";
import { useSingleUserContext } from "../../context/singleUserContext";
import UseHttp from "../../hooks/useHttp.";
import { AiFillCamera } from "react-icons/ai";
import classes from "../../pages/Profile.module.css";

function ProfileImage() {
  const {
    user: { image, name, createdAt, _id, job },
    userSuccess: success,
    followersSuccess,
    followers,
  } = useSingleUserContext();
  const { user: loggedInUser, dispatch } = useAuthContext();
  const {
    isPending: changePhotoLoading,
    error: changePhotoError,
    success: changePhotoSuccess,
    sendRequest: changeProfilePhoto,
  } = UseHttp();

  const fileChangeHandler = async (e) => {
    // getting image file
    const imageFile = e.target.files[0];
    const formData = new FormData();
    formData.append("image", imageFile);
    changeProfilePhoto(
      {
        url: "/api/v1/users/uploadProfile",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      },
      (data) => {
        dispatch({ type: "UPDATE_USER", payload: data });
        return;
      }
    );
  };

  useEffect(() => {
    if (changePhotoSuccess) {
      window.location.reload();
    }
  }, [changePhotoSuccess]);
  return (
    <div className="d-flex justify-content-center align-items-center position-relative">
      <div className="position-relative">
        <img src={image} alt={name} className={`${classes.img} shadow`} />
        {loggedInUser && _id === loggedInUser.id && (
          <>
            <input
              type="file"
              className={classes.file}
              title=""
              onChange={fileChangeHandler}
            />
            <div className={classes["changePhotoIcon"]}>
              <AiFillCamera />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfileImage;
