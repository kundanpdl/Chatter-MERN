import { generateToken } from "../lib/utils.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

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

export const logIn = (req, res) => {
  res.send("Login Route");
};

export const logOut = (req, res) => {
  res.send("Logout Route");
};
