import bcrypt from "bcrypt";
import User from "../models/user.model.js";

export const register = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(201).send("User has been created.");
  } catch (err) {
    next(err);
  }
};
export const registerSeller = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      role: "seller",
      password: hash,
    });

    await newUser.save();
    res.status(201).send("New Seller  created successfully.");
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res) => {
  try {
  } catch (error) {}
};
