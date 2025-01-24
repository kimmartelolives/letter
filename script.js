const sendButton = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatLog = document.getElementById('chat-log');

let audioElement; // Variable to track the audio element

// List of song URLs (you can replace these with actual URLs)
const songs = [
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3'
];

// Dynamic bot replies
const botReplies = {
    "hi": [
        "Hello! How can I assist you today?",
        "Hi there! What's on your mind?",
        "Hey! How's your day going?"
    ],
    "hello": [
        "Hey there! How's it going?",
        "Hi! Glad to chat with you.",
        "Hello! What can I do for you?"
    ],
    "how are you": [
        "I'm just a bot, but I'm here and ready to help!",
        "Feeling fantastic! Thanks for asking.",
        "I'm doing great! How about you?"
    ],
    "bye": [
        "Goodbye! Have a wonderful day!",
        "See you later! Take care.",
        "Bye! Don't hesitate to chat again."
    ],
    "play a song": [
        "Sure! Playing a song for you now. 🎵",
        "Let's jam! Here's a song. 🎶",
        "Alright! Enjoy the music! 🎧"
    ],
    "stop music": [
        "Music stopped. Let me know if you'd like me to play something else!",
        "Alright, I've stopped the music for you.",
        "Done! The music has been paused. 🎵"
    ],
    "send a picture": [
        "Here you go! 🖼️",
        "Sure! Here's a picture for you.",
        "Take a look at this!"
    ],
    "default": [
        "Hmm, I didn't quite catch that. Could you rephrase?",
        "I'm not sure I understand, but I'm here to help!",
        "Sorry, I didn’t get that. Could you say it differently?"
    ]
};

// Function to calculate the Levenshtein distance (edit distance)
function calculateLevenshtein(a, b) {
    const tmp = [];
    let i, j, alen = a.length, blen = b.length, cost;

    if (alen === 0) return blen;
    if (blen === 0) return alen;

    for (i = 0; i <= alen; i++) tmp[i] = [i];

    for (j = 0; j <= blen; j++) tmp[0][j] = j;

    for (i = 1; i <= alen; i++) {
        for (j = 1; j <= blen; j++) {
            cost = a[i - 1] === b[j - 1] ? 0 : 1;
            tmp[i][j] = Math.min(tmp[i - 1][j] + 1, tmp[i][j - 1] + 1, tmp[i - 1][j - 1] + cost);
        }
    }

    return tmp[alen][blen];
}

// Function to find the closest response based on string similarity
function getClosestResponse(userMessage) {
    let bestMatch = { key: "default", similarity: 0 };

    Object.keys(botReplies).forEach((key) => {
        const similarity = 1 - calculateLevenshtein(userMessage, key) / Math.max(userMessage.length, key.length);
        if (similarity > bestMatch.similarity) {
            bestMatch = { key, similarity };
        }
    });

    // We set a threshold to ensure the match is not too weak
    return bestMatch.similarity > 0.5 ? bestMatch.key : "default"; // Threshold for similarity (50%)
}

// Preprocess user input (normalize and handle slang)
function preprocessInput(userMessage) {
    // Convert to lowercase to handle case insensitivity
    let normalizedMessage = userMessage.toLowerCase();

    // Handle common abbreviations or slang
    normalizedMessage = normalizedMessage.replace(/ka/g, "a"); // Replace "ka" with "a" (informal tagalog)
    normalizedMessage = normalizedMessage.replace(/penge/g, "send"); // Replace "penge" with "send"
    normalizedMessage = normalizedMessage.replace(/nga/g, "a"); // Replace "nga" with "a"

    return normalizedMessage;
}

// Function to get the bot's response based on user input
function getBotResponse(userMessage) {
    const preprocessedMessage = preprocessInput(userMessage); // Normalize user input
    const closestMatch = getClosestResponse(preprocessedMessage);
    return getRandomResponse(botReplies[closestMatch]);
}

// Function to pick a random response from the selected bot replies
function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

// Function to add a new message to the chat log
function addMessage(sender, message) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('chat-message', sender);

    const username = document.createElement('div');
    username.classList.add('username');
    username.textContent = sender === 'user' ? 'You' : 'PopMart Bot';
    messageContainer.appendChild(username);

    const messageDiv = document.createElement('div');
    messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageDiv.textContent = message;
    messageContainer.appendChild(messageDiv);

    chatLog.appendChild(messageContainer);
    chatLog.scrollTop = chatLog.scrollHeight; // Scroll to bottom
}

// Function to play a song
function playSong() {
    // Stop any previously playing audio
    if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0; // Reset the audio to the start
    }

    // Randomly select a song from the songs list
    const songUrl = songs[Math.floor(Math.random() * songs.length)];
    audioElement = document.createElement('audio');
    audioElement.src = songUrl;
    audioElement.controls = true;
    chatLog.appendChild(audioElement);

    audioElement.play().catch((error) => {
        console.log("Autoplay is blocked. User interaction required.", error);
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('chat-message', 'bot');
        messageContainer.textContent = "Tap the play button below to start the music 🎶.";
        chatLog.appendChild(messageContainer);
    });

    chatLog.scrollTop = chatLog.scrollHeight; // Scroll to bottom
}

// Function to stop the music
function stopMusic() {
    if (audioElement && !audioElement.paused) {
        audioElement.pause();
        audioElement.currentTime = 0; // Reset the audio to the start
    }
}

// Function to display an image
function displayImage() {
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('chat-message', 'bot'); // Bot-style message container

    const imgElement = document.createElement('img');
    imgElement.src = 'https://via.placeholder.com/300'; // Replace with your image URL
    imgElement.alt = 'Chatbot Image';
    imgElement.style.maxWidth = '100%';
    imgElement.style.borderRadius = '10px';
    imgElement.style.marginTop = '10px';

    imageContainer.appendChild(imgElement);
    chatLog.appendChild(imageContainer);
    chatLog.scrollTop = chatLog.scrollHeight; // Scroll to bottom
}

// Function to handle sending the message
async function handleSendMessage() {
    const userMessage = userInput.value.trim();
    if (userMessage !== "") {
        addMessage('user', userMessage); // Display user message

        // Check for "send a picture" in various forms of user input
        if (userMessage.toLowerCase().includes("send a picture") || userMessage.toLowerCase().includes("penge pic") || userMessage.toLowerCase().includes("send ka pic") || userMessage.toLowerCase().includes("send ka nga picture")) {
            displayImage(); // Display the picture if the command matches
        } else {
            const botMessage = getBotResponse(userMessage); // Generate bot response
            const simulatedMessage = await simulateTyping(botMessage); // Simulate typing
            addMessage('bot', simulatedMessage); // Display bot response
        }

        if (userMessage.toLowerCase().trim() === "play a song") playSong(); // Play the song
        if (userMessage.toLowerCase().trim() === "stop music") stopMusic(); // Stop the music

        userInput.value = ""; // Clear the input field
    }
}

// Simulate typing effect
function simulateTyping(message) {
    return new Promise((resolve) => {
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('chat-message', 'bot');
        typingIndicator.textContent = "PopMart Bot is typing...";
        chatLog.appendChild(typingIndicator);
        chatLog.scrollTop = chatLog.scrollHeight;

        setTimeout(() => {
            chatLog.removeChild(typingIndicator);
            resolve(message);
        }, 1000 + Math.random() * 1000); // Random typing delay
    });
}

// Add event listeners
sendButton.addEventListener('click', handleSendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSendMessage();
    }
});
