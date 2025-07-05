from flask import Flask, request, jsonify
from flask_cors import CORS
from sentence_transformers import SentenceTransformer
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import itertools
import time

app = Flask(__name__)
CORS(app)  # Enable CORS for all origins

# Initialize multiple embedding models for comparison
models = {}
model_names = [
    'all-MiniLM-L6-v2',
    'paraphrase-MiniLM-L6-v2',
    'all-mpnet-base-v2'
]

# Load models on startup
print("Loading embedding models...")
for model_name in model_names:
    try:
        models[model_name] = SentenceTransformer(model_name)
        print(f"✓ Loaded {model_name}")
    except Exception as e:
        print(f"✗ Failed to load {model_name}: {e}")

def preprocess_text(text):
    """Simple text preprocessing"""
    if not text:
        return ""
    # Remove extra whitespace and convert to lowercase
    text = ' '.join(text.split())
    return text.strip()

def calculate_similarity_matrix(texts, model):
    """Calculate pairwise similarity matrix for all texts"""
    if not texts or len(texts) < 2:
        return []
    
    # Preprocess texts
    processed_texts = [preprocess_text(text) for text in texts]
    
    # Generate embeddings
    embeddings = model.encode(processed_texts)
    
    # Calculate cosine similarity matrix
    similarity_matrix = cosine_similarity(embeddings)
    
    return similarity_matrix.tolist()

def detect_clones(similarity_matrix, threshold=0.8):
    """Detect potential clones based on similarity threshold"""
    clones = []
    n = len(similarity_matrix)
    
    for i in range(n):
        for j in range(i + 1, n):
            similarity = similarity_matrix[i][j]
            if similarity >= threshold:
                clones.append({
                    'text1_index': i,
                    'text2_index': j,
                    'similarity': round(similarity, 4)
                })
    
    return clones

@app.route('/api/analyze', methods=['POST'])
def analyze_plagiarism():
    try:
        data = request.json
        texts = data.get('texts', [])
        threshold = data.get('threshold', 0.8)
        selected_models = data.get('models', ['all-MiniLM-L6-v2'])
        
        if not texts or len(texts) < 2:
            return jsonify({'error': 'Please provide at least 2 texts to compare'}), 400
        
        # Filter empty texts
        texts = [text for text in texts if text.strip()]
        
        if len(texts) < 2:
            return jsonify({'error': 'Please provide at least 2 non-empty texts'}), 400
        
        results = {}
        
        # Analyze with each selected model
        for model_name in selected_models:
            if model_name not in models:
                continue
                
            start_time = time.time()
            
            # Calculate similarity matrix
            similarity_matrix = calculate_similarity_matrix(texts, models[model_name])
            
            # Detect clones
            clones = detect_clones(similarity_matrix, threshold)
            
            processing_time = time.time() - start_time
            
            results[model_name] = {
                'similarity_matrix': similarity_matrix,
                'clones': clones,
                'processing_time': round(processing_time, 3),
                'threshold': threshold
            }
        
        response = {
            'success': True,
            'texts': texts,
            'results': results,
            'text_count': len(texts)
        }
        
        return jsonify(response)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/models', methods=['GET'])
def get_available_models():
    """Get list of available embedding models"""
    available_models = []
    for model_name in model_names:
        if model_name in models:
            available_models.append({
                'name': model_name,
                'description': get_model_description(model_name)
            })
    
    return jsonify({'models': available_models})

def get_model_description(model_name):
    """Get description for each model"""
    descriptions = {
        'all-MiniLM-L6-v2': 'Fast and efficient model, good for general purpose similarity',
        'paraphrase-MiniLM-L6-v2': 'Optimized for paraphrase detection and semantic similarity',
        'all-mpnet-base-v2': 'Higher quality embeddings, slower but more accurate'
    }
    return descriptions.get(model_name, 'Sentence transformer model')

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'models_loaded': len(models),
        'available_models': list(models.keys())
    })

if __name__ == '__main__':
    print(f"Starting server with {len(models)} models loaded")
    app.run(host='0.0.0.0', port=5001, debug=True) 