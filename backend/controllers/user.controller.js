const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
const salt = bcrypt.genSaltSync(10);
require("dotenv").config();
const secret = process.env.SECRET;

exports.sign = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "Email is not found" });
  }
  //2.Sign JWT token
 const token = jwt.sign(
    { email: user.email, role: user.role },
    process.env.SECRET,
    {
      expiresIn: "1h",
    }
  );
  const userInfo = {
    token: token,
    email: user.email,
    role: user.role,
  };
  res.status(200).json(userInfo);
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
    const user = new UserModel({
      email: email,
      role: "user",
    });
    user.save();
    res.status(201).json(user);
  }catch (error){
    res.status(500).send({
      message:
    error.message || "Something error occurred while adding a new user"
  });
}
};

exports.getAllUsers = async (req, res) => {
  try{
    const users = await UserModel.find();
    if(!users){
      return res.status(200).json({message: "No have Users!"});
    }
    res.status(200).json(users);
  }catch (error){
    res.status(500).send({message: error.message || "Something error occured while getting a users"});
  }
}

exports.updateUser  = async (req, res) => {
  const {id} = req.params;
  const {email, role} = req.body;
  if(!email){
    return res.status(400).json({message: "Email is required!"});
  }
  try{
    const user = await UserModel.findByIdAndUpdate(id, {email:email, role: role}, {new: true});
    if(!user){
      return res.status(404).json({message: "User not found"});
    }
    res.status(200).json(user);
}catch (error){
  res.status(500).send({message: error.message || "Something error occured while updating a user" });
  }
};


exports.deleteUser = async (req, res) => {
  const {id} = req.params;
  if(!id)
  try {
    const user = await UserModel.findByIdAndDelete(id);
    if(!user){
      return res.status(404).json({message: "User not found"});
    }
    res.status(200).json({message: "User is deleted successfully!"});
  }catch (error){
    res.status(500).send({message: ErrorEvent.message || "Something error occured while deleting a user"});
  }
}

exports.makeAdmin = async (req, res) => {
  const {email}= req.params;
  try{
    const user = await UserModel.findOneAndUpdate.findOne({email})
    if(!user){
      return res.status(404).json({message: "User not found"});
    }
    user.role = "admin";
    user.save();
    res.json(user)
  }catch (error){
    res.status(500).send({message: 
      error.message || "Something error occured while making a user admin"});
  }
}

exports.makeUser = async (req, res) => {
  const {email}= req.params;
  try{
    const user = await UserModel.findOneAndUpdate.findOne({email})
    if(!user){
      return res.status(404).json({message: "User not found"});
    }
    user.role = "user";
    user.save();
    res.json(user)
  }catch (error){
    res.status(500).send({message: 
      error.message || "Something error occured while making a user User"});
    }
  }