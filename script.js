document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.nav-container');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });

    // Replace YouTube placeholder images with actual thumbnails
    // IMPORTANT: Replace these example video IDs with actual IDs from Marcus's channel
    // You can get video IDs from any YouTube video URL after the "v=" parameter
    // For example, in https://www.youtube.com/watch?v=ABCDEFG, the ID is ABCDEFG
    const youtubeThumbnails = [
        {
            // Marcus's actual YouTube video
            videoId: '4L-YRuEgWhM', 
            title: 'Marcus Ananta YouTube Video',
            date: 'March 2024',
            views: '8.7K',
            likes: '723',
            url: 'https://www.youtube.com/watch?v=4L-YRuEgWhM' // Actual video URL
        },
        {
            // This is a placeholder video ID - replace with actual video ID from Marcus's channel
            videoId: 'h1LpKvFj-Rg',
            title: 'My Experience Volunteering at a Legal Aid Clinic | High School Pre-Law Journey',
            date: 'January 30, 2024',
            views: '4.9K',
            likes: '512',
            url: 'https://www.youtube.com/@MarcAnanta' // Replace with actual video URL
        }
    ];
    
    // Get all YouTube card placeholders
    const youtubeCards = document.querySelectorAll('.social-card.youtube');
    
    // Replace placeholders with actual thumbnails
    youtubeCards.forEach((card, index) => {
        if (index < youtubeThumbnails.length) {
            const videoData = youtubeThumbnails[index];
            const imageContainer = card.querySelector('.card-image');
            
            // Clear placeholder and add actual thumbnail
            imageContainer.innerHTML = `
                <a href="${videoData.url}" target="_blank">
                    <img src="https://img.youtube.com/vi/${videoData.videoId}/hqdefault.jpg" 
                         alt="${videoData.title}" 
                         style="width: 100%; height: 100%; object-fit: cover;">
                </a>
            `;
            
            // Update video title if needed
            const titleElement = card.querySelector('.card-text');
            if (titleElement && videoData.title) {
                titleElement.textContent = videoData.title;
            }
        }
    });

    // YouTube content in "Load More" functionality
    const additionalYoutubeContent = [
        {
            // Marcus's additional video content
            videoId: '4L-YRuEgWhM',
            platform: 'youtube',
            date: 'March 2024',
            text: 'Check out my latest video on my law school journey!',
            views: 8700,
            likes: 723,
            url: 'https://www.youtube.com/watch?v=4L-YRuEgWhM' // Actual video URL
        }
    ];

    // Modify the additionalContent array to include the new YouTube content
    const additionalContent = [
        {
            platform: 'instagram',
            date: 'January 18, 2024',
            text: 'Studying for AP exams while prepping for debate competition next week! #StudentLife #PreLaw',
            likes: 593,
            comments: 47
        },
        {
            platform: 'tiktok',
            date: 'January 10, 2024',
            text: 'What I learned shadowing a real attorney for a day! #LegalInternship #LawTok',
            likes: 5642,
            comments: 237
        },
        ...additionalYoutubeContent
    ];
    
    // Social media tab filtering
    const tabButtons = document.querySelectorAll('.tab-button');
    const socialCards = document.querySelectorAll('.social-card');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const platform = this.getAttribute('data-platform');
            
            // Show all cards if 'all' is selected, otherwise filter by platform
            socialCards.forEach(card => {
                if (platform === 'all' || card.classList.contains(platform)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Load more button functionality
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    let loadCount = 0;
    
    loadMoreBtn.addEventListener('click', function() {
        if (loadCount < 1) { // Only load one batch of additional content for demo
            const socialGrid = document.querySelector('.social-grid');
            
            // Create and append new social media cards
            additionalContent.forEach(item => {
                const card = document.createElement('div');
                card.className = `social-card ${item.platform}`;
                
                let cardContent = '';
                
                if (item.platform === 'youtube') {
                    // Special handling for YouTube cards with thumbnails
                    cardContent = `
                        <div class="card-image">
                            <a href="${item.url}" target="_blank">
                                <img src="https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg" 
                                     alt="${item.text}" 
                                     style="width: 100%; height: 100%; object-fit: cover;">
                            </a>
                        </div>
                        <div class="card-content">
                            <p class="card-date">${item.date}</p>
                            <p class="card-text">${item.text}</p>
                            <div class="card-stats">
                                <span><i class="far fa-eye"></i> ${item.views}</span>
                                <span><i class="far fa-thumbs-up"></i> ${item.likes}</span>
                            </div>
                        </div>
                    `;
                } else {
                    // Regular handling for non-YouTube cards
                    let statsHtml = '';
                    if (item.platform === 'instagram' || item.platform === 'tiktok') {
                        statsHtml = `
                            <span><i class="far fa-heart"></i> ${item.likes}</span>
                            <span><i class="far fa-comment"></i> ${item.comments}</span>
                        `;
                    }
                    
                    cardContent = `
                        <div class="card-image">
                            <div class="image-placeholder">
                                <i class="fab fa-${item.platform}"></i>
                            </div>
                        </div>
                        <div class="card-content">
                            <p class="card-date">${item.date}</p>
                            <p class="card-text">${item.text}</p>
                            <div class="card-stats">
                                ${statsHtml}
                            </div>
                        </div>
                    `;
                }
                
                card.innerHTML = cardContent;
                socialGrid.appendChild(card);
                
                // Apply current filter
                const activeTab = document.querySelector('.tab-button.active');
                const activePlatform = activeTab.getAttribute('data-platform');
                
                if (activePlatform !== 'all' && item.platform !== activePlatform) {
                    card.style.display = 'none';
                }
            });
            
            loadCount++;
            
            // Disable button after loading all content
            if (loadCount >= 1) {
                loadMoreBtn.textContent = 'No More Content';
                loadMoreBtn.disabled = true;
                loadMoreBtn.style.opacity = '0.5';
            }
        }
    });

    // Form validation and submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // If validation passes, simulate form submission
            alert('Thank you for your message! Marcus will get back to you soon.');
            contactForm.reset();
        });
    }

    // Animation on scroll - simple reveal effect
    const animateOnScroll = function() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionPosition = section.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (sectionPosition < screenPosition) {
                section.classList.add('fade-in');
            }
        });
    };
    
    // Add fade-in class for CSS animation
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            section {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            section.fade-in {
                opacity: 1;
                transform: translateY(0);
            }
        </style>
    `);
    
    // Run animation check on load and scroll
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
}); 