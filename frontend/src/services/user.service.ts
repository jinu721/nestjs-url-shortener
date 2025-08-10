import axiosInstance from "./api.service";
import type {
  LoginPayload,
  RegisterPayload,
  ResendOtpPayload,
} from "../types/auth.types";

export const UserService = {
  register: async (formData: RegisterPayload) => {
    try {
      const response = await axiosInstance.post("/users/register", formData);
      localStorage.setItem("email", formData.email);
      return response;
    } catch (error) {
      console.log(error);
      throw new Error(error?.response?.data?.message || "Something Went Wrong");
    }
  },
  login: async (formData: LoginPayload) => {
    try {
      console.log("FormData", formData);
      const response = await axiosInstance.post("/users/login", formData);
      console.log(response);
      localStorage.setItem("accessToken", response?.data?.data?.accessToken);
      return response;
    } catch (error) {
      console.log(error);
      throw new Error(error?.response?.data?.message || "Something Went Wrong");
    }
  },
  resendOtp: async (formData: ResendOtpPayload) => {
    try {
      const response = await axiosInstance.post("/users/resend-otp", {
        email: formData.email,
      });
      return response;
    } catch (error) {
      console.log(error);
      throw new Error(error?.response?.data?.message || "Something Went Wrong");
    }
  },
  verifyOtp: async (email: string, otp: string) => {
    try {
      const response = await axiosInstance.post("/users/verify-otp", {
        email,
        otp,
      });
      localStorage.removeItem("email");
      return response;
    } catch (error) {
      console.log(error);
      throw new Error(error?.response?.data?.message || "Something Went Wrong");
    }
  },
  refreshToken: async () => {
    try {
      const response = await axiosInstance.post("/users/refresh-token");
      return response;
    } catch (error) {
      console.log(error);
      throw new Error(error?.response?.data?.message || "Something Went Wrong");
    }
  },
  logout: async () => {
    try {
      localStorage.removeItem("accessToken");
      return true;
    } catch (error) {
      console.log(error);
      throw new Error(error?.response?.data?.message || "Something Went Wrong");
    }
  },
  getMe: async (): Promise<{ id: string; email: string } | undefined> => {
    try {
      const response = await axiosInstance.get("/users/me");
      return response.data.data;
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || "Something Went Wrong");
    }
  },
};
