import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/auth",
});

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
