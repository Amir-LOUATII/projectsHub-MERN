import React, { useContext, useReducer } from "react";
import UseHttp from "../hooks/useHttp.";
import reducer from "../reducers/singleUserReducer";
const SingleUserContext = React.createContext();

const intialState = { user: {}, followers: [], following: [] };

const SingleUserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialState);
  const { sendRequest: getFollowers, success: followersSuccess } = UseHttp();
  const { sendRequest: getFollowing, success: followingSuccess } = UseHttp();
  const {
    sendRequest: getUser,
    success: userSuccess,
    isPending: userIsPending,
  } = UseHttp();

  const getSingleUser = (id) => {
    getUser({ url: `/api/v1/users/${id}` }, (data) => {
      dispatch({ type: "GET_USER", payload: data.user });
    });
  };

  const getSingleUserFollowers = (id) => {
    getFollowers({ url: `/api/v1/users/${id}/followers` }, (data) => {
      dispatch({ type: "GET_FOLLOWERS", payload: data.followers });
    });
  };
  const getSingleUserFollowing = (id) => {
    getFollowing({ url: `/api/v1/users/${id}/following` }, (data) => {
      dispatch({ type: "GET_FOLLOWING", payload: data.following });
    });
  };

  return (
    <SingleUserContext.Provider
      value={{
        ...state,
        getSingleUser,
        getSingleUserFollowers,
        userSuccess,
        followersSuccess,
        getSingleUserFollowing,
        followingSuccess,
        userIsPending,
      }}
    >
      {children}
    </SingleUserContext.Provider>
  );
};

const useSingleUserContext = () => {
  return useContext(SingleUserContext);
};

export { useSingleUserContext, SingleUserContextProvider };
