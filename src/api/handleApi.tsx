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
    const response = await instance.post(`/users`, data);
    return { response: response.data };
  } catch (error: any) {
    return { errors: error.response.data };
  }
};

export const handleUpdateUser = async (
  id: string,
  data: {
    firstName: string;
    lastName: String;
    address: string;
  }
) => {
  try {
    await handleRefreshToken();
    const response = await instance.patch(`/users/specified/${id}`, data, {
      headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
    });
    if (response.data.error) throw new Error(response.data.error);
    return { response: response.data };
  } catch (error: any) {
    return { error: error.message };
  }
};

// categories
export const handleGetCategories = async () => {
  try {
    const response = await instance.get("/categories");
    return { response: response.data };
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
      const response = await instance.get(`/books?${key}=${data}`);
      return { response: response.data };
    } else if (limit && key) {
      const response = await instance.get(
        `/books?${key}=${data}&limit=${limit}`
      );
      return { response: response.data };
    } else {
      const response = await instance.get("/books");
      return { response: response.data };
    }
  } catch (error) {
    console.log(error);
  }
};

export const handleGetBook = async (id?: string) => {
  try {
    const response = await instance.get(`books/${id}`);
    return { response: response.data };
  } catch (error: any) {
    return { errors: error.response.data };
  }
};

export const handleGetNewRelease = async (limit?: number) => {
  try {
    if (limit) {
      const response = await instance.get(`/books/new?limit=${limit}`);
      return { response: response.data };
    } else {
      const response = await instance.get(`/books/new`);
      return { response: response.data };
    }
  } catch (error) {
    console.log(error);
  }
};

// cart

export const handlePurchase = async (
  products: IBook[],
  buyQuantities: number[]
) => {
  try {
    await handleRefreshToken();
    const response = await instance.post(
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
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    return { response: response };
  } catch (error: any) {
    return { errors: error.message };
  }
};

export const handleGetCartDetail = async (user_id: string) => {
  try {
    const response = await instance.get(`/carts/detail/${user_id}`);
    return { response: response.data };
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
