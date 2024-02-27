require("dotenv").config();
const express = require("express");

const User = require("./users/model");
const useRouter = require("./users/routes");

const app = express();

const port = process.env.PORT || 5001;

app.use(express.json());
app.use(useRouter);

const SyncTables = () => {
  User.sync();
};

app.listen(port, () => {
  SyncTables();
  console.log(`Server is listening on port ${port}`);
});
