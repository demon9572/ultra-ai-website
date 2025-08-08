// Simple AI Training Model for UltraAI
class UltraAIModel {
    constructor() {
        this.model = null;
        this.isTraining = false;
        this.trainingData = [];
        this.vocabulary = new Set();
        this.maxSequenceLength = 20;
    }

    // Initialize the neural network model
    createModel() {
        this.model = tf.sequential({
            layers: [
                tf.layers.embedding({
                    inputDim: 1000,
                    outputDim: 16,
                    inputLength: this.maxSequenceLength
                }),
                tf.layers.globalAveragePooling1d(),
                tf.layers.dense({ units: 16, activation: 'relu' }),
                tf.layers.dropout({ rate: 0.5 }),
                tf.layers.dense({ units: 3, activation: 'softmax' })
            ]
        });

        this.model.compile({
            optimizer: 'adam',
            loss: 'categoricalCrossentropy',
            metrics: ['accuracy']
        });
    }

    // Add training data
    addTrainingData(text, category) {
        const words = text.toLowerCase().split(' ');
        words.forEach(word => this.vocabulary.add(word));
        
        this.trainingData.push({
            text: text,
            category: category // 0: question, 1: greeting, 2: command
        });
    }

    // Convert text to numerical sequences
    textToSequence(text) {
        const words = text.toLowerCase().split(' ');
        const vocabArray = Array.from(this.vocabulary);
        const sequence = words.map(word => {
            const index = vocabArray.indexOf(word);
            return index >= 0 ? index + 1 : 0;
        });
        
        // Pad or truncate to maxSequenceLength
        if (sequence.length > this.maxSequenceLength) {
            return sequence.slice(0, this.maxSequenceLength);
        } else {
            return sequence.concat(Array(this.maxSequenceLength - sequence.length).fill(0));
        }
    }

    // Train the model
    async trainModel() {
        if (this.trainingData.length < 10) {
            throw new Error('Need at least 10 training examples');
        }

        this.isTraining = true;
        
        // Prepare training data
        const xs = this.trainingData.map(item => this.textToSequence(item.text));
        const ys = this.trainingData.map(item => {
            const label = [0, 0, 0];
            label[item.category] = 1;
            return label;
        });

        const xsTensor = tf.tensor2d(xs);
        const ysTensor = tf.tensor2d(ys);

        // Train the model
        await this.model.fit(xsTensor, ysTensor, {
            epochs: 50,
            batchSize: 4,
            validationSplit: 0.2,
            callbacks: {
                onEpochEnd: (epoch, logs) => {
                    console.log(`Epoch ${epoch + 1}: loss = ${logs.loss.toFixed(4)}, accuracy = ${logs.acc.toFixed(4)}`);
                }
            }
        });

        xsTensor.dispose();
        ysTensor.dispose();
        this.isTraining = false;
    }

    // Predict category for new text
    predict(text) {
        if (!this.model) return null;
        
        const sequence = this.textToSequence(text);
        const prediction = this.model.predict(tf.tensor2d([sequence]));
        const probabilities = prediction.dataSync();
        
        const categories = ['question', 'greeting', 'command'];
        const maxIndex = probabilities.indexOf(Math.max(...probabilities));
        
        prediction.dispose();
        
        return {
            category: categories[maxIndex],
            confidence: probabilities[maxIndex]
        };
    }

    // Save model to browser storage
    async saveModel() {
        if (this.model) {
            await this.model.save('localstorage://ultraai-model');
        }
    }

    // Load model from browser storage
    async loadModel() {
        try {
            this.model = await tf.loadLayersModel('localstorage://ultraai-model');
            return true;
        } catch (error) {
            console.log('No saved model found, creating new one');
            this.createModel();
            return false;
        }
    }
}

// Initialize AI model
const aiModel = new UltraAIModel();

// Add default training data
function initializeTrainingData() {
    // Greetings
    aiModel.addTrainingData('hello', 1);
    aiModel.addTrainingData('hi there', 1);
    aiModel.addTrainingData('good morning', 1);
    aiModel.addTrainingData('hey', 1);
    aiModel.addTrainingData('how are you', 1);

    // Questions
    aiModel.addTrainingData('what time is it', 0);
    aiModel.addTrainingData('how does this work', 0);
    aiModel.addTrainingData('what can you do', 0);
    aiModel.addTrainingData('help me', 0);
    aiModel.addTrainingData('what is your name', 0);

    // Commands
    aiModel.addTrainingData('tell me a joke', 2);
    aiModel.addTrainingData('download info', 2);
    aiModel.addTrainingData('change language', 2);
    aiModel.addTrainingData('toggle dark mode', 2);
    aiModel.addTrainingData('copy text', 2);
}

// Enhanced chatbot with AI predictions
function handleChatMessageWithAI(message, chatMessages) {
    const userMessage = document.createElement('div');
    userMessage.textContent = `You: ${message}`;
    userMessage.className = 'chat-message user-message';
    chatMessages.appendChild(userMessage);

    let response = getLocalizedString('chatbotNotUnderstood');
    
    // Use AI model for better responses
    if (aiModel.model) {
        const prediction = aiModel.predict(message);
        if (prediction && prediction.confidence > 0.6) {
            switch (prediction.category) {
                case 'greeting':
                    response = getLocalizedString('chatbotGreeting');
                    break;
                case 'question':
                    if (message.toLowerCase().includes('time')) {
                        response = new Date().toLocaleTimeString();
                    } else {
                        response = getLocalizedString('chatbotHelp');
                    }
                    break;
                case 'command':
                    if (message.toLowerCase().includes('joke')) {
                        response = getLocalizedString('joke');
                    } else if (message.toLowerCase().includes('download')) {
                        promptDownload();
                        response = getLocalizedString('downloadStarted');
                    } else {
                        response = 'Command recognized! ' + getLocalizedString('chatbotHelp');
                    }
                    break;
            }
        }
    } else {
        // Fallback to original logic
        const lowerCaseMessage = message.toLowerCase();
        if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
            response = getLocalizedString('chatbotGreeting');
        } else if (lowerCaseMessage.includes('how are you')) {
            response = getLocalizedString('chatbotFeeling');
        } else if (lowerCaseMessage.includes('help')) {
            response = getLocalizedString('chatbotHelp');
        } else if (lowerCaseMessage.includes('time')) {
            response = new Date().toLocaleTimeString();
        } else if (lowerCaseMessage.includes('joke')) {
            response = getLocalizedString('joke');
        }
    }

    const botMessage = document.createElement('div');
    botMessage.textContent = `AI: ${response}`;
    botMessage.className = 'chat-message bot-message';
    chatMessages.appendChild(botMessage);

    speak(response);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}