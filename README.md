# Stock Market Signals Classifier

This project is designed to classify stock market signals using BiLSTM and LSTM models. The outputs of these models are combined using logistic regression to make final predictions. Additionally, there are two JavaScript files, `fetch2.js` and `fetch3.js`, which fetch data for long and short trades, respectively.

## Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Usage](#usage)
    - [Training the Models](#training-the-models)
    - [Fetching Data](#fetching-data)
4. [File Structure](#file-structure)
5. [Contributing](#contributing)
6. [License](#license)

## Introduction

The Stock Market Signals Classifier is a machine learning project that aims to predict stock market signals. The project utilizes BiLSTM and LSTM neural networks to analyze stock data. The predictions from these models are then combined using logistic regression to improve accuracy. The project also includes JavaScript files to fetch data necessary for making trading decisions.

## Installation

To set up this project locally, follow these steps:

### Prerequisites

- Python 3.x
- Node.js and npm
- Required Python packages (listed in `requirements.txt`)

### Steps

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/stock-market-signals.git
    cd stock-market-signals
    ```

2. **Install Python dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

3. **Install Node.js dependencies:**
    ```bash
    cd fetch_data
    npm install
    ```

## Usage

### Training the Models

To train the BiLSTM and LSTM models and combine their outputs using logistic regression, run the following command:

```bash
python train.py
