const sendButton = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatLog = document.getElementById('chat-log');

let audioElement; // Variable to track the audio element

// List of image URLs (You can add more image URLs here)
const images = [
    'https://i.pinimg.com/originals/75/b3/c8/75b3c8eca95d917c650cd574b91db7f7.gif', // Original image
    'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3UzeTJ2YnB4NGJydmlpcjNjZmExYXV0Zm13MG1oZjBjM2FuZHpqaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/PUBxelwT57jsQ/giphy.gif',
    'https://media1.tenor.com/m/zlKoX5HPPu8AAAAC/cat-annoyed.gif',
    'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGF2a2wxc2JoYzd2b2c3MmpvcTY2ZWM5N3lidm5lYnRpYzZ6MG1hOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/gVsmn4qdyBn1Bra2tN/giphy.gif',
    'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGFvNGI3andqcnllMjVvN3hkejZyMmtrbzVya2FzajRnYjlvaTF4ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kVlLRtRWAVsDC/giphy.gif',
    'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWFib3BwMDBxcG1jb3c4eTJiajVmOTVraGg3eDUxcGx3MXBrbHh2aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/euMphY08JNims/giphy.gif',
    'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmRvNHp6cnlzMjU3MTR4cHJrb2RwaWEzazV5NGljeDFmbzR6dm1lbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/GUdouh1kQMHddy32ks/giphy.gif',
    'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTR1ODJuOXliemFla2Fvd3d2bG9wcnd6am9pYW5zNzMzdDFndDl5YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/liamKgDNyZi3C/giphy.gif',
    'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWp2aGdncWJnaW5icWJmaGxrN3RzemEwcjZuYXlia2p1MmRhNjljdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/CgIeq5ekpE5uzARb4O/giphy.gif',
];

// martel images
const martel = [
    'ura.gif',
    'ura.gif',

];

// kim images
const kim = [
    '1.jpg',
    '2.jpg',
    '3.jpg'

];

// List of song URLs (you can replace these with actual URLs)
const songs = [
    'happier.mp3',
    'bewithu.mp3',
    'espresso.mp3',
    'nonsense.mp3',
    'taste.mp3',
    'good4u.mp3',
    'feather.mp3'
    

];

// List of random response
const random = [
    "aklsmfklamgkxmkqkmkeqmkv ang lag",
    "Kamusta naman araw mo?",
    "Ayos!",
    "Aba! Bakit may maganda dito?",
    "HAAHHHHAHAHAHAAA wala lang random tawa lang",
    "Omchim",
    "Gew",
    "Ayos ba?",
    "Good luck Future RN laban lang boss lapit na!",
];

// List of jokes (you can add more jokes here)
const jokes = [
    "Ilang coke pa ba? Ang kailangan kong inumin para ma mismo ko?",
    "Sa dami kong memes na nakita sa soc med, pero ikaw pa rin ang na-memes ko!",
    "Wala na intro intro! Ang ganda mo!",
    "Lahat ng tao iba iba ang pananaw, katulad q walang ibang tinatanaw kundi ikaw!",
    "Grabe talaga nakakalunod ang kagandahan mo!",
    "Bagay na mahirap gawin: #1 Mag kunwaring di ka miss."
];

// Dynamic bot replies
const botReplies = {
    "hi": [
        "Hello! Kamusta naman araw mo? 😀",
        "Hi! Ano trip natin ngayon boss?! 😎",
        "Hello ganda! Kamusta? 🥰"
    ],
    "hello": [
        "Hello! Kamusta? 🤗",
        "Hi! Okie ka lang ba? Kamusta naman?",
        "Hi! Kamusta?"
    ],
    "cute": [
        "Uu parang ikaw no?",
        "Pero mas cute ka naman e",
        "Naul ang cute! 🤭"
    ],
    "wala": [
        "Alam ko wala sasabihin mo hay nako eto mga suggestion: 😉",
        "Wala ka diyan?! Sakalin kaya kita! 😁",
        "Osige eto oh try mo. 🥳"
    ],
    "wala naman": [
        "Alam ko wala sasabihin mo hay nako eto mga suggestion: 😒",
        "Wala ka diyan?! Sakalin kaya kita!",
        "Osige wala pala ah eto oh."
    ],
    "baby mo ako": [
        "Weh? Kung ganon ako na mismo kausapin mo hindi 'to!!!",
        "Osige sure yan ah? Message mo ako now na!!!",
        "..... *blush*"
    ],
    "kamusta": [
        "Kung want mo ako kamustahin i-chat mo kaya ako now na!",
        "Eto miss ka. NABAJBAJBABAJANAWNHAHA ikaw ba?",
        "Ayos naman! Ikaw ba?"
    ],
    "okay lang": [
        "Sure na okay ka lang?",
        "Okie ngiti ka kaya muna yan ang ganda talaga!",
        "Buti naman na okay ka lang!"
    ],
    "pagod": [
        "Pagod ang baby na yan? Pwede ba kita gawing baby ko! asfnjasnjknxjacl 🫣",
        "Pahinga ka muna nandito lang naman ako hehe 😌",
        "Wala naman masakit sayo? Masahe kita HAHAHAAhahaa 😜"
    ],
    "che": [
        "Damot naman!!!!!!!",
        "HAHAHAHAHAHJBANJABNAJAHAMKFSKS",
        "Grabe naman HAAMHKAMHKAHMKAMHK 😾"
    ],
    "char": [
        "Sabay char tsk tsk",
        "HAHAHAHAHAHJBANJABNAJAHAMKFSKS",
        "Ayos ah HAHAHAHAHAHAHA sige na!"
    ],
    "weh": [
        "Uu ako pa ba? Ako na 'to eh",
        "Oo naman yes! Totoo!",
        "All in pati pamato sure yon HAHAHAHAHA"
    ],
    "ty": [
        "Thank you ka diyan?! 1k lang bayad 😆",
    ],
    "thank you": [
        "Thank you ka diyan?! 1k lang bayad 😆",
    ],
    "lungkot": [
        "Malungkot yarn? Wag kana malungkot maganda ka naman e",
    ],
    "lungcoat": [
        "Malungkot yarn? Wag kana malungkot maganda ka naman e",
    ],
    "sino ka": [
        "MARTEL AI v1.0 - Bot 🤖 developed by Kim Martel Olives"
    ],
    "about": [
        "MARTEL AI v1.0 - Bot 🤖 developed by Kim Martel Olives"
    ],
    "i love you": [
        "Sure yan? Walang bawian? Hindi joke? I Love You Too! 😽"
    ],
    "i like you": [
        "Weh? Talaga ba? Ako matagal na gusto kita HAHAHAHAHAHABAABADB 😖"
    ],
    "bye": [
        "Goodbye! Have a wonderful day!",
        "See you later! Take care.",
        "Bye! Don't hesitate to chat again. See you on the homepage!"
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
    "kim": [  
        "I have a special image just for you, please don't laugh! Hahahaha! 🖼️",
        "Jusko po nakakahiya HAHAAHAHAHA"
    ],
    "martel": [  
        "Here’s a special picture just for you! 🖼️",
        "You mentioned 'martel'! Take a look at this! 👀"
    ],
    "rosaura": [  
        "Ang ganda!",
    ],
    "uu": [  
        "Weh?",
    ],
    "oo": [  
        "Talaga ba?",
    ],
    "saura": [  
        "Matik ang ganda talaga!",
    ],
    "default": [
        "Hmm, Try mo etong nasa below na mga suggestions",
        "Ok check mo below suggestions, but I'm here to help!",
        "Wait sorry? Ano ulit? HAHAHAHA!"
    ]
};

// Function to get the current time in Philippine Standard Time (PST)
function getCurrentTime() {
    const options = { timeZone: 'Asia/Manila', hour: '2-digit', minute: '2-digit', hour12: true };
    const currentTime = new Date().toLocaleString('en-US', options);
    return currentTime; // Format: "HH:mm"
}


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

// Function to handle the "kim" response and send a picture
function handleMartelResponse() {
    // Send a random image from the images list
    const randomImageUrl = martel[Math.floor(Math.random() * martel.length)];
    
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('chat-message', 'bot'); // Bot-style message container

    const imgElement = document.createElement('img');
    imgElement.src = randomImageUrl; // Set random image URL
    imgElement.alt = 'Chatbot Image';

    // Adjust the width and height for resizing the image
    imgElement.style.maxWidth = '300px'; // Max width of 300px (you can change this value)
    imgElement.style.width = '100%'; // Set width to 100% so it scales well within the container
    imgElement.style.height = 'auto'; // Maintain the aspect ratio
    imgElement.style.borderRadius = '10px';
    imgElement.style.marginTop = '10px';

    imageContainer.appendChild(imgElement);
    chatLog.appendChild(imageContainer);
    chatLog.scrollTop = chatLog.scrollHeight; // Scroll to bottom
}

// Function to handle the "kim" response and send a picture
function handleKimResponse() {
    // Send a random image from the images list
    const randomImageUrl = kim[Math.floor(Math.random() * kim.length)];
    
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('chat-message', 'bot'); // Bot-style message container

    const imgElement = document.createElement('img');
    imgElement.src = randomImageUrl; // Set random image URL
    imgElement.alt = 'Chatbot Image';

    // Adjust the width and height for resizing the image
    imgElement.style.maxWidth = '300px'; // Max width of 300px (you can change this value)
    imgElement.style.width = '100%'; // Set width to 100% so it scales well within the container
    imgElement.style.height = 'auto'; // Maintain the aspect ratio
    imgElement.style.borderRadius = '10px';
    imgElement.style.marginTop = '10px';

    imageContainer.appendChild(imgElement);
    chatLog.appendChild(imageContainer);
    chatLog.scrollTop = chatLog.scrollHeight; // Scroll to bottom
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
    
    // If the bot responds with "bye", redirect to index.html
    if (closestMatch === "bye") {
        setTimeout(() => {
            window.location.href = "index.html"; // Redirect to the home page
        }, 1500); // Delay redirection for 1.5 seconds
    }

     // Check if the message contains the word "martel"
     if (preprocessedMessage.includes("martel")) {
        handleMartelResponse();  // Trigger the function to display the image
        return getRandomResponse(botReplies["martel"]);  // Return a random response from the "kim" replies
    }

     // Check if the message contains the word "kim"
     if (preprocessedMessage.includes("kim")) {
        handleKimResponse();  // Trigger the function to display the image
        return getRandomResponse(botReplies["kim"]);  // Return a random response from the "kim" replies
    }

    return getRandomResponse(botReplies[closestMatch]);
}

// Function to pick a random response from the selected bot replies
function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

// Function to add a new message to the chat log
function addMessage(sender, message, suggestions = []) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('chat-message', sender);

    const username = document.createElement('div');
    username.classList.add('username');
    username.textContent = sender === 'user' ? 'You' : 'Martel';
    messageContainer.appendChild(username);

    const messageDiv = document.createElement('div');
    messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageDiv.textContent = message;
    messageContainer.appendChild(messageDiv);

    const timeDiv = document.createElement('div');
    timeDiv.classList.add('message-time');
    timeDiv.textContent = getCurrentTime();
    messageContainer.appendChild(timeDiv);

    chatLog.appendChild(messageContainer);
    chatLog.scrollTop = chatLog.scrollHeight; // Scroll to bottom

    // Add suggestions (text links)
    if (suggestions.length > 0) {
        const suggestionsContainer = document.createElement('div');
        suggestionsContainer.classList.add('suggestions');
        
        suggestions.forEach(suggestion => {
            const suggestionText = document.createElement('span');
            suggestionText.classList.add('suggestion-text');
            suggestionText.textContent = suggestion.text;
            suggestionText.addEventListener('click', () => handleSuggestionClick(suggestion.action));
            suggestionsContainer.appendChild(suggestionText);
        });

        messageContainer.appendChild(suggestionsContainer);
    }
}

// Function to handle suggestion text click
function handleSuggestionClick(action) {
    if (action === 'play_a_song') {
        playSong(); // Call the playSong function when "Play a song" is clicked
    } else if (action === 'send_a_picture') {
        displayImage();
    } else if (action === 'stop_music') {
        stopMusic();
    } else if (action === 'make_a_joke') {
        makeJoke();
    }
}

// Function to make a random joke
function makeJoke() {
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    addMessage('bot', randomJoke, [
        { text: 'Pickup lines 😂', action: 'make_a_joke' }
    ]); 

    chatLog.scrollTop = chatLog.scrollHeight; // Scroll to bottom

}

// Function to play a song
function playSong() {
    if (audioElement) {
        // If a song is already playing, stop it and reset the audio element
        audioElement.pause();
        audioElement.currentTime = 0; // Reset the audio
    }
    
    // Randomly select a song from the songs list
    const songUrl = songs[Math.floor(Math.random() * songs.length)];

    // Create a new audio element for each song
    audioElement = document.createElement('audio');
    audioElement.src = songUrl;
    audioElement.controls = true;
    chatLog.appendChild(audioElement); // Append the audio player to chat

    // Play the audio
    audioElement.play().catch((error) => {
        console.log("Autoplay is blocked. User interaction required.", error);
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('chat-message', 'bot');
        messageContainer.textContent = "Tap the play button below to start the music 🎶.";
        chatLog.appendChild(messageContainer);
    });

    chatLog.scrollTop = chatLog.scrollHeight; // Scroll to bottom

    // Send confirmation response after playing the song
    const confirmationMessage = "I’m playing a song for you now 🎶. Enjoy!";
    addMessage('bot', confirmationMessage, [
        { text: 'Stop music 🎧', action: 'stop_music' }
    ]); // Add "Stop music" suggestion
}

// Function to stop the music
function stopMusic() {
    if (audioElement && !audioElement.paused) {
        audioElement.pause();
        audioElement.currentTime = 0; // Reset the audio to the start
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('chat-message', 'bot');
        messageContainer.textContent = "Music stopped. Let me know if you'd like me to play something else!";
        addMessage('bot', messageContainer.textContent); // Confirm stopping music
    }
}

function displayImage() {
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('chat-message', 'bot'); // Bot-style message container

    // Randomly select an image from the list
    const randomImageUrl = images[Math.floor(Math.random() * images.length)];

    const imgElement = document.createElement('img');
    imgElement.src = randomImageUrl; // Set random image URL
    imgElement.alt = 'Chatbot Image';

      // Adjust the width and height for resizing the image
      imgElement.style.maxWidth = '300px'; // Max width of 300px (you can change this value)
      imgElement.style.width = '100%'; // Set width to 100% so it scales well within the container
      imgElement.style.height = 'auto'; // Maintain the aspect ratio
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
        const suggestions = [
            { text: 'Pickup lines 😂', action: 'make_a_joke' },
            { text: 'Play a random song 🎶', action: 'play_a_song' }, // Play a song suggestion
            { text: 'Send a random cat 🖼️', action: 'send_a_picture' },
            { text: 'Stop music 🎧', action: 'stop_music' }
        ];

        userInput.value = ""; // Clear the input field
        const simulatedMessage = await simulateTyping(botMessage); // Simulate typing
        addMessage('bot', botMessage, suggestions); // Display bot response with suggestions
        chatLog.scrollTop = chatLog.scrollHeight; // Scroll to bottom
        
    }
}

// Function to trigger random responses every 5 seconds
function startRandomResponses() {
    setInterval(() => {
        const randomResponse = getRandomResponse(random);
        addMessage('bot', randomResponse); // Send random response every 30 seconds
    }, 50000); 
}

// Start random responses when the bot loads
startRandomResponses();

// Simulate typing effect
function simulateTyping(message) {
    return new Promise((resolve) => {
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('chat-message', 'bot');
        typingIndicator.textContent = "Martel is typing...";
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

function sendGreetingMessage() {
    const greetingMessage = "Hello! Rosaura! Ang ganda mo naman!";
    addMessage('bot', greetingMessage); // Send greeting message
}

// Call sendGreetingMessage when the page loads
sendGreetingMessage();
