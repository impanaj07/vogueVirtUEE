import os
import pickle
import numpy as np
from PIL import Image
from tqdm import tqdm
from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import Model
from tensorflow.keras.layers import GlobalMaxPooling2D

# Load pretrained ResNet50 (excluding top layer)
model = ResNet50(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
model = Model(inputs=model.input, outputs=GlobalMaxPooling2D()(model.output))

# Image directory
img_folder = 'images'
filenames = []
feature_list = []

for img_name in tqdm(os.listdir(img_folder)):
    try:
        img_path = os.path.join(img_folder, img_name)
        img = Image.open(img_path).convert('RGB').resize((224, 224))
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = preprocess_input(img_array)

        features = model.predict(img_array, verbose=0).flatten()
        feature_list.append(features)
        filenames.append(img_name)
    except Exception as e:
        print(f"Skipping {img_name}: {e}")

# Save features and filenames
pickle.dump(feature_list, open('embeddings.pkl', 'wb'))
pickle.dump(filenames, open('filenames.pkl', 'wb'))
