const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../users/model");

const saltRounds = parseInt(process.env.SALT_ROUNDS);

// Hash password
const hashPass = async (req, res, next) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashPassword;
    console.log("password: ", req.body.password);
    next();
  } catch (error) {
    res.status(501).json({ message: error.message, error: error });
  }
};

// COMPARE PASSWORD

const comparePass = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    const myPassword = user.dataValues.password;
    console.log(myPassword);

    const checkPassword = await bcrypt.compare(req.body.password, myPassword);

    if (!checkPassword) {
      res.status(401).json({ message: "Wrong password" });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(501).json({ message: error.message, error: error });
  }
};

// TOKEN CHECK

const tokenCheck = async (req, res, next) => {
  try {
    console.log(req.header("Authorization"));

    if (!req.header("Authorization")) {
      throw new Error("No token pass");
    }

    const token = req.header("Authorization").replace("Bearer ", "");

    const decodedToken = await jwt.verify(token, process.env.SECRET);

    const user = await User.findOne({ where: { id: decodedToken.id } });

    if (!user) {
      res.status(401).json({ message: "Not Authorized" });
      return;
    }

    req.authCheck = user;

    next();
  } catch (error) {
    res.status(501).json({ message: error.message, error: error });
  }
};

module.exports = {
  hashPass: hashPass,
  comparePass: comparePass,
  tokenCheck: tokenCheck,
};
