from flask import Flask, request, jsonify
import torch
from PIL import Image
import io
import os
import base64
import pandas as pd
import logging
import numpy as np




app = Flask(__name__)

# Load YOLOv5 model
model = torch.hub.load('ultralytics/yolov5', 'custom', path='best.pt' , force_reload=True)

# Function to get predictions and save image with detections
def get_predictions_and_image(image_bytes, img_path, save_dir):
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = np.array(img) 

    os.makedirs(save_dir, exist_ok=True)

    original_name = os.path.basename(img_path)

    save_path = os.path.join(save_dir, original_name)


    # Run YOLOv5 model
    results = model(img)

   
    results.save(save_dir=os.path.join(save_dir, original_name))



    # saved_files = results.files 

  

    return results.pandas().xyxy[0].to_dict(orient="records")

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'no file'}), 400
    file = request.files['file']
    name = request.form.get('name')
    logging.info(name)
    img_bytes = file.read()
    image_path = 'F:\Healthawey/back-end/results'
    predictions  = get_predictions_and_image(img_bytes, name ,image_path)
    
    return jsonify({'predictions': predictions})

if __name__ == '__main__':
    app.run(debug=True)