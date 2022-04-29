const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      window.localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, user: action.payload };
    case "UPDATE_USER":
      window.localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, user: action.payload };
    case "AUTH_IS_READY":
      return { ...state, user: action.payload, authIsReady: true };
    case "LOGOUT":
      window.localStorage.setItem("user", null);
      return { ...state, user: null };
    default:
      throw new Error(`There no such such action ${action.type},please check`);
  }
};

export default reducer;
