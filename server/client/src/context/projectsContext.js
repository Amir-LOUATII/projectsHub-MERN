import React, { useContext, useEffect, useReducer } from "react";
import UseHttp from "../hooks/useHttp.";
import { useAuthContext } from "./authContext";
import reducer from "../reducers/projectsReducer";
const ProjectsContext = React.createContext();

const initialState = {
  filter: "all",
  tags: [],
  projects: [],
  filteredProjects: [],
  technologies: [],
};

const ProjectsContextProvider = (props) => {
  const { user } = useAuthContext();
  const { success, error, sendRequest: getAllProjects, isPending } = UseHttp();
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    getProjects();
  }, []);

  useEffect(() => {
    dispatch({ type: "UPDATE_PROJECTS", payload: user });
  }, [state.tags, state.filter, state.projects, user]);

  const updateTags = (tags) => {
    dispatch({ type: "UPDATE_TAGS", payload: tags });
  };

  const updateFilter = (filter) => {
    dispatch({ type: "UPDATE_FILTER", payload: filter });
  };
  const getProjects = () => {
    getAllProjects({ url: "/api/v1/projects" }, (data) => {
      dispatch({ type: "GET_ALL_PROJECTS", payload: data.projects });
    });
  };
  return (
    <ProjectsContext.Provider
      value={{
        ...state,
        updateTags,
        updateFilter,
        success,
        isPending,
        error,
        getProjects,
      }}
    >
      {props.children}
    </ProjectsContext.Provider>
  );
};

const useProjectsContext = () => {
  return useContext(ProjectsContext);
};

export { useProjectsContext, ProjectsContextProvider };
