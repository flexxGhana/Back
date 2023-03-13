import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res, next) => {
  const totalUsers = await User.countDocuments();
  const token = req.cookies.accessToken;
  const decodedToken = jwt.verify(token, process.env.JWT_KEY);
  const currentUserRole = decodedToken.role;
  if (currentUserRole !== "admin") {
    return next(createError(403, "You are not authorized to view all users!"));
  }

  const q = req.query;
  const filters = {
    ...(q.country && { country: q.country }),
    ...(q.role && { role: q.role }),
  };

  // Pagination parameters
  const page = parseInt(q.page) || 1;
  const limit = parseInt(q.limit) || 2;
  const skip = (page - 1) * limit;
  try {
    const users = await User.find(filters)
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit);
    res.status(200).json({ users, totalUsers });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return next(createError(404, "User not found"));
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    // Retrieve the access token from the cookies
    const token = req.cookies.accessToken;

    // Verify the token and decode the payload to retrieve the user role
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const currentUserRole = decodedToken.role;

    // Check if the current user has the "admin" role
    if (currentUserRole !== "admin") {
      return next(
        createError(403, "You are not authorized to delete this user!")
      );
    }

    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(createError(404, "User not found"));
    }

    await User.findByIdAndDelete(req.params.userId);
    res.status(200).send(`${user.name} deleted successfully`);
  } catch (error) {
    next(error);
  }
};
