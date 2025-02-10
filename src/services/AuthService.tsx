import apiRequest from "../utils/apiRequest";

const AuthService = {
  login: async (data: any) => await apiRequest("POST", "/auth/login", data),
  register: async (data: any) =>
    await apiRequest("POST", "/auth/register", data),
  logout: async () => {},
};

export default AuthService;
