import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";
import { authStore } from "./authStore.js";

export const useChat = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isLoadingMessages: false,
  isLoadingUsers: false,

  getUsers: async () => {
    set({ isLoadingUsers: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error("Error Loading Users");
    } finally {
      set({ isLoadingUsers: false });
    }
  },

  getMessages: async (userId) => {
    set({ isLoadingMessages: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error("Error Loading Messages");
    } finally {
      set({ isLoadingMessages: false });
    }
  },

  sendMessage: async (data) => {
    const { selectedUser, messages } = get();
    console.log(selectedUser);
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        data
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error("Error Sending Message");
    }
  },

  subscribeMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = authStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      if (newMessage.senderId !== selectedUser._id) return;
      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeMessages: () => {
    const socket = authStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
