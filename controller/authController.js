const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("dotenv").config();
const Secret = process.env.SECRET_KEY;

exports.register = async (req, res) => {
  try {
    const sameEmail = await userModel.findOne({ email: req.body.email });
    if (sameEmail)
      return res.json({ status: false, message: "Email already exist" });

    const passwords = await bcrypt.hash(req.body.password, 10);
    req.body.password = passwords;
    const user = await userModel.create(req.body);
    return res.json({ status: true });
  } catch (er) {
    return res.json({ message: er.message, status: false });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email }).lean();
    if (!user) return res.json({ message: "user not found", status: false });
    if (!bcrypt.compareSync(req.body.password, user.password))
      return res.json({ message: "Incorrect Password", status: false });
    let token = jwt.sign({ id: user._id }, Secret, { expiresIn: 86400 });
    return res.json({
      status: true,
      token: token,
      message: "Succefully logged",
    });
  } catch (er) {
    return res.json({ status: false, message: er.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const password = await bcrypt.hash(req.body.password, 10);
    const updatePassword = await userModel.updateOne(
      { email: req.body.email },
      { $set: { password: password } }
    );
    res.json({ status: true, message: "Password changed" });
  } catch (er) {
    res.json({ status: false, message: er.message });
  }
};

exports.forgetPassword = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.password });
    if (!user) return res.json({ status: false, message: "Invalid user" });
    res.json({ status: false, message: "user verified" });
  } catch (er) {
    res.json({ status: false, message: er.message });
  }
};

exports.userName = async (req, res) => {
  try {
    const user = await userModel.updateOne({email:req.body.email} ,{$set:{name:req.body.name}})
  } catch (er) {
    res.json({ status: false, message: er.message });
  }
};
