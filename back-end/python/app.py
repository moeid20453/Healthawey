from flask import Flask, request, jsonify
import torch
from PIL import Image
import io
import pandas as pd
import numpy as np



app = Flask(__name__)

# Load YOLOv5 model
model = torch.hub.load('ultralytics/yolov5', 'custom', path='best.pt' , force_reload=True)

# Function to get predictions and save image with detections
def get_predictions_and_image(image_bytes, image_path):
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = np.array(img) 
    # Run YOLOv5 model
    results = model(img)
    results.pandas().xyxy[0].value_counts('name')

    
    

    

    return results.pandas().xyxy[0].to_dict(orient="records"), image_path

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'no file'}), 400
    file = request.files['file']
    img_bytes = file.read()
    image_path = 'F:\Healthawey\back-end\results'
    predictions, image_path  = get_predictions_and_image(img_bytes, image_path)
    
    return jsonify({'predictions': predictions, 'image_url': image_path})

if __name__ == '__main__':
    app.run(debug=True)