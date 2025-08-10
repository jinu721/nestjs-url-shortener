import type { CreateUrlPayload } from "../types/url.types";
import axiosInstance from "./api.service";

export const UrlService = {
  createUrl: async (formData: CreateUrlPayload) => {
    try {
      const response = await axiosInstance.post("/", formData);
      return response?.data?.data;
    } catch (error) {
      console.log(error);
      throw new Error(error?.response?.data?.message || "Something Went Wrong");
    }
  },
  getUrlHistory: async (page: number,limit: number,search?: string) => {
    try {
      const response = await axiosInstance.get(`/history/?page=${page}&limit=${limit}&search=${search}`);
      return response.data.data;
    } catch (error) {
      console.log(error);
      throw new Error(error?.response?.data?.message || "Something Went Wrong");
    }
  },
};
