// Chat bot functionality
document.addEventListener('DOMContentLoaded', function() {
    // Chat data and responses
    const botResponses = {
        'hello': 'Hi there! I\'m Marcus\'s virtual assistant. How can I help you today?',
        'hi': 'Hello! I\'m Marcus\'s virtual assistant. How can I help you today?',
        'hey': 'Hey there! I\'m Marcus\'s virtual assistant. How can I help you today?',
        'who is marcus': 'Marcus Ananta is a student at Santa Susana High School who was recognized as Student of the Year. He\'s an aspiring law student with a passion for debate and legal studies. He also offers tutoring services in various subjects.',
        'student of the year': 'Yes, Marcus was recognized by Rotary as Santa Susana High School\'s Student of the Year for his academic excellence and community involvement!',
        'contact': 'You can contact Marcus through the form on this page or connect with him on social media.',
        'youtube': 'Check out Marcus\'s YouTube channel at https://www.youtube.com/@MarcAnanta',
        'instagram': 'You can find Marcus\'s achievements featured on Santa Susana High School\'s Instagram: https://www.instagram.com/santasusanahs/',
        'law school': 'Marcus is preparing for law school by participating in debate club, mock trial competitions, and community service activities.',
        'tutor': 'Marcus offers tutoring services in subjects including English, History, Debate, and Pre-Law topics. Would you like to book a tutoring session? Type "book appointment" to schedule.',
        'tutoring': 'Marcus provides one-on-one tutoring sessions tailored to your needs. His areas of expertise include English, History, Debate, and Pre-Law topics. Type "book appointment" to schedule a session.',
        'book': 'I can help you book a tutoring appointment with Marcus. Please type "book appointment" to get started.',
        'book appointment': 'I\'ll help you schedule a tutoring session with Marcus. Please select one of the following subjects:<br><button class="booking-option" data-subject="English">English</button><button class="booking-option" data-subject="History">History</button><button class="booking-option" data-subject="Debate">Debate</button><button class="booking-option" data-subject="Pre-Law">Pre-Law</button>',
        'appointment': 'Would you like to schedule a tutoring session with Marcus? Type "book appointment" to get started.',
        'schedule': 'Marcus is available for tutoring appointments throughout the week. Type "book appointment" to schedule a session.',
        'help': 'I can tell you about Marcus, his achievements, education plans, tutoring services, or how to contact him. Try asking something like "Who is Marcus?" or "Tell me about tutoring services."',
        'default': 'I\'m still learning! If you have specific questions about Marcus, his education, tutoring services, or achievements, I\'ll do my best to help.'
    };

    // Available appointment slots
    const availableSlots = {
        'Monday': ['3:30 PM', '4:30 PM', '5:30 PM'],
        'Tuesday': ['4:00 PM', '5:00 PM', '6:00 PM'],
        'Wednesday': ['3:30 PM', '4:30 PM', '5:30 PM'],
        'Thursday': ['4:00 PM', '5:00 PM', '6:00 PM'],
        'Friday': ['3:30 PM', '4:30 PM', '5:30 PM']
    };

    // Booking state
    let bookingState = {
        inProgress: false,
        step: 0,
        subject: '',
        day: '',
        time: '',
        name: '',
        email: ''
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
            addBotMessage("Hi there! I'm Marcus's virtual assistant. Ask me anything about Marcus, his achievements, or book a tutoring session!");
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

    // Listen for booking option selections
    chatMessages.addEventListener('click', function(e) {
        if (e.target.classList.contains('booking-option')) {
            handleBookingOption(e.target);
        }
        
        if (e.target.classList.contains('booking-day')) {
            handleBookingDay(e.target);
        }
        
        if (e.target.classList.contains('booking-time')) {
            handleBookingTime(e.target);
        }
        
        if (e.target.classList.contains('booking-confirm')) {
            confirmBooking();
        }
        
        if (e.target.classList.contains('booking-cancel')) {
            cancelBooking();
        }
    });

    // Function to handle booking option selection
    function handleBookingOption(element) {
        const subject = element.getAttribute('data-subject');
        bookingState.inProgress = true;
        bookingState.step = 1;
        bookingState.subject = subject;
        
        // Generate day selection buttons
        let dayButtons = '';
        Object.keys(availableSlots).forEach(day => {
            dayButtons += `<button class="booking-day" data-day="${day}">${day}</button>`;
        });
        
        addBotMessage(`You selected ${subject} tutoring. Please select a day for your session:<br>${dayButtons}`);
    }
    
    // Function to handle day selection
    function handleBookingDay(element) {
        const day = element.getAttribute('data-day');
        bookingState.step = 2;
        bookingState.day = day;
        
        // Generate time selection buttons
        let timeButtons = '';
        availableSlots[day].forEach(time => {
            timeButtons += `<button class="booking-time" data-time="${time}">${time}</button>`;
        });
        
        addBotMessage(`You selected ${day}. Please select a time for your session:<br>${timeButtons}`);
    }
    
    // Function to handle time selection
    function handleBookingTime(element) {
        const time = element.getAttribute('data-time');
        bookingState.step = 3;
        bookingState.time = time;
        
        addBotMessage(`
            <div class="booking-form">
                <p>Please provide your information to book a ${bookingState.subject} tutoring session on ${bookingState.day} at ${bookingState.time}:</p>
                <div class="booking-input-group">
                    <label for="booking-name">Name:</label>
                    <input type="text" id="booking-name" placeholder="Your name">
                </div>
                <div class="booking-input-group">
                    <label for="booking-email">Email:</label>
                    <input type="email" id="booking-email" placeholder="Your email">
                </div>
                <div class="booking-buttons">
                    <button class="booking-confirm">Confirm Booking</button>
                    <button class="booking-cancel">Cancel</button>
                </div>
            </div>
        `);
    }
    
    // Function to confirm booking
    function confirmBooking() {
        const nameInput = document.getElementById('booking-name');
        const emailInput = document.getElementById('booking-email');
        
        if (!nameInput.value.trim() || !emailInput.value.trim()) {
            addBotMessage("Please provide both your name and email to complete the booking.");
            return;
        }
        
        bookingState.name = nameInput.value.trim();
        bookingState.email = emailInput.value.trim();
        
        // In a real application, you would send this data to a server
        addBotMessage(`
            <div class="booking-confirmation">
                <p><strong>Booking Confirmed!</strong></p>
                <p>Your tutoring session has been scheduled:</p>
                <ul>
                    <li><strong>Subject:</strong> ${bookingState.subject}</li>
                    <li><strong>Day:</strong> ${bookingState.day}</li>
                    <li><strong>Time:</strong> ${bookingState.time}</li>
                    <li><strong>Name:</strong> ${bookingState.name}</li>
                    <li><strong>Email:</strong> ${bookingState.email}</li>
                </ul>
                <p>Marcus will send you a confirmation email shortly. Thank you!</p>
            </div>
        `);
        
        // Reset booking state
        resetBookingState();
    }
    
    // Function to cancel booking
    function cancelBooking() {
        addBotMessage("Booking cancelled. How else can I help you today?");
        resetBookingState();
    }
    
    // Reset booking state
    function resetBookingState() {
        bookingState = {
            inProgress: false,
            step: 0,
            subject: '',
            day: '',
            time: '',
            name: '',
            email: ''
        };
    }

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
        messageElement.innerHTML = message; // Using innerHTML to allow HTML content for booking forms
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
        if (input.includes('tutor') || input.includes('teaching') || input.includes('learn')) {
            return botResponses['tutor'];
        } else if (input.includes('appointment') || input.includes('book') || input.includes('schedule') || input.includes('session')) {
            return botResponses['book appointment'];
        } else if (input.includes('law') || input.includes('lawyer') || input.includes('attorney')) {
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