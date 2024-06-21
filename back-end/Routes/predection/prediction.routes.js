const app = require("express").Router();
const multer = require("multer");
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

const upload = multer({ dest: "uploads/" });
let path = require("path");
const appPath = path.join(__dirname, "results");
const normalizedAppPath = appPath.replace(/\\/g, "/");

app.post("/predict", upload.single("file"), async (req, res) => {
  const filePath = req.file.path;
  const filename = req.file.filename;
  try {
    console.log(filename);
    // Create form data
    const form = new FormData();
    form.append("file", fs.createReadStream(filePath));
    form.append("name", filename);

    // Make request to Python server
    const response = await axios.post("http://127.0.0.1:5000/predict", form, {
      headers: form.getHeaders(),
    });
console.log(response);
    const { predictions } = response.data;
    console.log(predictions);

    res.json({
      predictions: predictions,
      image_url: `${normalizedAppPath}/${filename}/image0.jpg`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    fs.unlink(filePath, (err) => {
      if (err) console.error("Error removing file:", err);
    });
  }
});
module.exports = app;
