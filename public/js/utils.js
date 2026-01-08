// Utility functions for WhatsMyTools.com

// Copy text to clipboard
function copyToClipboard(text, button = null) {
    navigator.clipboard.writeText(text).then(() => {
        if (button) {
            const originalText = button.textContent;
            button.textContent = 'Copied!';
            button.classList.add('btn-success');
            setTimeout(() => {
                button.textContent = originalText;
                button.classList.remove('btn-success');
            }, 2000);
        }
    }).catch(err => {
        console.error('Failed to copy text: ', err);
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        
        if (button) {
            const originalText = button.textContent;
            button.textContent = 'Copied!';
            button.classList.add('btn-success');
            setTimeout(() => {
                button.textContent = originalText;
                button.classList.remove('btn-success');
            }, 2000);
        }
    });
}

// Show loading state
function showLoading(element, text = 'Loading...') {
    element.innerHTML = `<span class="loading"></span>${text}`;
    element.disabled = true;
}

// Hide loading state
function hideLoading(element, text = 'Run') {
    element.innerHTML = text;
    element.disabled = false;
}

// Display result in result container
function displayResult(containerId, data, isError = false) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.classList.remove('hidden', 'result-success', 'result-error');
    container.classList.add('result');
    
    if (isError) {
        container.classList.add('result-error');
        container.textContent = typeof data === 'string' ? data : 'An error occurred';
    } else {
        container.classList.add('result-success');
        if (typeof data === 'object') {
            container.textContent = JSON.stringify(data, null, 2);
        } else {
            container.textContent = data;
        }
    }
}

// Format bytes to human readable format
function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Get device information
function getDeviceInfo() {
    const info = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        languages: navigator.languages,
        cookieEnabled: navigator.cookieEnabled,
        onLine: navigator.onLine,
        hardwareConcurrency: navigator.hardwareConcurrency || 'Unknown',
        maxTouchPoints: navigator.maxTouchPoints || 0,
        screenResolution: `${screen.width} x ${screen.height}`,
        screenColorDepth: screen.colorDepth,
        screenPixelDepth: screen.pixelDepth,
        viewportSize: `${window.innerWidth} x ${window.innerHeight}`,
        devicePixelRatio: window.devicePixelRatio || 1,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
    
    // Try to get memory info if available
    if ('memory' in performance) {
        info.memory = {
            usedJSHeapSize: formatBytes(performance.memory.usedJSHeapSize),
            totalJSHeapSize: formatBytes(performance.memory.totalJSHeapSize),
            jsHeapSizeLimit: formatBytes(performance.memory.jsHeapSizeLimit)
        };
    }
    
    return info;
}

// Parse user agent for better device detection
function parseUserAgent(userAgent) {
    const ua = userAgent || navigator.userAgent;
    
    // Browser detection
    let browser = 'Unknown';
    let browserVersion = 'Unknown';
    
    // Check for Edge first (modern Chromium-based Edge uses "Edg/")
    if (ua.includes('Edg/')) {
        browser = 'Microsoft Edge';
        browserVersion = ua.match(/Edg\/([0-9.]+)/)?.[1] || 'Unknown';
    } else if (ua.includes('Edge/')) {
        browser = 'Microsoft Edge Legacy';
        browserVersion = ua.match(/Edge\/([0-9.]+)/)?.[1] || 'Unknown';
    } else if (ua.includes('Chrome')) {
        browser = 'Google Chrome';
        browserVersion = ua.match(/Chrome\/([0-9.]+)/)?.[1] || 'Unknown';
    } else if (ua.includes('Firefox')) {
        browser = 'Mozilla Firefox';
        browserVersion = ua.match(/Firefox\/([0-9.]+)/)?.[1] || 'Unknown';
    } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
        browser = 'Safari';
        browserVersion = ua.match(/Version\/([0-9.]+)/)?.[1] || 'Unknown';
    }
    
    // OS detection
    let os = 'Unknown';
    let osVersion = 'Unknown';
    
    if (ua.includes('Windows')) {
        os = 'Windows';
        if (ua.includes('Windows NT 10.0')) osVersion = '10/11';
        else if (ua.includes('Windows NT 6.3')) osVersion = '8.1';
        else if (ua.includes('Windows NT 6.2')) osVersion = '8';
        else if (ua.includes('Windows NT 6.1')) osVersion = '7';
    } else if (ua.includes('Mac OS')) {
        os = 'macOS';
        const match = ua.match(/Mac OS X ([0-9_]+)/);
        if (match) osVersion = match[1].replace(/_/g, '.');
    } else if (ua.includes('Linux')) {
        os = 'Linux';
    } else if (ua.includes('Android')) {
        os = 'Android';
        const match = ua.match(/Android ([0-9.]+)/);
        if (match) osVersion = match[1];
    } else if (ua.includes('iPhone') || ua.includes('iPad')) {
        os = 'iOS';
        const match = ua.match(/OS ([0-9_]+)/);
        if (match) osVersion = match[1].replace(/_/g, '.');
    }
    
    // Device type detection
    let deviceType = 'Desktop';
    if (ua.includes('Mobile') || ua.includes('Android')) {
        deviceType = 'Mobile';
    } else if (ua.includes('Tablet') || ua.includes('iPad')) {
        deviceType = 'Tablet';
    }
    
    return {
        browser,
        browserVersion,
        os,
        osVersion,
        deviceType
    };
}

// Generate UUID v4
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Generate random password
function generatePassword(length = 16, options = {}) {
    const defaults = {
        lowercase: true,
        uppercase: true,
        numbers: true,
        symbols: true
    };
    
    const settings = { ...defaults, ...options };
    
    let chars = '';
    if (settings.lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (settings.uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (settings.numbers) chars += '0123456789';
    if (settings.symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    if (!chars) return '';
    
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return password;
}

// Base64 encode/decode
function encodeBase64(text) {
    try {
        return btoa(unescape(encodeURIComponent(text)));
    } catch (e) {
        throw new Error('Invalid input for Base64 encoding');
    }
}

function decodeBase64(base64) {
    try {
        return decodeURIComponent(escape(atob(base64)));
    } catch (e) {
        throw new Error('Invalid Base64 string');
    }
}

// URL encode/decode
function encodeURL(text) {
    return encodeURIComponent(text);
}

function decodeURL(encodedText) {
    try {
        return decodeURIComponent(encodedText);
    } catch (e) {
        throw new Error('Invalid URL encoded string');
    }
}

// Format JSON
function formatJSON(jsonString) {
    try {
        const parsed = JSON.parse(jsonString);
        return JSON.stringify(parsed, null, 2);
    } catch (e) {
        throw new Error('Invalid JSON: ' + e.message);
    }
}

// Validate JSON
function validateJSON(jsonString) {
    try {
        JSON.parse(jsonString);
        return { valid: true, message: 'Valid JSON' };
    } catch (e) {
        return { valid: false, message: 'Invalid JSON: ' + e.message };
    }
}

// Add event listener helper
function addClickListener(elementId, callback) {
    const element = document.getElementById(elementId);
    if (element) {
        element.addEventListener('click', callback);
    }
}

// DOM ready helper
function ready(callback) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback);
    } else {
        callback();
    }
}