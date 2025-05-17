import mongoose from "mongoose";

const messageSchma = mongoose.Schema(
  // senderId and receiverID will be referencing User
  // type field tells that to MongoDB
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // text and image are not both required because, some messages can contain only either of those two
    text: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Creating and exporting models
const Message = mongoose.model("Message", messageSchma);

export default Message;
