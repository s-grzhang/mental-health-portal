#!/usr/bin/env node

// Build script for Netlify deployment
// This script uses environment variables to create the config file and prepare the www folder

const fs = require('fs');
const path = require('path');

console.log('Building Mental Health Portal for Netlify...');

// Ensure www directory exists
const wwwDir = path.join(__dirname, '..', 'www');
const wwwJsDir = path.join(wwwDir, 'js');

if (!fs.existsSync(wwwDir)) {
    fs.mkdirSync(wwwDir, { recursive: true });
}

if (!fs.existsSync(wwwJsDir)) {
    fs.mkdirSync(wwwJsDir, { recursive: true });
}

// Create config.js from environment variables (for Netlify) or local config (for development)
let config;

const localConfigPath = path.join(__dirname, '..', 'js', 'config.js');
if (fs.existsSync(localConfigPath) && !process.env.NETLIFY) {
    // Local development - copy the local config
    console.log('Using local configuration file...');
    fs.copyFileSync(localConfigPath, path.join(wwwJsDir, 'config.js'));
    console.log('Local config copied to www/js/config.js');
    
    // We still need to copy other files
    config = { emailjs: { publicKey: 'local', serviceId: 'local', templateId: 'local' } };
} else {
    // Netlify deployment - use environment variables
    console.log('Using environment variables...');
    config = {
        emailjs: {
            publicKey: process.env.EMAILJS_PUBLIC_KEY || '',
            serviceId: process.env.EMAILJS_SERVICE_ID || '',
            templateId: process.env.EMAILJS_TEMPLATE_ID || ''
        },
        counselorEmails: {
            "Kimberly Herring": process.env.COUNSELOR_EMAIL_KIMBERLY || "kiherring@lwsd.org",
            "Lindsey Ehrlich": process.env.COUNSELOR_EMAIL_LINDSEY || "lehrlich@lwsd.org",
            "Wendi Thomas": process.env.COUNSELOR_EMAIL_WENDI || "wthomas@lwsd.org",
            "Sarah Gray": process.env.COUNSELOR_EMAIL_SARAH || "sgray@lwsd.org",
            "Margaret Kinney": process.env.COUNSELOR_EMAIL_MARGARET || "MKinneyKrepel@lwsd.org",
            "Katie Bunyard": process.env.COUNSELOR_EMAIL_KATIE || "kbunyard@lwsd.org",
            "Ellen Zambrowsky-Huls": process.env.COUNSELOR_EMAIL_ELLEN || "ezambrowsky-huls@lwsd.org",
            "Kasey Dauenhauer": process.env.COUNSELOR_EMAIL_KASEY || "kdauenhauer@lwsd.org",
            "Tara Kapsch": process.env.COUNSELOR_EMAIL_TARA || "tkapsch@lwsd.org",
            "JB Magpantay": process.env.COUNSELOR_EMAIL_JB || "jmagpantay@lwsd.org"
        },
        useTestEmail: process.env.USE_TEST_EMAIL === 'true',
        testEmail: process.env.TEST_EMAIL || ''
    };
    
    // Write config file for Netlify
    const configContent = `window.AppConfig = ${JSON.stringify(config, null, 2)};`;
    fs.writeFileSync(path.join(wwwJsDir, 'config.js'), configContent);
}

// Copy other files
const filesToCopy = [
    { src: 'template.html', dest: 'index.html' },
    { src: 'template.css', dest: 'template.css' },
    { src: 'template.js', dest: 'template.js' },
    { src: 'Mental-Health-Image.jpg', dest: 'Mental-Health-Image.jpg' },
    { src: 'gwc-logo.png', dest: 'gwc-logo.png' }
];

filesToCopy.forEach(file => {
    const srcPath = path.join(__dirname, '..', file.src);
    const destPath = path.join(wwwDir, file.dest);
    
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied ${file.src} -> www/${file.dest}`);
    } else {
        console.warn(`Warning: ${file.src} not found, skipping...`);
    }
});

console.log('Build complete! Config created with environment variables.');
console.log('EmailJS Public Key:', config.emailjs.publicKey ? 'Set' : 'NOT SET');
console.log('EmailJS Service ID:', config.emailjs.serviceId ? 'Set' : 'NOT SET');
console.log('EmailJS Template ID:', config.emailjs.templateId ? 'Set' : 'NOT SET');
console.log('Use Test Email:', config.useTestEmail);
