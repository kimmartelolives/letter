const sendButton = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatLog = document.getElementById('chat-log');

let audioElement; 


const images = [
    'https://i.pinimg.com/originals/75/b3/c8/75b3c8eca95d917c650cd574b91db7f7.gif',
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


const songs = [
    'happier.mp3',
    'bewithu.mp3',
    'espresso.mp3',
    'nonsense.mp3',
    'taste.mp3',
    'good4u.mp3',
    'feather.mp3',
    'dilaw.mp3'
    

];


const random = [
    "aklsmfklamgkxmkqkmkeqmkv ang lag",
    "Kamusta naman araw mo?",
    "Ayos!",
    "Aba! Bakit may maganda dito?",
    "HAAHHHHAHAHAHAAA wala lang random tawa lang",
    "Omchim",
    "Type mo lang 'bye' sa chat kung want mo bumalik sa letter",
    "Ayos ba?",
    "Good luck Future RN laban lang boss lapit na!",
    "Nakuha mo na ano ang password?",
];


const jokes = [
    "Ilang coke pa ba? Ang kailangan kong inumin para ma mismo ko?",
    "Sa dami kong memes na nakita sa soc med, pero ikaw pa rin ang na-memes ko!",
    "Wala na intro intro! Ang ganda mo!",
    "Lahat ng tao iba iba ang pananaw, katulad q walang ibang tinatanaw kundi ikaw!",
    "Grabe talaga nakakalunod ang kagandahan mo!",
    "Bagay na mahirap gawin: #1 Mag kunwaring di ka miss."
];


const botReplies = {
    "hi": [
        "Hello! Kamusta naman araw mo? 😀",
        "Hi!",
        "Hello ganda! Kamusta? 🥰"
    ],
    "hello": [
        "Hello! Kamusta? 🤗",
        "Hi! Okie ka lang ba? Kamusta naman?",
        "Hi! Kamusta?"
    ],
    "password": [
        "Uu password!",
        "Hulaan mo dali!",
        "Yes password!"
    ],
    "pass": [
        "Uu password!",
        "Hulaan mo dali!",
        "Yes password!"
    ],
    "haha": [
        "Happy yarn? Ok yan ganyan lang lagi!",
        "HAHAAHAHAHAAHAHA",
        "HGJAKHDHGAHHGAH"
    ],
    "hahahaha": [
        "Happy yarn? Ok yan ganyan lang lagi!",
        "HAHAHAHAHAHAHAHAAHAHA gew",
        "HGJAKHDJHAGDGHDHGAHHGAH"
    ],
    "hahaha": [
        "Happy yarn? Ok yan ganyan lang lagi!",
        "HAHAHAHAHAHAHAHAAHAHA gew",
        "HGJAKHDJHAGDGHDHGAHHGAH"
    ],
    "cute": [
        "Uu parang ikaw no?",
        "Pero mas cute ka naman e",
        "Naul ang cute! 🤭"
    ],
    "ang cute": [
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
    "baby": [
        "Weh? Kung ganon ako na mismo kausapin mo hindi 'to!!!",
        "Osige sure yan ah? Message mo ako now na!!!",
        "..... *blush*"
    ],
    "lag": [
        "Ang lag ko bulok net hays",
        "Tapon ko na 'to",
        "Hays laggers"
    ],
    "sinisigawan mo ako": [
        "Hindi boss",
    ],
    "baliw ka": [
        "Mana lang sayo hays",
        "Uu mana lang sayo kaya ganon",
        "Bakit ba?! Eh mana lang sayo!"
    ],
    "laro": [
        "Tara laro audi para madurog kita!",
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
    "ayos lang": [
        "Sure na okay ka lang?",
        "Okie ngiti ka kaya muna yan ang ganda talaga!",
        "Buti naman na okay ka lang!"
    ],
    "pagod": [
        "Pagod ang baby na yan? asfnjasnjknxjacl 🫣",
        "Pahinga ka muna nandito lang naman ako hehe 😌",
        "Wala naman masakit sayo? Masahe kita HAHAHAAhahaa 😜"
    ],
    "che": [
        "Hala siya ASDKLAJDSAJJSAFJS",
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
    "tama": [
        "Yes naman!",
    ],
    "ty": [
        "Thank you ka diyan?! 1k lang bayad 😆",
    ],
    "gusto kita": [
        "Weh? Talaga ba? Ako matagal na gusto kita HAHAHAHAHAHABAABADB 😖",
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
        "MARTEL v1.0 - 🤖 developed by Kim Martel Olives"
    ],
    "about": [
        "MARTEL v1.0 - 🤖 developed by Kim Martel Olives"
    ],
    "i love you": [
        "Sure yan? Walang bawian? fr fr?"
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
    "wow": [  
        "Ayos ba?",
        "Bakit? HAHAHAHA"
    ],
    "edi wow": [  
        "Ayos ba?",
        "Bakit? HAHAHAHA"
    ],
    "rosaura": [  
        "Ang ganda talaga jusko!",
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
    "ano name": [  
        "Pangalan ko? Martel boss!",
    ],
    "bbm ka": [  
        "Basta BBM! Pukingina mga yan! Salot! Pwe!",
        "HAHAHAHAHAHAH salot"
    ],
    "bbm": [  
        "Basta BBM! Pukingina mga yan! Salot! Pwe!",
        "HAHAHAHAHAHAH salot"
    ],
    "maka bbm ka ba": [  
        "Basta BBM! Pukingina mga yan! Salot! Pwe!",
        "HAHAHAHAHAHAH salot"
    ],
    "fan ka ni bbm": [  
        "Basta BBM! Pukingina mga yan! Salot! Pwe!",
        "HAHAHAHAHAHAH salot"
    ],
    "ano favorite mo": [  
        "Ikaw",
    ],
    "ano fave mo": [  
        "Ikaw",
    ],
    "gutom ako": [  
        "Tara kain tayo? Saan ba gusto mo",
    ],
    "kain tayo": [  
        "Tara!",
    ],
  
    "play tic-tac-toe": [
        "Let me pull up a Tic-Tac-Toe game for you. 🎮"
    ],

    "default": [
        "Hmm, Try mo etong nasa below na mga suggestions",
        "Ok check mo below suggestions, but I'm here to help!",
        "Wait sorry? Ano ulit? HAHAHAHA!"
    ]
};



let currentPlayer = 'X'; // User starts
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Handle cell click to make a move
function handleCellClick(cell, index) {
    if (gameBoard[index] !== '' || !gameActive || currentPlayer === 'O') return; // Block if AI's turn

    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    checkGameStatus();
    
    if (gameActive) {
        currentPlayer = 'O'; 
        aiMove(); 
    }
}

// AI's move (Minimax algorithm)
function aiMove() {
    let bestMove = minimax(gameBoard, 'O');
    let index = bestMove.index;
    gameBoard[index] = 'O';
    

    const cell = document.querySelector(`[data-index="${index}"]`);
    cell.textContent = 'O';
    
    checkGameStatus();
    if (gameActive) {
        currentPlayer = 'X'; // Switch back to player
    }
}

// Minimax algorithm to find the best move
function minimax(board, player) {
    let emptyCells = getEmptyCells(board);
    if (checkWinner(board, 'X')) return { score: -10 };
    if (checkWinner(board, 'O')) return { score: 10 };
    if (emptyCells.length === 0) return { score: 0 };

    let moves = [];
    emptyCells.forEach(cell => {
        let move = { index: cell };
        board[cell] = player;

        if (player === 'O') {
            move.score = minimax(board, 'X').score;
        } else {
            move.score = minimax(board, 'O').score;
        }

        board[cell] = ''; 
        moves.push(move);
    });

  
    let bestMove;
    if (player === 'O') {
        let bestScore = -Infinity;
        moves.forEach(move => {
            if (move.score > bestScore) {
                bestScore = move.score;
                bestMove = move;
            }
        });
    } else {
        let bestScore = Infinity;
        moves.forEach(move => {
            if (move.score < bestScore) {
                bestScore = move.score;
                bestMove = move;
            }
        });
    }

    return bestMove;
}


function getEmptyCells(board) {
    return board.reduce((acc, val, index) => {
        if (val === '') acc.push(index);
        return acc;
    }, []);
}

// Check if a player has won
function checkWinner(board, player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    return winPatterns.some(pattern => {
        return pattern.every(index => board[index] === player);
    });
}


function checkGameStatus() {
    if (checkWinner(gameBoard, 'X')) {
        alert('You win! 🎉 Great job!');
        botResponse('Grabe ang lakas ah! 🎉');
        gameActive = false;
    } else if (checkWinner(gameBoard, 'O')) {
        alert('Martel wins! 😎 Better luck next time!');
        botResponse('HAHAHAHA, Ez win! 😎 Galingan mo naman?');
        gameActive = false;
    } else if (!gameBoard.includes('')) {
        alert('It\'s a draw! 🤝');
        botResponse('Patas lang pala draw HAHAHAHAHA');
        gameActive = false;
    }
}


function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    const cells = document.querySelectorAll('.tic-tac-toe-cell');
    cells.forEach(cell => {
        cell.textContent = '';
    });
}


document.querySelectorAll('.tic-tac-toe-cell').forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(cell, index));
});


document.getElementById('reset-game').addEventListener('click', resetGame);

document.getElementById('close-game').addEventListener('click', () => {
    document.getElementById('tic-tac-toe-game').style.display = 'none'; // Hide the game
});


function botResponse(message) {
    const chatLog = document.getElementById('chat-log');
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('chat-message', 'bot');

    const senderName = document.createElement('div');
    senderName.classList.add('username');
    senderName.textContent = "Martel";
    messageContainer.appendChild(senderName);

    const botMessage = document.createElement('div');
    botMessage.classList.add('bot-message');
    botMessage.textContent = message;

    

    messageContainer.appendChild(botMessage);
    chatLog.appendChild(messageContainer);

    const timeDiv = document.createElement('div');
    timeDiv.classList.add('message-time');
    timeDiv.textContent = getCurrentTime();
    messageContainer.appendChild(timeDiv);

    chatLog.scrollTop = chatLog.scrollHeight; // Scroll to bottom
}













// Function to get the current time in Philippine Standard Time (PST)
function getCurrentTime() {
    const options = { timeZone: 'Asia/Manila', hour: '2-digit', minute: '2-digit', hour12: true };
    const currentTime = new Date().toLocaleString('en-US', options);
    return currentTime; 
}



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


function handleMartelResponse() {
  
    const randomImageUrl = martel[Math.floor(Math.random() * martel.length)];
    
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('chat-message', 'bot');

    const imgElement = document.createElement('img');
    imgElement.src = randomImageUrl; 
    imgElement.alt = 'Chatbot Image';


    imgElement.style.maxWidth = '300px'; 
    imgElement.style.width = '100%'; 
    imgElement.style.height = 'auto';
    imgElement.style.borderRadius = '10px';
    imgElement.style.marginTop = '10px';

    imageContainer.appendChild(imgElement);
    chatLog.appendChild(imageContainer);
    chatLog.scrollTop = chatLog.scrollHeight; 
}


function handleKimResponse() {
    
    const randomImageUrl = kim[Math.floor(Math.random() * kim.length)];
    
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('chat-message', 'bot'); 

    const imgElement = document.createElement('img');
    imgElement.src = randomImageUrl; 
    imgElement.alt = 'Chatbot Image';


    imgElement.style.maxWidth = '300px'; 
    imgElement.style.width = '100%'; 
    imgElement.style.height = 'auto'; 
    imgElement.style.borderRadius = '10px';
    imgElement.style.marginTop = '10px';

    imageContainer.appendChild(imgElement);
    chatLog.appendChild(imageContainer);
    chatLog.scrollTop = chatLog.scrollHeight; 
}


function getClosestResponse(userMessage) {
    let bestMatch = { key: "default", similarity: 0 };

    Object.keys(botReplies).forEach((key) => {
        const similarity = 1 - calculateLevenshtein(userMessage, key) / Math.max(userMessage.length, key.length);
        if (similarity > bestMatch.similarity) {
            bestMatch = { key, similarity };
        }
    });

   
    return bestMatch.similarity > 0.5 ? bestMatch.key : "default"; 
}


function preprocessInput(userMessage) {

    let normalizedMessage = userMessage.toLowerCase();

  
    normalizedMessage = normalizedMessage.replace(/ka/g, "a"); 
    normalizedMessage = normalizedMessage.replace(/penge/g, "send"); 
    normalizedMessage = normalizedMessage.replace(/nga/g, "a");

    return normalizedMessage;
}


function getBotResponse(userMessage) {
    const preprocessedMessage = preprocessInput(userMessage);
    const closestMatch = getClosestResponse(preprocessedMessage);
    
   
    if (closestMatch === "bye") {
        setTimeout(() => {
           
            window.location.href = "index.html"; 
        }, 2000); 
    }

   
     if (preprocessedMessage.includes("martel")) {
        handleMartelResponse();  
        return getRandomResponse(botReplies["martel"]);  
    }

  
     if (preprocessedMessage.includes("kim")) {
        handleKimResponse();  
        return getRandomResponse(botReplies["kim"]); 
    }

    return getRandomResponse(botReplies[closestMatch]);
}


function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}


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
    chatLog.scrollTop = chatLog.scrollHeight; 


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


function handleSuggestionClick(action) {
    if (action === 'play_a_song') {
        playSong(); 
    } else if (action === 'send_a_picture') {
        displayImage();
    } else if (action === 'stop_music') {
        stopMusic();
    } else if (action === 'make_a_joke') {
        makeJoke();
    } else if (action === 'play_tic_tac_toe') {
    displayTicTacToeGame(); 
}
}



function displayTicTacToeGame() {
    const gameContainer = document.getElementById('tic-tac-toe-game');
    gameContainer.style.display = 'block'; 
}


function makeJoke() {
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    addMessage('bot', randomJoke, [
        { text: 'More Pickup lines 😂', action: 'make_a_joke' }
    ]); 

    chatLog.scrollTop = chatLog.scrollHeight; 
}

function playSong() {
    if (audioElement) {
       
        audioElement.pause();
        audioElement.currentTime = 0; 
    }
    

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

    chatLog.scrollTop = chatLog.scrollHeight;

 
    const confirmationMessage = "I’m playing a song for you now 🎶. Enjoy!";
    addMessage('bot', confirmationMessage, [
        { text: 'Stop music 🎧', action: 'stop_music' }
    ]); 
}


function stopMusic() {
    if (audioElement && !audioElement.paused) {
        audioElement.pause();
        audioElement.currentTime = 0;
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('chat-message', 'bot');
        messageContainer.textContent = "Music stopped. Let me know if you'd like me to play something else!";
        addMessage('bot', messageContainer.textContent); 
    }
}

function displayImage() {
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('chat-message', 'bot'); 

  
    const randomImageUrl = images[Math.floor(Math.random() * images.length)];

    const imgElement = document.createElement('img');
    imgElement.src = randomImageUrl; 
    imgElement.alt = 'Chatbot Image';

      imgElement.style.maxWidth = '300px'; 
      imgElement.style.width = '100%'; 
      imgElement.style.height = 'auto'; 
      imgElement.style.borderRadius = '10px';
      imgElement.style.marginTop = '10px';
  
      
      imageContainer.appendChild(imgElement);
      chatLog.appendChild(imageContainer);
      chatLog.scrollTop = chatLog.scrollHeight; 

    
}

async function handleSendMessage() {
    const userMessage = userInput.value.trim();
    if (userMessage !== "") {
        addMessage('user', userMessage); 

        const botMessage = getBotResponse(userMessage);
        const suggestions = [
            { text: 'Pickup lines 😂', action: 'make_a_joke' },
            { text: 'Play a random song 🎶', action: 'play_a_song' }, 
            { text: 'Send a random cat 🖼️', action: 'send_a_picture' },
            { text: 'Stop music 🎧', action: 'stop_music' },
            { text: 'Play Tic-Tac-Toe 🎮', action: 'play_tic_tac_toe' }
        ];

        userInput.value = ""; 
        const simulatedMessage = await simulateTyping(botMessage);
        addMessage('bot', botMessage, suggestions);
        chatLog.scrollTop = chatLog.scrollHeight; 
        
    }
}


function startRandomResponses() {
    setInterval(() => {
        const randomResponse = getRandomResponse(random);
        addMessage('bot', randomResponse); 
    }, 50000); 
}


startRandomResponses();


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
        }, 1000 + Math.random() * 1000); 
    });
}


sendButton.addEventListener('click', handleSendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSendMessage();
    }
});

function sendGreetingMessage() {
    const greetingMessage = "Hello! Rosaura! Ang ganda mo naman!";
    addMessage('bot', greetingMessage);
}

sendGreetingMessage();
