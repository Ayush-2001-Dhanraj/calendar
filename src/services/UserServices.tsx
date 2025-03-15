import apiRequest from "../utils/apiRequest";

const UserService = {
  getCurrentUser: async (userID: string) =>
    await apiRequest("GET", `/user/${userID}`),
  updateUser: async (data: any) => await apiRequest("PUT", `/user`, data),
  deleteUser: async (userID: string) =>
    await apiRequest("DELETE", `/user/${userID}`),
  createEvent: async (data: any) => await apiRequest("POST", `/user`, data),
  getAllEvents: async (userID: string) =>
    await apiRequest("GET", `/user/${userID}/events`),
  getEvent: async (userID: string, eventID: string) =>
    await apiRequest("GET", `/event/${userID}/${eventID}`),
  deleteEvent: async (userID: string, eventID: string) =>
    await apiRequest("DELETE", `/event/${userID}/${eventID}`),
  updateEvent: async (eventID: string, data: any) =>
    await apiRequest("PUT", `/event/${eventID}`, data),
};

export default UserService;
