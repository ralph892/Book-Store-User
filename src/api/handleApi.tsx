import { IBook, IUser } from "@/interfaces/customInterface";
import axios from "axios";
import Cookies from "js-cookie";
import { handleRefreshToken } from "./handleAuth";

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

export const handlePurchase = async (
  products: IBook[],
  buyQuantities: number[]
) => {
  try {
    await handleRefreshToken();
    const result = await instance.post(
      "/carts",
      {
        cart_id: `CR${Date.now()}`,
        user_id: "",
        date: new Date(Date.now()),
        buyQuantities,
        products,
      },
      {
        headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
      }
    );
    if (result.data.error) {
      throw new Error(result.data.error);
    }
    return { response: result };
  } catch (error: any) {
    return { errors: error.message };
  }
};

// fetch country
export const handleGetCurrentCountry = async () => {
  try {
    const request = await fetch("https://ipinfo.io/json?token=128d018f249599");
    const jsonResponse = await request.json();
    return jsonResponse;
  } catch (error) {
    console.log(error);
  }
};
