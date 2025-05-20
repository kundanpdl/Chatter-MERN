import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

// Callback function returns object
export const authStore = create((set) => ({
  authUser: null, // User could be or not be authenticated initially
  checkingSignup: false,
  checkingLogin: false,
  updatingProfile: false,
  checkingAuth: true, // Check authentication as soon as we refresh application
  checkUser: async () => {
    try {
      // Get request to request data from /check from the backend.
      // Checks if user is signed in.
      const res = await axiosInstance.get("/auth/check");
      // If success, set authUSer with the response data.
      // Here, if API returns data, the authUser gets updated.
      set({ authUser: res.data });
    } catch (error) {
      // If error encountered, update state with null.
      // Clears existing user, if any.
      console.log("Error in checkUser:", error);
      set({ authUser: null });
    } finally {
      // Checking authentication is set to false if pass/fail.
      // If set to true, page should display page-loading animation or something to that effect.
      set({ checkingAuth: false });
    }
  },
  signUp: async (data) => {
    try {
      set({ checkingSignup: true });
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("User Created Successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ checkingSignup: false });
    }
  },
}));
