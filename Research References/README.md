# Music Key Detection

Machine learning system for detecting musical keys using SVM classification with support for 24 major and minor keys.

## Quick Start

### 1. Setup Environment
```bash
# Run the automated setup
./setup.sh

# Or manually:
python3 -m venv music_key_env
source music_key_env/bin/activate
pip install -r requirements.txt
```

### 2. Download & Process Data
```bash
source music_key_env/bin/activate
python scripts/run_pipeline.py --data-only
```
Time: 30-60 minutes (downloads ~2.5GB of audio data)

### 3. Train Improved SVM Models
```bash
source music_key_env/bin/activate
python scripts/run_pipeline.py --all
```
Time: 40-80 minutes total (includes data processing + training)

## Project Structure

```
├── src/                          # Source code package
│   └── music_key_detection/
│       ├── config/              # Configuration settings
│       ├── core/                # Core functionality
│       │   ├── data_processor.py    # Data processing pipeline
│       │   └── feature_extractor.py # Feature extraction
│       ├── training/            # Training modules
│       │   └── svm_trainer.py       # SVM training logic
│       ├── utils/               # Utility functions
│       ├── data/                # Data utilities
│       └── models/              # Model utilities
├── scripts/                     # Executable scripts
│   └── run_pipeline.py         # Main CLI interface
├── data/                       # Downloaded and processed data (created)
│   ├── fmak_mp3/               # Original MP3 files
│   ├── fmak_wav/               # Converted WAV files
│   ├── fmak_wav_aug/          # Augmented audio files
│   ├── available_balanced.csv # Balanced dataset metadata
│   └── features_cache.npz     # Extracted audio features
├── models/                     # Trained SVM models (created)
├── docs/                      # Documentation and references
│   └── references/          # Educational SVM materials
├── music_key_env/           # Virtual environment
├── requirements.txt         # Python dependencies
├── setup.sh                # Automated setup script
├── .gitignore              # Git ignore rules
└── README.md              # This documentation
```
## Key Improvements

### 1. Less Aggressive PCA Reduction
- Problem: We were using PCA 90% (reduced 205 → 68 features)
- Solution: Test PCA 95% (~120-150 features preserved)
- Result: Small accuracy improvement (+0.24%) over baseline

### 2. Multiple SVM Configurations Tested
- PCA 95% variance retention
- No PCA (all 205 features)
- Feature selection (top 120 features)
- Linear kernel SVM

### 3. Optimized for Local Hardware
- Reduced parallel workers (8 instead of 12)
- Cached feature extraction
- Incremental processing
- Better memory management

## Results

| Configuration | Test Accuracy | Improvement |
|---------------|----------------|-------------|
| Original (PCA 90%) | 66.88% | Baseline |
| **PCA 95%** | **67.12%** | **+0.24%** |
| No PCA | 66.83% | -0.05% |
| Feature Selection | 66.44% | -0.44% |
| Linear SVM | 62.71% | -4.17% |

## CLI Usage

The project uses a unified command-line interface:

```bash
# Complete pipeline (recommended)
python scripts/run_pipeline.py --all

# Individual steps
python scripts/run_pipeline.py --data-only      # Data processing only
python scripts/run_pipeline.py --audio-only     # Audio validation/conversion only
python scripts/run_pipeline.py --train-only     # Training only (requires cached data)
python scripts/run_pipeline.py --evaluate       # Evaluate saved model

# Options
python scripts/run_pipeline.py --all --no-cache  # Disable feature caching
```

## Requirements

### System Requirements
- **RAM**: 8GB minimum, 16GB recommended
- **Storage**: 20GB free space (data + models)
- **OS**: macOS, Linux, or Windows with WSL

### Software Dependencies
- Python 3.8+
- FFmpeg (for audio conversion)
- Virtual environment support

### Installation on macOS
```bash
# Install FFmpeg
brew install ffmpeg

# Install Python (if not already installed)
# Python comes pre-installed on macOS 12.3+
```

## Detailed Usage

### Step 1: Data Processing
```bash
# Download FMAK dataset chunks
python scripts/run_pipeline.py --data-only
```
This will:
- Download 5 ZIP chunks (~500MB each)
- Extract MP3 files to organized directory structure

### Step 2: Audio Processing (Recommended)
```bash
# Validate and convert audio files
python scripts/run_pipeline.py --audio-only
```
This will:
- Validate all extracted MP3 files
- Convert valid MP3s to WAV format (22kHz mono)
- Validate all WAV files
- Remove corrupted/invalid files
- Generate detailed processing report

### Step 3: Feature Extraction and Training

### Step 2: Feature Extraction and SVM Training
```bash
# Complete pipeline (recommended)
python scripts/run_pipeline.py --all
```
This will:
- Extract 205-dimensional feature vectors
- Test 4 different SVM configurations
- Perform 5-fold cross-validation for each
- Save best model and confusion matrix
- Show detailed accuracy comparison

### Step 3: Results Analysis
Check the `models/` directory for:
- Trained model files (`.joblib`)
- Confusion matrix plots (`.png`)
- Training logs and accuracy reports

### Alternative Commands
```bash
# Audio processing only (after data download)
python scripts/run_pipeline.py --audio-only

# Training only (if audio processing is complete)
python scripts/run_pipeline.py --train-only

# Evaluate existing model
python scripts/run_pipeline.py --evaluate
```

### Standalone Audio Processing
```bash
# Direct audio processing (alternative to --audio-only)
python scripts/process_audio.py
```

## Troubleshooting

### Common Issues

**1. FFmpeg not found**
```bash
# macOS
brew install ffmpeg

# Ubuntu/Debian
sudo apt install ffmpeg

# Check installation
ffmpeg -version
```

**2. Memory errors during feature extraction**
- Reduce batch size in the script
- Process data in smaller chunks
- Close other memory-intensive applications

**3. Slow downloads**
- Check internet connection
- The dataset is ~2.5GB total
- Downloads happen sequentially (can be parallelized if needed)

**4. Virtual environment issues**
```bash
# Recreate environment
rm -rf music_key_env
python3 -m venv music_key_env
source music_key_env/bin/activate
pip install -r requirements.txt
```
## Understanding the Features

The system extracts 205 features from each 30-second audio clip:
- **Chroma features** (24): Pitch class distributions
- **MFCCs** (40): Mel-frequency cepstral coefficients
- **Spectral features** (15): Centroid, bandwidth, rolloff, contrast
- **Rhythm features** (1): Tempo estimation
- **Tonal features** (12): Tonnetz representation
- **Harmonic/percussive** (24): Separate chroma for HPSS components

## Technical Details

### SVM Configurations
1. **PCA 95%**: Dimensionality reduction preserving 95% variance
2. **No PCA**: All features, maximum information retention
3. **Feature Selection**: Statistical selection of most discriminative features
4. **Linear SVM**: Simpler model, faster training

### Hyperparameter Search
- **C**: [0.1, 1, 10, 50, 100, 200] (regularization)
- **gamma**: ["scale", "auto", 0.001, 0.01] (RBF kernel width)
- **kernels**: RBF (Gaussian), Linear

### Cross-Validation
- 5-fold stratified k-fold
- Maintains class balance across folds
- Ensures robust performance estimation

## Contributing

To improve the model further:
1. Experiment with different feature combinations
2. Try ensemble methods (Random Forest, XGBoost)
3. Implement advanced augmentation techniques
4. Add temporal modeling (CNN, RNN)

## Educational References

For those interested in learning more about SVM concepts, check out:
- `docs/references/Support_Vector_Machines.ipynb` - Comprehensive SVM tutorial

## License

This project uses the FMAK dataset. Please cite the original paper when using results.

---

Happy music key detecting!
