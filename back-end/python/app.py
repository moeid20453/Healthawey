from flask import Flask, request, jsonify, send_file
import torch
from PIL import Image
import io
import os
import cv2
import numpy as np
from yolov5 import detect

app = Flask(__name__)

# Load YOLOv5 model
model = torch.hub.load('ultralytics/yolov5', 'custom', path='best.pt' , force_reload=True)

# Function to get predictions and save image with detections
def get_predictions_and_image(image_bytes):
    # Convert image to OpenCV format
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = np.array(img)
    img = img[:, :, ::-1]  # Convert RGB to BGR
    
    # Run YOLOv5 model
    results = model(img)
    results.save()
    results.show()
   
    return results.pandas().xyxy[0].to_json(orient="records")

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'no file'}), 400
    file = request.files['file']
    img_bytes = file.read()
    predictions, img_io = get_predictions_and_image(img_bytes)
    
    return send_file(img_io, mimetype='image/jpeg', as_attachment=True, attachment_filename='result.jpg'), jsonify(predictions)

if __name__ == '__main__':
    app.run(debug=True)
