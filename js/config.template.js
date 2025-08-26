// Configuration template for the Mental Health Portal
// Copy this file to js/config.js and fill in your actual values
// NEVER commit js/config.js to the repository

window.AppConfig = {
    // EmailJS Configuration
    emailjs: {
        publicKey: "YOUR_EMAILJS_PUBLIC_KEY_HERE",
        serviceId: "YOUR_EMAILJS_SERVICE_ID_HERE", 
        templateId: "YOUR_EMAILJS_TEMPLATE_ID_HERE"
    },
    
    // Counselor Information
    counselorEmails: {
        "Kimberly Herring": "counselor1@example.com",
        "Lindsey Ehrlich": "counselor2@example.com",
        "Wendi Thomas": "counselor3@example.com",
        "Sarah Gray": "counselor4@example.com",
        "Margaret Kinney": "counselor5@example.com",
        "Katie Bunyard": "counselor6@example.com",
        "Ellen Zambrowsky-Huls": "counselor7@example.com",
        "Kasey Dauenhauer": "counselor8@example.com",
        "Tara Kapsch": "counselor9@example.com",
        "JB Magpantay": "counselor10@example.com"
    },
    
    // For testing purposes - set to true to use test email instead of actual counselor emails
    useTestEmail: false,
    testEmail: "your-test-email@example.com"
};
