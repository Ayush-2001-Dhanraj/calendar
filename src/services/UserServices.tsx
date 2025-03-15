import apiRequest from "../utils/apiRequest";

const UserService = {
  getCurrentUser: async (userID: string) =>
    await apiRequest("GET", `/user/${userID}`),
  updateUser: async (userID: string, data: any) =>
    await apiRequest("PUT", `/user/${userID}`, data),
  deleteUser: async (userID: string) =>
    await apiRequest("DELETE", `/user/${userID}`),
  createEvent: async (userID: string, data: any) =>
    await apiRequest("POST", `/user/${userID}`, data),
  getAllEvents: async (userID: string) =>
    await apiRequest("GET", `/user/${userID}/events`),
  getEvent: async (eventID: string) =>
    await apiRequest("GET", `/event/${eventID}`),
  deleteEvent: async (eventID: string) =>
    await apiRequest("DELETE", `/event/${eventID}`),
  updateEvent: async (eventID: string, data: any) =>
    await apiRequest("PUT", `/event/${eventID}`, data),
};

export default UserService;
