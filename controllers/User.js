const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  const { username, password, notes } = req.body;
  console.log(req.body);
  console.log("req.body");
  try {
    var user = await User.findOne({ username });
    if (user) return res.status(400).json({ msg: "User already exists" });

    var salt = await bcrypt.genSalt(10);
    var hashedPassword = await bcrypt.hash(password, salt);
    user = new User({ username, password: hashedPassword, notes });
    await user.save();
    res.status(201).json({ msg: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    var users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    var user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};


