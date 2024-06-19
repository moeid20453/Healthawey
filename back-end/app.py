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
def get_predictions_and_image(image_bytes, image_path):
    # Convert image to OpenCV format
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    
    # Run YOLOv5 model
    results = model(img)

    # Draw boxes on the image
    img_with_boxes = results.render()[0]

    # Save image with detections
    img_with_boxes.save(image_path)

    return results.pandas().xyxy[0].to_dict(orient="records"), image_path

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'no file'}), 400
    file = request.files['file']
    img_bytes = file.read()
    image_path = 'result.jpg'
    predictions, image_path = get_predictions_and_image(img_bytes, image_path)
    
    return jsonify({'predictions': predictions, 'image_url': image_path})

if __name__ == '__main__':
    app.run(debug=True)