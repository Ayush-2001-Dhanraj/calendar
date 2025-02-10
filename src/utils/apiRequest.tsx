import axios from "axios";
import { BASE_URL } from "./constants";

const apiRequest = async (method: string, url: string, data = {}) => {
  try {
    const config = {
      method: method,
      url: `${BASE_URL}${url}`,
      data: data,
      withCredentials: true,
    };

    const response = await axios(config);
    return response.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
};

export default apiRequest;
