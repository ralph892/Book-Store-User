import { IUser } from "@/interfaces/customInterface";
import Cookies from "js-cookie";
import axios from "axios";

axios.defaults.withCredentials = true;

const instance = axios.create({
  baseURL: "http://localhost:8080/auth",
});

export const handleSignUp = async (data: IUser) => {
  try {
    const result = await instance.post(`/signup`, data);
    return { response: result.data };
  } catch (error: any) {
    return { errors: error.response.data };
  }
};

export const handleLogin = async (email: string, password: string) => {
  try {
    const result = await instance.post("/login", {
      email,
      password,
    });
    return { response: result.data };
  } catch (error: any) {
    return { errors: error.response.data };
  }
};

export const handleLogout = async () => {
  try {
    await handleRefreshToken();
    const result = await instance.get("/logout", {
      headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
    });
    return { response: result.data };
  } catch (error: any) {
    return { errors: error.response.data };
  }
};

export const handleRefreshToken = async () => {
  try {
    const result = await instance.get("/refresh", {
      headers: { Authorization: `Bearer ${Cookies.get("refreshToken")}` },
    });
    return { response: result.data };
  } catch (error: any) {
    return { errors: error.response.data };
  }
};

export const handleRequestInformation = async () => {
  try {
    const result = await instance.get("/information", {
      headers: { Authorization: `Bearer ${Cookies.get("refreshToken")}` },
    });
    return { response: result.data };
  } catch (error: any) {
    return { errors: error.response.data };
  }
};

export const handleLoginByGoogle = async () => {
  try {
    window.location.href = "http://localhost:8080/auth/google-auth";
  } catch (error) {
    console.log(error);
  }
};
