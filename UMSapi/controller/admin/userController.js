import User from "../../models/usermodel.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../../utils/error.js";

const getUsers = async (req, res, next) => {
  const { username } = req.query;
  const reg = username ? username : "";

  try {
    const users = await User.find(
      { username: { $regex: reg, $options: "i" } },
      { username: 1, email: 1, profilePicture: 1 }
    );
    res.status(200).json(users);
  } catch (err) {
    next(errorHandler(500, err.message));
  }
};

const addUser = (req, res, next) => {
  try {
  } catch (err) {}
};
const updateUser = (req, res, next) => {
  try {
  } catch (err) {}
};
const deleteUser = (req, res, next) => {
  try {
  } catch (err) {}
};

export { getUsers, addUser, updateUser, deleteUser };
