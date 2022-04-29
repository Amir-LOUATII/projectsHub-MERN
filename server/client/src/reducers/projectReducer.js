const projectReducer = (state, action) => {
  switch (action.type) {
    case "GET_PROJECT":
      return { ...state, project: action.payload };
    case "GET_COMMENTS":
      return { ...state, comments: action.payload };
    case "GET_LIKES":
      return { ...state, likes: action.payload };
    default:
      throw new Error(`the is no such action"${action.type}, please check"`);
  }
};

export default projectReducer;
