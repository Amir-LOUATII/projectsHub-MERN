import React, { useContext, useReducer } from "react";
import projectReducer from "../reducers/projectReducer";
const ProjectContext = React.createContext();

const intialProjectState = {
  project: {},
  comments: [],
  likes: [],
};

const ProjectContextProvider = (props) => {
  const [state, dispatch] = useReducer(projectReducer, intialProjectState);

  const getSingleProject = (project) => {
    dispatch({ type: "GET_PROJECT", payload: project });
  };

  const getSingleProjectComments = (comments) => {
    dispatch({ type: "GET_COMMENTS", payload: comments });
  };
  const getSingleProjectLikes = (likes) => {
    dispatch({ type: "GET_LIKES", payload: likes });
  };
  return (
    <ProjectContext.Provider
      value={{
        ...state,
        dispatch,
        getSingleProject,
        getSingleProjectComments,
        getSingleProjectLikes,
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

const useProjectContext = () => {
  return useContext(ProjectContext);
};

export { useProjectContext, ProjectContextProvider };
