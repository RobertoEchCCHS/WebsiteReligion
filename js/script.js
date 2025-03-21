// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scrolling for navigation links and the explore button
document.querySelectorAll('nav a, .scroll-btn').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 70, // Account for sticky nav
            behavior: 'smooth'
        });
    });
});

// Parallax effect for header
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    // Header parallax effect
    const header = document.querySelector('header');
    if (scrollPosition < window.innerHeight) {
        header.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    }
    
    // Get all sections for active nav highlighting
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Add fade-in animation for sections when they come into viewport
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            
            // Add staggered animation to children if it's the quotes section
            if (entry.target.id === 'quotes') {
                const quotes = entry.target.querySelectorAll('blockquote');
                quotes.forEach((quote, index) => {
                    setTimeout(() => {
                        quote.classList.add('fade-in');
                    }, index * 200);
                });
            }
        }
    });
}, { threshold: 0.15 });

// Add observer to sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in-section');
    observer.observe(section);
});

// Add staggered fade-in for blockquotes initially
document.querySelectorAll('blockquote').forEach(quote => {
    quote.classList.add('fade-in-section');
});

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

// Update scroll progress indicator
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = `${progress}%`;
});

// Add styles for the progress bar
const style = document.createElement('style');
style.textContent = `
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 0;
        height: 5px;
        background-color: var(--primary-color);
        z-index: 1000;
        transition: width 0.1s ease;
    }
`;
document.head.appendChild(style); 