import { create } from "zustand";
import axiosInstance from "../lib/axios.js";

// Callback function returns object
export const authStore = create((set) => ({
  authUser: null, // User could be or not be authenticated initially
  checkingSignup: false,
  checkingLogin: false,
  updatingProfile: false,
  checkingAuth: true, // Check authentication as soon as we refresh application
  checkUser: async (req, res) => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ checkingAuth: false });
    }
  },
}));
