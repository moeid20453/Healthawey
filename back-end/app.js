const express = require("express");
const app = express();
let path = require("path");
require("dotenv").config();
let connection = require("./database/Connection.db");
connection();
let staticFiles = path.join(__dirname, "public");
let bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
var cors = require("cors");
const multer = require("multer");
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

const upload = multer({ dest: "uploads/" });

app.use(cors());

const AdminRoutes = require("./Routes/admin/Admin.Auth.Routes");
const AdminFoodRoutes = require("./Routes/admin/Admin.Food.Routes");
const AdminUserRoutes = require("./Routes/admin/Admin.User.Routes");
const UserRoutes = require("./Routes/User/User.Auth.Routes");
const UserFoodRoutes = require("./Routes/User/User.Food.Routes");

app.use(express.static(staticFiles));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

app.use("/Admin/auth", AdminRoutes);
app.use("/Admin/User", AdminUserRoutes);
app.use("/Admin", AdminFoodRoutes);
app.use("/User", UserRoutes);
app.use("/User/Food", UserFoodRoutes);

app.use("/results", express.static("results"));

//prediction

app.post("/predict", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path;

    // Create form data
    const form = new FormData();
    form.append("file", fs.createReadStream(filePath));

    // Make request to Python server
    const response = await axios.post("http://127.0.0.1:5000/predict", form, {
      headers: form.getHeaders(),
    });

    // Save the image with detections
    const imageFilePath = path.join(__dirname, "results", "result.jpg");
    const imageResponse = await axios({
      url: `http://127.0.0.1:5000/result.jpg`,
      method: "GET",
      responseType: "stream",
    });

    const writer = fs.createWriteStream(imageFilePath);
    imageResponse.data.pipe(writer);

    writer.on("finish", () => {
      res.json({
        predictions: response.data.predictions,
        image_url: `/results/result.jpg`,
      });
    });

    writer.on("error", (err) => {
      res.status(500).json({ error: err.message });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    fs.unlink(filePath, (err) => {
      if (err) console.error("Error removing file:", err);
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
