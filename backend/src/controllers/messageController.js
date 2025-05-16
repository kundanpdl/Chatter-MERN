import User from "../models/userModel";
import Message from "../models/messageModel.js";
import { v2 as cloudinary } from "cloudinary";

export const usersSidebar = async (req, res) => {
  try {
    // Get id of currently logged in user
    const userIdLoggedIn = req.user._id;
    // Filter users
    const filteredUsers = await User.find({
      _id: { $ne: userIdLoggedIn }, // Find users that have ids that are not equal to currently logged in user id
    }).select("-password"); // Exclude passwords
    // Succes
    res.status(200).json(filteredUsers);
  } catch (error) {
    // Error
    console.log("Error in usersSidebar controller", error.message);
    res.status(500).json("Internal Server Error");
  }
};

export const getMessages = async (req, res) => {
  try {
    // The user on the other end.
    const { id: userToChat } = req.params;
    // Currently logged in user.
    const senderId = req.user._id;

    // Find messages between the two users.
    const messages = await Message.find({
      $or: [
        // Get messages from sender to receiver OR receiver to sender
        { senderId: senderId, receiverId: userToChat },
        { senderId: userToChat, receiverId: senderId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller", error.message);
    req.status(500).json("Internal Server Error");
  }
};

export const sendMessages = async (req, res) => {
  try {
    // Get text, image, and sender+reeiver Id from the req/client
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    // Upload image to cloudinary and get image url as response.
    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    // Create new message to save in db
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    // Save message and image to db
    await newMessage.save();

    // Success
    res.status(201).json(newMessage);
  } catch (error) {
    // Error
    console.log("Error in sendMessages controller", error.message);
    req.status(500).json("Internal Server Error");
  }
};
