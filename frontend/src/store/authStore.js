import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:8000";

// Callback function returns object
export const authStore = create((set, get) => ({
  authUser: null, // User could be or not be authenticated initially
  checkingSignup: false,
  checkingLogin: false,
  updatingProfile: false,
  checkingAuth: true, // Check authentication as soon as we refresh application
  onlineUsers: [],
  socket: null,
  checkUser: async () => {
    try {
      // Get request to request data from /check from the backend.
      // Checks if user is signed in.
      const res = await axiosInstance.get("/auth/check");
      // If success, set authUSer with the response data.
      // Here, if API returns data, the authUser gets updated.
      set({ authUser: res.data });
      get().connectSocket();
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
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ checkingSignup: false });
    }
  },
  login: async (data) => {
    set({ checkingLogin: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged In Successfully");
      get().connectSocket();
    } catch (error) {
      toast.error("Something Went Wrong");
    } finally {
      set({ checkingLogin: false });
    }
  },
  logOut: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged Out Successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  },
  updateProfile: async (data) => {
    set({ updatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/edit-profile", data);
      set({ authUser: res.data });
      toast.success("Profile Updated");
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    } finally {
      set({ updatingProfile: false });
    }
  },
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();
    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
