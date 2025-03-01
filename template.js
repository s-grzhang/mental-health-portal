// Scroll to Section
const menuLinks = document.querySelectorAll('.menu a');

menuLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetSection = document.querySelector(this.getAttribute('href'));

        // Scroll to the exact top position of the section
        window.scrollTo({
            top: targetSection.offsetTop - document.querySelector('header').offsetHeight, // Adjust for fixed header height
            behavior: 'smooth'
        });

        // Remove active class from other links
        menuLinks.forEach(item => item.classList.remove('active'));

        // Add active class to the clicked link
        this.classList.add('active');
    });
});

/* Edit below */

/* Hotlines JS */
// 911 call
document.getElementById('emergencyCall').addEventListener('click', function() {
    if (/Mobi/i.test(navigator.userAgent)) {
        const phoneNumber = 'tel:911'; 
        window.location.href = phoneNumber; 
    } else {
        alert("Please call the hotline directly: 911");
    }
});

// Suicide prevention call
document.getElementById('suicidePreventionCall').addEventListener('click', function() {
    if (/Mobi/i.test(navigator.userAgent)) {
        const phoneNumber = 'tel:+19889889888';
        window.location.href = phoneNumber;
    } else {
        alert("Please call the hotline directly: +19889889888");
    }
});

// CPS call
document.getElementById('childProtectiveCall').addEventListener('click', function() {
    if (/Mobi/i.test(navigator.userAgent)) {
        const phoneNumber = 'tel:+18007234831'; // CPS number
        window.location.href = phoneNumber;
    } else {
        alert("Please call the hotline directly: +18007234831");
    }
});

// Teeenlink Crisis call
document.getElementById('teenLinkCall').addEventListener('click', function() {
    if (/Mobi/i.test(navigator.userAgent)) {
        const phoneNumber = 'tel:+18668336546';
        window.location.href = phoneNumber;
    } else {
        alert("Please call the hotline directly: +18668336546");
    }
});

//CPS message
document.getElementById('childProtectiveMessage').addEventListener('click', function() {
    if (/Mobi/i.test(navigator.userAgent)) {
        const message = 'sms:+18007234831?body=I need help';
        window.location.href = message;
    } else {
        alert("Please send a message to the hotline number: +18007234831 (via SMS or other messaging service)");
    }
});

// Teenlink crisis message
document.getElementById('teenLinkMessage').addEventListener('click', function() {
    if (/Mobi/i.test(navigator.userAgent)) {
        const message = 'sms:+18668336546?body=I need help';
        window.location.href = message;
    } else {
        alert("Please send a message to the hotline number: +18668336546 (via SMS or other messaging service)");
    }
});

/* Hotlines JS End */