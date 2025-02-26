const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
const e = require("express");
const salt = bcrypt.genSaltSync(10);
require("dotenv").config();
const secret = process.env.SECRET;

exports.signjwt = async (req, res) => {
  const { email } = req.body;
  if(!email) return res.status(400).json({ message: "Email is required" });
  const user = await UserModel.findOne({ email });
  if(!user) return res.status(404).json({ message: "User not found" });

  //2.Sign JWT token
  const token = jwt.sign({email: user.email, role: user.role},process.env.SECRET, {expiresIn: "1h"});
  const userInfo = {
    token : token,
    email: user.email,
    role: user
  };
  return
  res.status(200).json({token});
};

exports.addUser = async (req, res) => {
  const {email} = req.body;
  if(!email){
  return res.status(400).json({message: "Email is required"});
}
  try {
    const existeUser = await UserModel.findOne({email});
    if(existeUser){
      return res.status(409).json({message: "Email is already existed"});
    }
}
}