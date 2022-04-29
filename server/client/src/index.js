import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/authContext";
import { ProjectContextProvider } from "./context/projectContext";
import { ProjectsContextProvider } from "./context/projectsContext";
import { SingleUserContextProvider } from "./context/singleUserContext";
import { UsersContextProvider } from "./context/usersContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProjectsContextProvider>
        <ProjectContextProvider>
          <SingleUserContextProvider>
            <UsersContextProvider>
              <App />
            </UsersContextProvider>
          </SingleUserContextProvider>
        </ProjectContextProvider>
      </ProjectsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
