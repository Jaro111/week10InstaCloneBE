const { Router } = require("express");

const useRouter = Router();

const { hashPass, comparePass, tokenCheck } = require("../middleware/auth");

const { signUp, logIn, getUsers } = require("./controllers");

// SIGN UP
useRouter.post("/users/signUp", hashPass, signUp);

// LOG IN
useRouter.post("/users/logIn", comparePass, logIn);

// GET ALL USERS
useRouter.get("/users/getAll", getUsers);

// TOKEN CHECK
useRouter.get("/users/authCheck", tokenCheck, logIn);

module.exports = useRouter;
