import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import userRoute from "./routes/user.Route.js";
import authRoute from "./routes/auth.Route.js";
import conversationRoute from "./routes/conversation.Route.js";
import gigRoute from "./routes/gig.Route.js";
import messageRoute from "./routes/message.Route.js";
import orderRoute from "./routes/order.Route.js";
import reviewRoute from "./routes/review.Route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
dotenv.config();
mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB!");
  } catch (error) {
    console.log(error);
  }
};
// app.use(cors({ origin: "https://voir-africa.web.app", credentials: true }));

app.use(cors());
app.options("*", cors());

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
// app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});

app.listen(8000, () => {
  connect();
  console.log("Backend Server is Running");
});
