// Chat bot functionality
document.addEventListener('DOMContentLoaded', function() {
    // Chat data and responses
    const botResponses = {
        'hello': 'Hi there! I\'m Marcus\'s virtual assistant. How can I help you today?',
        'hi': 'Hello! I\'m Marcus\'s virtual assistant. How can I help you today?',
        'hey': 'Hey there! I\'m Marcus\'s virtual assistant. How can I help you today?',
        'who is marcus': 'Marcus Ananta is a student at Santa Susana High School who was recognized as Student of the Year. He\'s an aspiring law student with a passion for debate and legal studies.',
        'student of the year': 'Yes, Marcus was recognized by Rotary as Santa Susana High School\'s Student of the Year for his academic excellence and community involvement!',
        'contact': 'You can contact Marcus through the form on this page or connect with him on social media.',
        'youtube': 'Check out Marcus\'s YouTube channel at https://www.youtube.com/@MarcAnanta',
        'instagram': 'You can find Marcus\'s achievements featured on Santa Susana High School\'s Instagram: https://www.instagram.com/santasusanahs/',
        'law school': 'Marcus is preparing for law school by participating in debate club, mock trial competitions, and community service activities.',
        'help': 'I can tell you about Marcus, his achievements, education plans, or how to contact him. Try asking something like "Who is Marcus?" or "How can I contact Marcus?"',
        'default': 'I\'m still learning! If you have specific questions about Marcus, his education, or achievements, I\'ll do my best to help.'
    };

    // Chat widget elements
    const chatIcon = document.getElementById('chat-icon');
    const chatWidget = document.getElementById('chat-widget');
    const closeChat = document.getElementById('close-chat');
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    // Toggle chat widget visibility
    chatIcon.addEventListener('click', function() {
        chatWidget.classList.add('open');
        // Add initial greeting if chat is empty
        if (chatMessages.children.length === 0) {
            addBotMessage("Hi there! I'm Marcus's virtual assistant. Ask me anything about Marcus, his achievements, or plans for law school!");
        }
    });

    closeChat.addEventListener('click', function() {
        chatWidget.classList.remove('open');
    });

    // Send message on button click
    sendButton.addEventListener('click', sendMessage);

    // Send message on Enter key
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Function to send user message and get bot response
    function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;

        // Add user message to chat
        addUserMessage(message);
        userInput.value = '';

        // Process message and get response after a small delay
        setTimeout(() => {
            const response = getBotResponse(message.toLowerCase());
            addBotMessage(response);
        }, 500);
    }

    // Function to add user message to chat
    function addUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'user-message';
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Function to add bot message to chat
    function addBotMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'bot-message';
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Function to get bot response based on user input
    function getBotResponse(input) {
        // Check for potential matches in the responses
        for (const key in botResponses) {
            if (input.includes(key)) {
                return botResponses[key];
            }
        }
        
        // Look for keywords
        if (input.includes('law') || input.includes('lawyer') || input.includes('attorney')) {
            return botResponses['law school'];
        } else if (input.includes('contact') || input.includes('email') || input.includes('message')) {
            return botResponses['contact'];
        } else if (input.includes('achievement') || input.includes('award') || input.includes('recognition')) {
            return botResponses['student of the year'];
        } else if (input.includes('youtube') || input.includes('video')) {
            return botResponses['youtube'];
        } else if (input.includes('instagram') || input.includes('social media')) {
            return botResponses['instagram'];
        } else if (input.includes('who') || input.includes('marcus')) {
            return botResponses['who is marcus'];
        } else if (input.includes('help') || input.includes('what')) {
            return botResponses['help'];
        }
        
        // Default response
        return botResponses['default'];
    }
}); 