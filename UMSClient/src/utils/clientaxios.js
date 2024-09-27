import axios from "axios";
import { store } from "../redux/store"; 
import { signoutSuccess } from "../redux/user/userSlice"; 

const clientAxiosInstance = axios.create({
  baseURL: "/api/", 
  withCredentials: true, 
});

clientAxiosInstance.interceptors.response.use(
  (response) => response, 
  (error) => {
   
    if (error.response && error.response.status === 401) {
     
      store.dispatch(signoutSuccess());
     
      window.location.href = "/signin"; 
    }
    return Promise.reject(error);
  }
);

export default clientAxiosInstance;
