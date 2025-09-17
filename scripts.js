// Loading Screen and Typing Animation
document.addEventListener('DOMContentLoaded', function() {
    initializeLoadingScreen();
    initializeNavigation();
    initializeEventCarousel();
    initializeScrollAnimations();
});

function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const typingContainer = document.getElementById('typingContainer');
    const loadingProgress = document.getElementById('loadingProgress');
    
    const lines = [
        { id: 'line1', text: 'Department of Computer Science and Engineering' },
        { id: 'line2', text: 'Priyadarshini Engineering College' },
        { id: 'line3', text: 'Presents' },
        { id: 'line4', text: 'InterCollege Symposium - CynoSurE 2k25' }
    ];
    
    let currentLine = 0;
    
    function professionalTypeText(element, text, callback) {
        let index = 0;
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        element.textContent = '';
        element.classList.add('typing-active');
        
        function addChar() {
            if (index < text.length) {
                element.textContent += text[index];
                index++;
                
                // Professional typing rhythm with subtle variations
                const baseSpeed = 60;
                const variation = Math.random() * 30;
                const punctuationPause = text[index - 1]?.match(/[.,:;!?]/) ? 200 : 0;
                const speed = baseSpeed + variation + punctuationPause;
                
                setTimeout(addChar, speed);
            } else {
                // Complete typing
                element.classList.remove('typing-active');
                element.classList.add('typing-complete');
                
                // Add elegant completion effect
                setTimeout(() => {
                    element.classList.add('fade-in-elegant');
                }, 200);
                
                if (callback) setTimeout(callback, 800);
            }
        }
        
        addChar();
    }
    
    function typeNextLine() {
        if (currentLine < lines.length) {
            const line = lines[currentLine];
            const element = document.getElementById(line.id);
            
            professionalTypeText(element, line.text, () => {
                currentLine++;
                if (currentLine < lines.length) {
                    setTimeout(typeNextLine, 400);
                } else {
                    // All lines typed, show progress bar and complete
                    setTimeout(showProgressAndComplete, 1000);
                }
            });
        }
    }
    
    function showProgressAndComplete() {
        // Show and animate progress bar
        loadingProgress.style.opacity = '1';
        const progressBar = loadingProgress.querySelector('div');
        progressBar.classList.add('progress-animate');
        
        // Hide loading screen after progress completes
        setTimeout(hideLoadingScreen, 3500);
    }
    
    function hideLoadingScreen() {
        loadingScreen.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transform = 'scale(1.05)';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            document.body.classList.remove('overflow-hidden');
        }, 1000);
    }
    
    // Start professional typing animation
    document.body.classList.add('overflow-hidden');
    setTimeout(typeNextLine, 1200);
}

// Navigation functionality
function initializeNavigation() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = mobileMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
    
    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksAll.forEach(link => {
            link.classList.remove('text-blue-400');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-blue-400');
            }
        });
    });
}

// Event carousel functionality
function initializeEventCarousel() {
    const technicalBtn = document.getElementById('technicalBtn');
    const nonTechnicalBtn = document.getElementById('nonTechnicalBtn');
    const carousel = document.getElementById('eventsCarousel');
    
    let currentSlide = 0;
    
    function switchCategory(category) {
        const buttons = [technicalBtn, nonTechnicalBtn];
        buttons.forEach(btn => {
            btn.classList.remove('bg-blue-500', 'text-white');
            btn.classList.add('text-gray-300');
        });
        
        if (category === 'technical') {
            technicalBtn.classList.add('bg-blue-500', 'text-white');
            technicalBtn.classList.remove('text-gray-300');
            currentSlide = 0;
        } else {
            nonTechnicalBtn.classList.add('bg-blue-500', 'text-white');
            nonTechnicalBtn.classList.remove('text-gray-300');
            currentSlide = 1;
        }
        
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    technicalBtn.addEventListener('click', () => switchCategory('technical'));
    nonTechnicalBtn.addEventListener('click', () => switchCategory('non-technical'));
}

// Event modal functionality
const eventData = {
    'codecraft': {
        title: 'CodeCraft Challenge',
        description: 'Test your algorithmic thinking and programming skills in this intensive competitive programming contest. Solve complex problems using efficient algorithms and data structures.',
        venue: 'Computer Lab - Block A',
        datetime: 'March 15, 2025 | 10:00 AM - 1:00 PM',
        rules: [
            'Individual participation only',
            'Duration: 3 hours',
            'Languages: C, C++, Java, Python',
            'Use of internet restricted to documentation only',
            'Bring your own laptop (optional - lab computers available)'
        ],
        contact: 'Dr. Sarah Johnson | sarah.j@pec.edu.in | +91 98765 43210'
    },
    'ai-innovation': {
        title: 'AI Innovation Hub',
        description: 'Showcase your artificial intelligence and machine learning projects. Present innovative solutions using cutting-edge AI technologies.',
        venue: 'Seminar Hall - Block B',
        datetime: 'March 15, 2025 | 2:00 PM - 5:00 PM',
        rules: [
            'Team size: 2-4 members',
            'Present working prototype or detailed concept',
            '15-minute presentation + 5-minute Q&A',
            'Focus on real-world applications',
            'Bring your own devices for demonstration'
        ],
        contact: 'Prof. Michael Chen | m.chen@pec.edu.in | +91 98765 43211'
    },
    'web-wizardry': {
        title: 'Web Wizardry',
        description: 'Create stunning and functional web applications using modern frameworks and technologies. Show off your frontend and full-stack development skills.',
        venue: 'Web Development Lab - Block A',
        datetime: 'March 16, 2025 | 10:00 AM - 4:00 PM',
        rules: [
            'Team size: 1-3 members',
            'Duration: 6 hours',
            'Use any modern web technologies',
            'Responsive design mandatory',
            'Deploy on provided hosting platform'
        ],
        contact: 'Ms. Emily Rodriguez | e.rodriguez@pec.edu.in | +91 98765 43212'
    },
    'cybersafe': {
        title: 'CyberSafe Quest',
        description: 'Navigate through cybersecurity challenges including ethical hacking, digital forensics, and security analysis. Test your skills in protecting digital assets.',
        venue: 'Security Lab - Block C',
        datetime: 'March 16, 2025 | 1:00 PM - 5:00 PM',
        rules: [
            'Individual or team participation (max 2 members)',
            'Multiple challenge categories',
            'Ethical hacking principles only',
            'Report findings with proper documentation',
            'No malicious activities allowed'
        ],
        contact: 'Dr. Alex Thompson | a.thompson@pec.edu.in | +91 98765 43213'
    },
    'app-galaxy': {
        title: 'App Galaxy',
        description: 'Develop innovative mobile applications for Android and iOS platforms. Create apps that solve real-world problems with intuitive user interfaces.',
        venue: 'Mobile Dev Studio - Block B',
        datetime: 'March 17, 2025 | 9:00 AM - 3:00 PM',
        rules: [
            'Team size: 2-4 members',
            'Duration: 6 hours',
            'Native or cross-platform development',
            'Focus on user experience and functionality',
            'Submit APK/IPA file with source code'
        ],
        contact: 'Mr. David Park | d.park@pec.edu.in | +91 98765 43214'
    },
    'tech-quiz': {
        title: 'Tech Quiz Master',
        description: 'Test your knowledge across technology, current affairs, and general knowledge in this exciting quiz competition with multiple challenging rounds.',
        venue: 'Main Auditorium',
        datetime: 'March 15, 2025 | 11:00 AM - 1:00 PM',
        rules: [
            'Team size: 3 members',
            'Multiple rounds: Prelims, Semi-finals, Finals',
            'Topics: Technology, Current Affairs, General Knowledge',
            'No electronic devices allowed',
            'Answer sheets provided'
        ],
        contact: 'Ms. Lisa Wang | l.wang@pec.edu.in | +91 98765 43215'
    },
    'pixel-perfect': {
        title: 'Pixel Perfect',
        description: 'Capture the essence of technology and innovation through your lens. Submit photographs that showcase the intersection of technology and creativity.',
        venue: 'Photography Exhibition Hall',
        datetime: 'March 16, 2025 | 10:00 AM - 2:00 PM',
        rules: [
            'Individual participation',
            'Submit 3-5 original photographs',
            'Theme: Technology and Innovation',
            'High resolution images required',
            'Brief description for each photo'
        ],
        contact: 'Mr. James Wilson | j.wilson@pec.edu.in | +91 98765 43216'
    },
    'innovation-pitch': {
        title: 'Innovation Pitch',
        description: 'Present your startup ideas and innovative solutions to a panel of industry experts. Get valuable feedback and potential investment opportunities.',
        venue: 'Entrepreneurship Hub - Block D',
        datetime: 'March 17, 2025 | 10:00 AM - 1:00 PM',
        rules: [
            'Team size: 2-5 members',
            '10-minute pitch + 5-minute Q&A',
            'Business plan required',
            'Focus on innovation and market potential',
            'Professional presentation mandatory'
        ],
        contact: 'Dr. Maria Garcia | m.garcia@pec.edu.in | +91 98765 43217'
    },
    'design-fusion': {
        title: 'Design Fusion',
        description: 'Create exceptional user interfaces and experiences. Design digital products that are both beautiful and functional with modern design principles.',
        venue: 'Design Studio - Block C',
        datetime: 'March 16, 2025 | 2:00 PM - 6:00 PM',
        rules: [
            'Individual or team (max 2 members)',
            'Duration: 4 hours',
            'Focus on UI/UX design',
            'Submit high-fidelity prototypes',
            'Present design rationale'
        ],
        contact: 'Ms. Sophie Martin | s.martin@pec.edu.in | +91 98765 43218'
    },
    'tech-drama': {
        title: 'Tech Drama',
        description: 'Combine technology themes with dramatic arts in this unique performance event. Showcase creativity through theatrical presentations.',
        venue: 'Cultural Center Theater',
        datetime: 'March 17, 2025 | 2:00 PM - 5:00 PM',
        rules: [
            'Team size: 4-8 members',
            'Performance duration: 10-15 minutes',
            'Technology-related theme mandatory',
            'Props and costumes allowed',
            'Original content preferred'
        ],
        contact: 'Ms. Rachel Green | r.green@pec.edu.in | +91 98765 43219'
    }
};

function openModal(eventKey) {
    const modal = document.getElementById('eventModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const registerBtn = document.getElementById('modalRegisterBtn');
    
    const event = eventData[eventKey];
    if (!event) return;
    
    modalTitle.textContent = event.title;
    
    modalContent.innerHTML = `
        <div class="space-y-6">
            <div>
                <h4 class="text-lg font-semibold text-blue-400 mb-2">Description</h4>
                <p class="text-gray-300 leading-relaxed">${event.description}</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h4 class="text-lg font-semibold text-purple-400 mb-2">📍 Venue</h4>
                    <p class="text-gray-300">${event.venue}</p>
                </div>
                <div>
                    <h4 class="text-lg font-semibold text-blue-400 mb-2">🕒 Date & Time</h4>
                    <p class="text-gray-300">${event.datetime}</p>
                </div>
            </div>
            
            <div>
                <h4 class="text-lg font-semibold text-purple-400 mb-3">📋 Rules & Instructions</h4>
                <ul class="text-gray-300 space-y-2">
                    ${event.rules.map(rule => `<li class="flex items-start"><span class="text-blue-400 mr-2">•</span>${rule}</li>`).join('')}
                </ul>
            </div>
            
            <div>
                <h4 class="text-lg font-semibold text-blue-400 mb-2">📞 Contact</h4>
                <p class="text-gray-300">${event.contact}</p>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    
    // Focus management for accessibility
    registerBtn.focus();
}

function closeModal() {
    const modal = document.getElementById('eventModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
}

// Close modal on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Close modal on backdrop click
document.getElementById('eventModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Add click handlers to navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                const sectionId = href.substring(1);
                scrollToSection(sectionId);
            }
        });
    });
});

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slide-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.event-card, .animate-fade-in');
    animateElements.forEach(el => observer.observe(el));
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Accessibility enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Add keyboard navigation for cards
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const button = this.querySelector('button');
                if (button) button.click();
            }
        });
    });
    
    // Add focus indicators
    const focusableElements = document.querySelectorAll('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    focusableElements.forEach(el => {
        el.addEventListener('focus', function() {
            this.classList.add('ring-2', 'ring-blue-400', 'ring-offset-2', 'ring-offset-gray-900');
        });
        
        el.addEventListener('blur', function() {
            this.classList.remove('ring-2', 'ring-blue-400', 'ring-offset-2', 'ring-offset-gray-900');
        });
    });
});

// Error handling for missing images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Image failed to load:', this.src);
        });
    });
});

// Preload critical resources
function preloadResources() {
    const criticalImages = [
        'assets/PEC logo.png',
        'assets/PEC.jpg'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize preloading
document.addEventListener('DOMContentLoaded', preloadResources);

// SEO and meta tag updates
function updateMetaTags() {
    const title = 'CynoSurE - Perseverance, Endurance, Commitment | Priyadarshini Engineering College';
    const description = 'Join CynoSurE, the premier InterCollege Technical Symposium by Computer Science & Engineering Department, Priyadarshini Engineering College. Participate in exciting technical and non-technical events.';

    document.title = title;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.content = description;
    }
    
    // Add Open Graph tags for social sharing
    const ogTags = [
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: window.location.href },
        { property: 'og:image', content: `${window.location.origin}/assets/PEC.jpg` }
    ];
    
    ogTags.forEach(tag => {
        const meta = document.createElement('meta');
        meta.setAttribute('property', tag.property);
        meta.content = tag.content;
        document.head.appendChild(meta);
    });
}

// Initialize meta tags
document.addEventListener('DOMContentLoaded', updateMetaTags);
