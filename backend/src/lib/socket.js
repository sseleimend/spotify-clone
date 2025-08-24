import { Server } from "socket.io";

import { Message } from "../models/message.model.js";

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    },
  });

  const userSocket = new Map();
  const userActivities = new Map();

  io.on("connection", (socket) => {
    socket.on("user_connected", (userId) => {
      userSocket.set(userId, socket.id);
      userActivities.set(userId, "Idle");

      io.emit("user_connected", userId);
      socket.emit("users_online", Array.from(userSocket.keys()));
      io.emit("activities", Array.from(userActivities.entries()));
    });

    socket.on("update_activity", (userId, activity) => {
      userActivities.set(userId, activity);
      io.emit("activity_updated", Array.from(userActivities.entries()));
    });

    socket.on("send_message", async (data) => {
      try {
        const { senderId, receiverId, content } = data;

        const message = new Message({ senderId, receiverId, content });
        await message.save();

        const receiverSocketId = userSocket.get(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("receive_message", message);
        }

        socket.emit("message_sent", message);
      } catch (error) {
        socket.emit("message_error", "Failed to send message");
      }
    });

    socket.on("disconnect", () => {
      userSocket.forEach((socketId, userId) => {
        if (socketId === socket.id) {
          userSocket.delete(userId);
          userActivities.delete(userId);
          io.emit("user_disconnected", userId);
        }
      });
    });
  });
};
