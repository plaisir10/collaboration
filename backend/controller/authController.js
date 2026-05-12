import bcrypt from "bcryptjs";
import User from "../model/User.js";

const signup = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }
  const existing = await User.findOne({ username });
  if (existing) {
    return res.status(409).json({ message: "Username taken" });
  }
  const hashed = await bcrypt.hash(password, 10);
  const newUser = await User.createe({ username, password: hashed });
  res.status(201).json({
    _id: newUser._id,
    username: newUser.username,
  });
};
