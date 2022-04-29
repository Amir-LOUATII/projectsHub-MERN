import React, { useContext, useEffect, useReducer } from "react";
import UseHttp from "../hooks/useHttp.";
import reducer from "../reducers/usersReducer";
const UsersContext = React.createContext();

const intialState = {
  searchTerm: "",
  users: [],
  filteredUsers: [],
};

const UsersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialState);
  const { sendRequest: getUsers, error, isPending, success } = UseHttp();

  useEffect(() => {
    dispatch({ type: "SEARCH_USER" });
  }, [state.searchTerm, state.users]);

  const getAllUsers = () => {
    getUsers({ url: "/api/v1/users" }, (data) => {
      dispatch({ type: "GET_ALL_USERS", payload: data.users });
    });
  };

  const updateSearchTerm = (search) => {
    dispatch({ type: "UPDATE_FILTER", payload: search });
  };
  return (
    <UsersContext.Provider
      value={{
        ...state,
        getAllUsers,
        isPending,
        success,
        error,
        updateSearchTerm,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

const useUsersContext = () => {
  return useContext(UsersContext);
};

export { UsersContextProvider, useUsersContext };
