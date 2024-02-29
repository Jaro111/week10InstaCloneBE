const User = require("./model");
const jwt = require("jsonwebtoken");

// SIGN UP
const signUp = async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(200).json({ message: "User created", user: user });
  } catch (error) {
    res.status(501).json({ message: error.message, error: error });
  }
};

// LOG IN

const logIn = async (req, res) => {
  try {
    const token = await jwt.sign({ id: req.user.id }, process.env.SECRET);

    const user = {
      id: req.user.id,
      username: req.body.username,
      token: token,
    };

    console.log(req.user);
    res.status(200).json({ message: "Successfull Log In", user: user });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    console.log(users);
    res.status(200).json({ message: "All users", users: users });
  } catch (error) {
    res.status(501).json({ message: error.message, error: error });
  }
};

module.exports = { signUp, logIn, getUsers };
