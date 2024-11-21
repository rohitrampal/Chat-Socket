const bcrypt = require("bcrypt");
const User = require("../models/user");
const Consultant = require('../models/consultant')
const Message = require('../models/message')
const Conversation = require('../models/conversation')

exports.getAllUsers = async (req, res) => {
  // #swagger.tags = ['Users']
  const data = await User.find();
  res.status(200).json({ user: data });
};

exports.getUser = async (req, res) => {
  // #swagger.tags = ['Users']
  const id = req.params.id;
  const data = await User.findById(id);
  res.status(200).json({ user: data });
};


exports.signUp = async (req, res) => {
  // #swagger.tags = ['Users']
  const data = req.body;
  console.log(data);
  
  try {
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email is already registered" });
    }

    const userData = new User({
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
    });

    await userData.save();
    res.status(200).json({ msg: "User successfully signed up" });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ msg: error.message });
    }
    res.status(500).json({ msg: "Internal server error" });
  }
};


exports.getAllConsultant = async(req,res)=>{
  const data = await User.find({role:"consultant"})
  return res.json(data)
}