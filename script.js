// MSC Bellissima Cruise Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.background = 'rgba(0, 51, 102, 0.98)';
        } else {
            navbar.style.background = 'rgba(0, 51, 102, 0.95)';
        }

        lastScroll = currentScroll;
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    document.querySelectorAll('.overview-card, .sea-day-card, .cabin-card, .kids-card, .dining-card, .facility-card, .broadway-show').forEach(el => {
        observer.observe(el);
    });

    // Sea conditions countdown (days until departure)
    function updateCountdown() {
        const departureDate = new Date('2026-01-21T00:00:00');
        const now = new Date();
        const diff = departureDate - now;

        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

            const countdownEl = document.querySelector('.countdown-display');
            if (countdownEl) {
                countdownEl.textContent = `${days} 天 ${hours} 小時後出發`;
            }
        }
    }

    // Update countdown every hour
    updateCountdown();
    setInterval(updateCountdown, 3600000);

    // Smooth reveal for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });

    // Add hover effect for dining cards
    document.querySelectorAll('.dining-card.specialty').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Scroll indicator hide on scroll
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '0.7';
            }
        });
    }

    // Print functionality
    window.printPage = function() {
        window.print();
    };

    // Console welcome message
    console.log('%c🚢 MSC Bellissima 榮耀號', 'font-size: 24px; font-weight: bold; color: #003366;');
    console.log('%c基隆 → 東京航線 | 2026/1/21-1/24', 'font-size: 14px; color: #666;');
    console.log('%c祝您有一趟愉快的海上旅程！', 'font-size: 12px; color: #c9a227;');
});

// Utility function to format dates in Chinese
function formatDateChinese(date) {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    };
    return date.toLocaleDateString('zh-TW', options);
}

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { formatDateChinese };
}
