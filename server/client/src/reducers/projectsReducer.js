const reducer = (state, action) => {
  switch (action.type) {
    case "GET_ALL_PROJECTS":
      let technologies = action.payload.reduce((accu, curr) => {
        accu.push(...curr.tags);
        return accu;
      }, []);
      technologies = [...new Set(technologies)];
      return { ...state, projects: action.payload, technologies };
    case "UPDATE_TAGS":
      return { ...state, tags: action.payload };
    case "UPDATE_FILTER":
      return { ...state, filter: action.payload };
    case "UPDATE_PROJECTS":
      let tempProjects = [...state.projects];
      if (state.filter === "mine") {
        tempProjects = tempProjects.filter(
          (project) => project.createdBy._id === action.payload.id
        );
      }
      if (state.filter === "all") {
        tempProjects = [...state.projects];
      }
      if (state.tags.length && state.filter === "all") {
        tempProjects = state.projects.filter((project) => {
          return state.tags.every((tag) => project.tags.includes(tag));
        });
      }

      if (state.tags.length && state.filter === "mine") {
        tempProjects = tempProjects
          .filter((project) => {
            return state.tags.every((tag) => project.tags.includes(tag));
          })
          .filter((project) => {
            return state.tags.every((tag) => project.tags.includes(tag));
          });
      }
      return { ...state, filteredProjects: tempProjects };
    default:
      throw new Error(`there is no such action: ${action.type}`);
  }
};

export default reducer;
