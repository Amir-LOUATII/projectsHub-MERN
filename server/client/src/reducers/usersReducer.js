const reducer = (state, action) => {
  switch (action.type) {
    case "GET_ALL_USERS":
      return { ...state, users: action.payload };
    case "UPDATE_FILTER":
      return { ...state, searchTerm: action.payload };
    case "SEARCH_USER":
      let tempUsers = [...state.users];

      if (state.searchTerm) {
        tempUsers = tempUsers.filter((user) => {
          return user.name
            .toLowerCase()
            .includes(state.searchTerm.toLowerCase());
        });
      }
      return { ...state, filteredUsers: tempUsers };
    default:
      throw new Error(`there is no such action,please check`);
  }
};

export default reducer;
