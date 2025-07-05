# 🔍 Plagiarism Detector - Semantic Similarity Analyzer

An advanced web application that detects plagiarism using semantic similarity analysis with AI embedding models. Unlike traditional plagiarism detectors that only find exact matches, this tool understands the **meaning** and **context** of text to catch paraphrased content and sophisticated rewording.

![Project Status](https://img.shields.io/badge/Status-Production%20Ready-green)
![Python](https://img.shields.io/badge/Python-3.8+-blue)
![React](https://img.shields.io/badge/React-18+-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 🎯 Key Features

- **🤖 Multiple AI Models**: Compare results from 3 different embedding models
- **📊 Visual Similarity Matrix**: Color-coded percentage matrix showing all text relationships  
- **🚨 Smart Clone Detection**: Automatic flagging with customizable similarity thresholds
- **⚡ Real-time Analysis**: Fast processing with performance metrics
- **🎨 Modern UI**: Beautiful, responsive interface built with Chakra UI
- **🔒 Privacy-First**: All processing happens locally, no data sent to external servers
- **🆓 Completely Free**: No API keys, rate limits, or authentication required

---

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/shubham587/semantic-similarity-analyzer.git
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start Flask server
python app.py
```
**Backend will be available at:** `http://localhost:5001`

### 3. Frontend Setup
```bash
# Navigate to frontend directory (in new terminal)
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```
**Frontend will be available at:** `http://localhost:3000`

### 4. Using Automation Scripts
```bash
# Setup everything automatically
chmod +x setup.sh && ./setup.sh

# Start backend (Terminal 1)
./start-backend.sh

# Start frontend (Terminal 2)  
./start-frontend.sh
```

---

## 📖 Terminology & Concepts

### **Semantic Similarity**
The degree to which two texts have similar meaning, regardless of exact word matches. Uses AI embeddings to understand context and semantics.

### **Embeddings**
High-dimensional vector representations of text that capture semantic meaning. Each text is converted to a 384-dimensional vector.

### **Cosine Similarity**
Mathematical measure (0-1) of similarity between two vectors. Calculates the cosine of the angle between embedding vectors.

### **Similarity Matrix**
A symmetric matrix showing pairwise similarity percentages between all input texts.
```
        Text 1  Text 2  Text 3
Text 1   100%    85%     23%
Text 2    85%   100%     31%  
Text 3    23%    31%    100%
```

### **Clone Detection**
Automatic identification of text pairs that exceed a similarity threshold (default: 80%).

### **Similarity Threshold**
User-defined percentage above which texts are flagged as potential plagiarism:
- **90-100%**: Very strict - only obvious plagiarism
- **80-90%**: **Recommended** - balanced detection  
- **70-80%**: Sensitive - catches paraphrasing
- **60-70%**: Very sensitive - may have false positives

---

## 🔄 Application Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                    USER INTERFACE (React + Chakra UI)          │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌──────────────┐  ┌─────────────────────┐ │
│  │   Text Input    │  │   Model      │  │   Threshold         │ │
│  │   Boxes         │  │  Selection   │  │   Slider            │ │
│  │  (Dynamic)      │  │              │  │   (60-100%)         │ │
│  └─────────────────┘  └──────────────┘  └─────────────────────┘ │
│                              │                                  │
│                    ┌─────────▼─────────┐                       │
│                    │  Analyze Button   │                       │
│                    └─────────┬─────────┘                       │
└─────────────────────────────┼─────────────────────────────────┘
                              │ HTTP POST /api/analyze
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                 BACKEND PROCESSING (Flask + PyTorch)           │
├─────────────────────────────────────────────────────────────────┤
│                              │                                  │
│  ┌─────────────┐ ┌───────────▼────────────┐ ┌─────────────────┐ │
│  │    Text     │ │     AI Model           │ │   Similarity    │ │
│  │Preprocessing│ │   Loading & Encoding   │ │   Calculation   │ │
│  │             │ │                        │ │                 │ │
│  │• Clean text │ │• sentence-transformers │ │• Cosine         │ │
│  │• Normalize  │ │• PyTorch inference     │ │  similarity     │ │
│  │• Tokenize   │ │• Generate embeddings   │ │• Matrix         │ │
│  └─────────────┘ └────────────────────────┘ │  generation     │ │
│                              │              └─────────────────┘ │
│                              ▼                        │         │
│  ┌─────────────────────────────────────────────────────▼───────┐ │
│  │                 CLONE DETECTION                            │ │
│  │                                                            │ │
│  │  • Compare similarities against threshold                  │ │
│  │  • Flag potential plagiarism pairs                        │ │
│  │  • Generate detailed clone report                         │ │
│  └────────────────────────────────────────────────────────────┘ │
│                              │                                  │
└─────────────────────────────┼─────────────────────────────────┘
                              │ JSON Response
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    RESULTS VISUALIZATION                       │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌──────────────┐  ┌─────────────────────┐ │
│  │  Similarity     │  │    Clone     │  │    Model           │ │
│  │    Matrix       │  │  Detection   │  │  Comparison        │ │
│  │  (Color-coded)  │  │   Alerts     │  │   Reports          │ │
│  └─────────────────┘  └──────────────┘  └─────────────────────┘ │
│                                                                 │
│  📊 Performance Metrics  🎯 Threshold Analysis  📈 Statistics   │
└─────────────────────────────────────────────────────────────────┘
```

### **Processing Pipeline:**
1. **Input Validation** → Check minimum 2 texts
2. **Text Preprocessing** → Clean and normalize input
3. **Model Selection** → Choose embedding model(s)
4. **Embedding Generation** → Convert text to vectors using PyTorch
5. **Similarity Calculation** → Compute cosine similarity matrix
6. **Clone Detection** → Apply threshold and flag potential plagiarism
7. **Results Rendering** → Display visual matrix and alerts

---

## 🤖 AI Models Description

### **1. all-MiniLM-L6-v2**
- **Type**: General-purpose sentence transformer
- **Size**: ~350MB
- **Speed**: ⚡ Fastest (~0.5-2s)
- **Accuracy**: Good for most use cases
- **Best For**: Quick similarity checks, real-time applications
- **Architecture**: 6-layer MiniLM (distilled from BERT)

### **2. paraphrase-MiniLM-L6-v2**
- **Type**: Paraphrase detection specialist
- **Size**: ~350MB  
- **Speed**: ⚡ Fast (~1-3s)
- **Accuracy**: Excellent for rewording detection
- **Best For**: Academic plagiarism, content originality
- **Architecture**: Fine-tuned specifically for paraphrase identification

### **3. all-mpnet-base-v2**
- **Type**: High-accuracy transformer
- **Size**: ~400MB
- **Speed**: 🐌 Slower (~2-5s)
- **Accuracy**: ⭐ Highest quality embeddings
- **Best For**: Professional plagiarism detection, research
- **Architecture**: MPNet (Masked and Permuted Pre-training)

### **Model Comparison Matrix:**

| Model | Speed | Accuracy | Memory | Use Case |
|-------|-------|----------|---------|----------|
| all-MiniLM-L6-v2 | ⚡⚡⚡ | ⭐⭐⭐ | 350MB | General similarity |
| paraphrase-MiniLM-L6-v2 | ⚡⚡ | ⭐⭐⭐⭐ | 350MB | Paraphrase detection |
| all-mpnet-base-v2 | ⚡ | ⭐⭐⭐⭐⭐ | 400MB | High-accuracy analysis |

---

## 🛠️ Technical Stack

### **Backend**
- **Framework**: Flask 2.3.3
- **AI/ML**: sentence-transformers 5.0.0, PyTorch 2.7.1
- **Data Processing**: scikit-learn 1.3.0, NumPy 1.24.3
- **Cross-Origin**: flask-cors 4.0.0

### **Frontend**  
- **Framework**: React 18 with Vite
- **UI Library**: Chakra UI 2.10.1
- **HTTP Client**: Axios 1.5.0
- **Icons**: Chakra UI Icons

### **Dependencies**
```txt
# Backend (requirements.txt)
flask==2.3.3
flask-cors==4.0.0
sentence-transformers==5.0.0
scikit-learn==1.3.0
numpy==1.24.3
torch==2.7.1
transformers==4.53.1
huggingface_hub==0.33.2
```

---

## 📊 API Endpoints

### **POST /api/analyze**
Main plagiarism analysis endpoint.
```json
{
  "texts": ["Text 1", "Text 2", "Text 3"],
  "threshold": 0.8,
  "models": ["all-MiniLM-L6-v2", "paraphrase-MiniLM-L6-v2"]
}
```

### **GET /api/models**
Returns available embedding models and descriptions.

### **GET /api/health**  
Health check endpoint with loaded model status.

---

## 🧪 Testing Examples

### **High Similarity (>90%)**
```
Text 1: "Climate change is a serious global issue"
Text 2: "Global warming is a serious worldwide problem"
```

### **Medium Similarity (60-80%)**
```
Text 1: "Artificial intelligence is transforming technology"  
Text 2: "Machine learning is changing how computers work"
```

### **Low Similarity (<50%)**
```
Text 1: "The weather is nice today"
Text 2: "I love pizza and pasta for dinner"
```

---

## ⚠️ Memory Usage & Performance

### **Memory Consumption**
- **During Runtime**: ~1.5GB RAM (all 3 models loaded)
- **Individual Models**: 350-400MB each
- **When Backend Stops**: ✅ **Memory is completely freed**

### **Performance Characteristics**
- **First Analysis**: 2-5 seconds (model loading from cache)
- **Subsequent Analyses**: 0.5-3 seconds
- **Concurrent Requests**: Supported with shared model instances
- **Scalability**: Handles multiple users simultaneously

### **Memory Management**
```python
# When Flask server stops:
✅ Python process terminates
✅ PyTorch models unloaded from memory  
✅ All RAM is freed and returned to system
✅ No persistent memory consumption
```

---

## 🔧 Troubleshooting

### **Common Issues**

1. **Backend won't start**: Check Python 3.8+ and pip dependencies
2. **Model loading errors**: Ensure stable internet for first download (~2GB)
3. **Frontend connection issues**: Verify backend is running on port 5001
4. **Slow performance**: Normal on first run (models downloading)
5. **Memory warnings**: Requires ~2GB RAM for optimal performance

### **System Requirements**
- **Python**: 3.8 or higher
- **Node.js**: 16 or higher  
- **RAM**: 4GB minimum (8GB recommended)
- **Storage**: 5GB for models and dependencies
- **Internet**: Required for initial model download only

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Create Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support & Contact

- **Issues**: Open an issue on GitHub
- **Documentation**: Check `examples.md` for testing scenarios  
- **Performance**: See troubleshooting section above

---

## ⭐ Acknowledgments

- **Sentence Transformers**: HuggingFace for powerful embedding models
- **PyTorch**: Meta for the deep learning framework
- **Chakra UI**: For the beautiful React component library
- **Flask**: For the simple and powerful web framework

---

**🎯 Ready to detect semantic plagiarism with AI precision!** 🚀 