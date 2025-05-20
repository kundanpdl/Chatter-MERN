import { generateToken } from "../lib/utils.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signUp = async (req, res) => {
  const { fullName, email, password } = req.body; // app.use(express.json()) in index.js lets us do this.
  try {
    if (!fullName || !password || !email) {
      return res
        .status(400)
        .json({ message: "Please fill in all the fields." });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    // findOne to check if the user exists in our collection
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "Email already exists." });
    }

    // Salt created with cost factor of 10 (salt rounds: controls how computationally intensive the work is).
    const salt = await bcrypt.genSalt(10);
    // Creating hashed password using the salt created earlier.
    const hashedPassword = await bcrypt.hash(password, salt);

    // Saving the hashed password only in the user table, not changing anything else.
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    // Condition to check if new user was created
    if (newUser) {
      // Call function from utils to generate jwt. '_id' is how mongodb stores the id (not plain 'id').
      // res so that the function can send the cookie in the response.
      generateToken(newUser._id, res);
      // Save new user to database
      await newUser.save();
      return res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        password: newUser.password,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({ message: "Error creating new user." });
    }
  } catch (error) {
    console.log("Error in Sign Up controller:", error);
    res.status(500).json("Internal Server Error");
  }
};

export const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    // If email or password not provided.
    if (!email || !password) {
      res.status(400).json({ message: "Both fields are required." });
    }
    // If password is shorter than 6 characters
    if (password.length < 6) {
      res.status(401).json({ message: "Invalid password length." });
    }

    // Find if user exists in the database
    const user = await User.findOne({ email });

    // If user does not exist
    if (!user) {
      res.status(401).json({ message: "Invalid Email" });
    }

    // Compare the password that is provided with the one that is in the database.
    const isCorrectPass = await bcrypt.compare(password, user.password);

    // If password is not correct
    if (!isCorrectPass) {
      res.status(401).json({ message: "Invalid Password" });
    }

    // If password is correct, generate token.
    generateToken(user._id, res);

    // Return logged in users credentials
    res.status(200).json({
      _id: user._id,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logOut = (req, res) => {
  try {
    // Set cookie to expire as soon as user logs out.
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json("Logged out successfully");
  } catch (error) {
    console.log("Error in logout controller");
    res.status(500).json("Internal Server Error", error.message);
  }
};

export const editProfile = async (req, res) => {
  try {
    // Get profile picture and userId from client
    const { profilePic } = req.body;
    const userId = req.user._id;
    // Check for existence of picture
    if (!profilePic) {
      res.status(400).json("Profile pic is required.");
    }
    // Get upload response after uploading the image
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    // Find the user and update their picture
    // Set new:true so that updated picture will be displayed
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );
    // Success status
    res.status(200).json(updatedUser);
  } catch (error) {
    // Error
    console.log("Error in editProfile", error);
    res.status(500).json("Internal Server Error");
  }
};

export const checkAuth = (req, res) => {
  try {
    // req contains user data if they are logged in
    // If user is nof found, show error message
    if (!req.user) {
      return res.status(401).json("Not authenticated");
    }
    // Success if user found
    return res.status(200).json(req.user);
  } catch (error) {
    // Error
    console.error("Error in checking user authentication", error);
    return res.status(500).json("Internal Server Error");
  }
};
