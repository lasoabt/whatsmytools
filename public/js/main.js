// Main JavaScript for WhatsMyTools.com

// Initialize the application
ready(() => {
    // Add smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Add loading indicators for external links
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', () => {
            link.classList.add('loading-link');
        });
    });
    
    // Simple analytics (page view tracking)
    trackPageView();
});

// Simple page view tracking
function trackPageView() {
    // This is a placeholder for analytics
    // In a real implementation, you might use Google Analytics or similar
    console.log('Page view tracked:', window.location.pathname);
}

// Global error handler
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

// Handle service worker registration for offline functionality (optional)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {
        // Service worker registration failed, but that's okay
    });
}