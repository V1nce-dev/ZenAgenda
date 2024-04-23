import axios from "axios";

const useTask = () => {
  const getToken = () => {
    const authToken = localStorage.getItem("token");
    return authToken;
  };

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
      "Content-Type": "application/json",
    },
  });

  axiosInstance.interceptors.request.use((config) => {
    const authToken = getToken();
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
  });

  const fetchTask = async () => {
    try {
      const response = await axiosInstance.get("/task");

      return response;
    } catch (error) {
      return null;
    }
  };

  const createTask = async (task: string) => {
    try {
      const response = await axiosInstance.post("/create", { task });
      return response;
    } catch (error) {
      return null;
    }
  };

  const deleteTask = async () => {
    try {
      const response = await axiosInstance.delete("/delete");
      return response;
    } catch (error) {
      return null;
    }
  };
  return { fetchTask, createTask, deleteTask };
};

export default useTask;
