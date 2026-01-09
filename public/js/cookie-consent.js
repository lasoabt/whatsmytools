// Cookie Consent Management
(function() {
    'use strict';

    const CONSENT_KEY = 'cookieConsent';
    const CONSENT_TIMESTAMP_KEY = 'cookieConsentTimestamp';
    const CONSENT_DURATION = 365 * 24 * 60 * 60 * 1000; // 365 days in milliseconds

    // Check if consent has already been given
    function hasConsent() {
        const consent = localStorage.getItem(CONSENT_KEY);
        const timestamp = localStorage.getItem(CONSENT_TIMESTAMP_KEY);
        
        if (!consent || !timestamp) {
            return null;
        }

        // Check if consent is still valid (not expired)
        const consentDate = new Date(parseInt(timestamp));
        const now = new Date();
        if (now - consentDate > CONSENT_DURATION) {
            // Consent expired, clear it
            localStorage.removeItem(CONSENT_KEY);
            localStorage.removeItem(CONSENT_TIMESTAMP_KEY);
            return null;
        }

        return consent === 'accepted';
    }

    // Save consent choice
    function saveConsent(accepted) {
        localStorage.setItem(CONSENT_KEY, accepted ? 'accepted' : 'declined');
        localStorage.setItem(CONSENT_TIMESTAMP_KEY, Date.now().toString());
    }

    // Load Google Analytics
    function loadGoogleAnalytics() {
        // Check if GA script already exists
        if (document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
            return;
        }

        // Create and load GA script
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-RFLBBWWF5B';
        document.head.appendChild(script);

        // Initialize GA
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-RFLBBWWF5B', {
            'anonymize_ip': true
        });
    }

    // Load Google AdSense
    function loadGoogleAdSense() {
        // Check if AdSense script already exists
        if (document.querySelector('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]')) {
            return;
        }

        // Create and load AdSense script
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5777587918363886';
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
    }

    // Show cookie consent banner
    function showBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.classList.remove('hidden');
        }
    }

    // Hide cookie consent banner
    function hideBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.classList.add('hidden');
        }
    }

    // Handle accept button click
    function handleAccept() {
        saveConsent(true);
        loadGoogleAnalytics();
        loadGoogleAdSense();
        hideBanner();
    }

    // Handle decline button click
    function handleDecline() {
        saveConsent(false);
        hideBanner();
    }

    // Initialize on page load
    function init() {
        const consent = hasConsent();

        if (consent === null) {
            // No consent recorded, show banner
            showBanner();
        } else if (consent === true) {
            // Consent given, load tracking scripts
            loadGoogleAnalytics();
            loadGoogleAdSense();
        }
        // If consent === false, don't load anything

        // Attach event listeners
        const acceptBtn = document.getElementById('cookie-accept');
        const declineBtn = document.getElementById('cookie-decline');

        if (acceptBtn) {
            acceptBtn.addEventListener('click', handleAccept);
        }

        if (declineBtn) {
            declineBtn.addEventListener('click', handleDecline);
        }
    }

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
