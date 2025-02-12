import apiRequest from "../utils/apiRequest";

const UserService = {
  getUser: async (userID: string) => await apiRequest("GET", `/user/${userID}`),
  getCurrentUser: async () => await apiRequest("GET", "/user"),
};

export default UserService;
