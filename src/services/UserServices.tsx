import apiRequest from "../utils/apiRequest";

const UserService = {
  getUser: async (userID: string) => await apiRequest("GET", `/user/${userID}`),
};

export default UserService;
