const express = require("express");
const app = express();
let path = require("path");
require("dotenv").config();
let connection = require("./database/Connection.db");
connection();
let bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
var cors = require("cors");

app.use(cors());

const AdminRoutes = require("./Routes/admin/Admin.Auth.Routes");
const AdminFoodRoutes = require("./Routes/admin/Admin.Food.Routes");
const AdminUserRoutes = require("./Routes/admin/Admin.User.Routes");
const UserRoutes = require("./Routes/User/User.Auth.Routes");
const UserFoodRoutes = require("./Routes/User/User.Food.Routes");
const PredictionRoutes = require("./Routes/predection/prediction.routes");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

app.use("/Admin/auth", AdminRoutes);
app.use("/Admin/User", AdminUserRoutes);
app.use("/Admin", AdminFoodRoutes);
app.use("/User", UserRoutes);
app.use("/User/Food", UserFoodRoutes);

app.use("/results", express.static("results"));
app.use("", PredictionRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
