const sendButton = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatLog = document.getElementById('chat-log');

let audioElement; // Variable to track the audio element

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

// Function to pick a random response
function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

// Function to simulate typing effect
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

// Function to get bot response
function getBotResponse(userMessage) {
    const message = userMessage.toLowerCase().trim();
    if (botReplies[message]) {
        return getRandomResponse(botReplies[message]);
    }
    return getRandomResponse(botReplies["default"]);
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
    if (!audioElement) {
        audioElement = document.createElement('audio');
        audioElement.src = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'; // Replace with your song URL
        audioElement.controls = true;
        chatLog.appendChild(audioElement);
        audioElement.play();
        chatLog.scrollTop = chatLog.scrollHeight; // Scroll to bottom
    } else {
        audioElement.play();
    }
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

        const botMessage = getBotResponse(userMessage); // Generate bot response
        const simulatedMessage = await simulateTyping(botMessage); // Simulate typing
        addMessage('bot', simulatedMessage); // Display bot response

        // Special actions for specific commands
        if (userMessage.toLowerCase().trim() === "play a song") {
            playSong(); // Play the song
        }

        if (userMessage.toLowerCase().trim() === "stop music") {
            stopMusic(); // Stop the music
        }

        if (userMessage.toLowerCase().trim() === "send a picture") {
            displayImage(); // Display the picture
        }

        userInput.value = ""; // Clear the input field
    }
}

// Add event listeners
sendButton.addEventListener('click', handleSendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSendMessage();
    }
});
