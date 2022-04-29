import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/authReducer";

const AuthContext = React.createContext();

const intialState = { user: null, authIsReady: false };

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialState);
  useEffect(() => {
    const user = window.localStorage.getItem("user");

    if (user) {
      dispatch({ type: "AUTH_IS_READY", payload: JSON.parse(user) });
    } else {
      dispatch({ type: "AUTH_IS_READY", payload: null });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};
export { useAuthContext, AuthContextProvider };
