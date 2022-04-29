const reducer = (state, action) => {
  switch (action.type) {
    case "GET_USER":
      return { ...state, user: action.payload };
    case "GET_FOLLOWERS":
      return { ...state, followers: action.payload };
    case "GET_FOLLOWING":
      return { ...state, following: action.payload };
    default:
      throw new Error(`there is no such action ${action.type}`);
  }
};

export default reducer;
