import "../../assets/UploadPhoto.css";
import React, { useState } from "react";
import axios from "axios";
import Header from "../../components/Header";

const PhotoUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://127.0.0.1:4500/predict",
        formData
      );
      console.log("File uploaded successfully:", response.data);
      setPredictions(response.data.predictions || []); 
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  console.log(imageUrl);

  return (
    <div>
      <Header />
      <div className="uploadBody">
        <div className="uploadContainer">
          <h2>Upload Your Photo</h2>
          <form onSubmit={handleSubmit}>
            <input type="file" id="file-upload" onChange={handleFileChange} />
            <label htmlFor="file-upload">Choose a file</label>
            {preview && <img className="upload" src={preview} alt="Preview" />}
            <button type="submit">Upload Photo</button>
          </form>
          {predictions.length > 0 && (
            <div className="predictions">
              <h3>Predictions:</h3>
              <ul>
                {predictions.map((prediction, index) => (
                  <li key={index}>
                    <p>
                      <strong>Name:</strong> {prediction.name}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoUpload;
