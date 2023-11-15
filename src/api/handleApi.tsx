import { IUser } from "@/interfaces/customInterface";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
});

// users
export const handleCreateUser = async (data: IUser) => {
  try {
    const result = await instance.post(`/users`, data);
    return { response: result.data };
  } catch (error: any) {
    return { errors: error.response.data };
  }
};

// categories
export const handleGetCategories = async () => {
  try {
    const result = await instance.get("/categories");
    return { response: result.data };
  } catch (error: any) {
    return { errors: error.response.data };
  }
};

// books
export const handleGetBooks = async (
  key?: "category",
  data?: string,
  limit?: number
) => {
  try {
    if (key && !limit) {
      const result = await instance.get(`/books?${key}=${data}`);
      return { response: result.data };
    } else if (limit && key) {
      const result = await instance.get(`/books?${key}=${data}&limit=${limit}`);
      return { response: result.data };
    } else {
      const result = await instance.get("/books");
      return { response: result.data };
    }
  } catch (error) {
    console.log(error);
  }
};

export const handleGetBook = async (id?: string) => {
  try {
    const result = await instance.get(`books/${id}`);
    return { response: result.data };
  } catch (error: any) {
    return { errors: error.response.data };
  }
};

export const handleGetNewRelease = async (limit?: number) => {
  try {
    if (limit) {
      const result = await instance.get(`/books/new?limit=${limit}`);
      return { response: result.data };
    } else {
      const result = await instance.get(`/books/new`);
      return { response: result.data };
    }
  } catch (error) {
    console.log(error);
  }
};
