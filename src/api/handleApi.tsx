import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
});

// books
export const handleGetBooks = async (key?: "category", data?: string) => {
  try {
    if (key) {
      const result = await instance.get(`/books?${key}=${data}`);
      return { response: result.data };
    }
  } catch (error) {
    console.log(error);
  }
};
