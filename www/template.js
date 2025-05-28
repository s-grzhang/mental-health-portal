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

// Smooth scrolling for navigation links
document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            // Add smooth scrolling
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });

            // Add active class to the clicked link
            document.querySelectorAll('.menu a').forEach(item => {
                item.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Resource dropdown functionality
document.querySelectorAll('.resource-header').forEach(header => {
    header.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const content = document.getElementById(targetId);
        
        // Toggle the display of the content
        if (content.style.display === 'none' || !content.style.display) {
            // Close all other open dropdowns first
            document.querySelectorAll('.resource-content').forEach(item => {
                if (item.id !== targetId) {
                    item.style.display = 'none';
                }
            });
            
            // Reset all dropdown icons
            document.querySelectorAll('.resource-header i').forEach(icon => {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            });
            
            // Open this dropdown
            content.style.display = 'block';
            this.querySelector('i').classList.remove('fa-chevron-down');
            this.querySelector('i').classList.add('fa-chevron-up');
        } else {
            // Close this dropdown
            content.style.display = 'none';
            this.querySelector('i').classList.remove('fa-chevron-up');
            this.querySelector('i').classList.add('fa-chevron-down');
        }
    });
});

// Initialize EmailJS
(function(){
    // TODO: Replace 'YOUR_USER_ID_HERE' with your actual EmailJS User ID (Public Key)
    // You can find this in your EmailJS account under Integration > API Keys > Public Key
    emailjs.init("nDbhLPOObC3kiWFgN"); 
})();

// Email form submission using EmailJS
document.getElementById('send-email-btn')?.addEventListener('click', function(e) {
    e.preventDefault();
    
    const toEmail = document.getElementById('email-to').value;
    const fromEmail = document.getElementById('email-from').value;
    const subject = document.getElementById('email-subject').value;
    const messageBody = document.getElementById('email-message').value;
    const appointmentContext = document.getElementById('appointment-context').textContent;
    const studentName = document.getElementById('student-name').value; // Get the student's name

    if (!toEmail || !fromEmail || !messageBody) {
        alert('Please fill in all required fields (To, Your Email, Message).');
        return;
    }

    const sendButton = this;
    sendButton.disabled = true;
    sendButton.textContent = 'Sending...';

    const templateParams = {
        to_email: toEmail,               // Will be the counselor's email (or your test email)
        from_email: fromEmail,         // The student's email address from the form
        student_name: studentName || 'N/A', // Include student's name, or N/A if empty
        subject_line: subject,           // The subject from the form
        message_html: messageBody,       // The message content from the form
        appointment_info: appointmentContext // e.g., "Booking an appointment with Kimberly Herring"
        // Add any other parameters your EmailJS template might expect
        // For example, if your template uses {{from_name}}, you'd add a field for it in HTML and send:
        // from_name: document.getElementById('your_name_field_id').value,
    };

    // TODO: Replace 'YOUR_SERVICE_ID_HERE' and 'YOUR_TEMPLATE_ID_HERE' 
    // with your actual Service ID and Template ID from your EmailJS dashboard.
    const serviceID = 'service_j5mxuzi'; 
    const templateID = 'template_vgv5uy9';

    emailjs.send(serviceID, templateID, templateParams)
        .then(function(response) {
           console.log('EmailJS SUCCESS!', response.status, response.text);
           alert('Your message has been sent successfully!');
           document.getElementById('counselor-email-form').reset(); // Resets the form, including the new name field
           document.getElementById('appointment-context').textContent = ''; // Clear context
        }, function(error) {
           console.log('EmailJS FAILED...', error);
           alert('Failed to send the message. Error: ' + JSON.stringify(error) + '\n\nPlease ensure you have replaced the placeholder User ID, Service ID, and Template ID in the template.js file, and that your EmailJS account is correctly configured.');
        })
        .finally(function() {
            sendButton.disabled = false;
            sendButton.textContent = 'Send Email';
        });
});

// Handle booking appointment buttons (this populates the 'To' field for the EmailJS function)
const counselorEmails = {
    // For testing, all emails go to your test address
    // Remember to change these back to actual counselor emails for production
    "Kimberly Herring": "1041602@lwsd.org", // Example: YOUR_TEST_EMAIL@example.com
    "Lindsey Ehrlich": "1041602@lwsd.org",
    "Wendi Thomas": "1041602@lwsd.org",
    "Sarah Gray": "1041602@lwsd.org",
    "Margaret Kinney": "1041602@lwsd.org",
    "Katie Bunyard": "1041602@lwsd.org",
    "Ellen Zambrowsky-Huls": "1041602@lwsd.org",
    "Kasey Dauenhauer": "1041602@lwsd.org",
    "Tara Kapsch": "1041602@lwsd.org",
    "JB Magpantay": "1041602@lwsd.org"
};

document.querySelectorAll('.counselor-item .btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const counselorItem = this.closest('.counselor-item');
        const counselorNameFull = counselorItem.querySelector('.counselor-name').textContent;
        const counselorName = counselorNameFull.split('(')[0].trim();
        const emailForm = document.querySelector('.email-form');
        
        emailForm.scrollIntoView({ behavior: 'smooth' });
        
        if (counselorEmails[counselorName]) {
            document.getElementById('email-to').value = counselorEmails[counselorName];
            document.getElementById('appointment-context').textContent = `Booking an appointment with ${counselorName}`;
            document.getElementById('email-subject').value = `Appointment Request with ${counselorName}`;
            setTimeout(() => {
                document.getElementById('email-from').focus();
            }, 500); // Adjusted timeout slightly
        } else {
            // Clear fields if counselor not found, though this shouldn't happen with current setup
            document.getElementById('email-to').value = '';
            document.getElementById('appointment-context').textContent = 'Please select a counselor first.';
            document.getElementById('email-subject').value = 'Appointment Request';
        }
    });
});

// Enhance hotline call buttons
document.querySelectorAll('.hotline-buttons .btn').forEach(button => {
    // Add visual feedback for both call and message buttons
    button.addEventListener('click', function(e) {
        // Add visual feedback that the button was clicked
        this.classList.add('btn-active');
        setTimeout(() => {
            this.classList.remove('btn-active');
        }, 300);
        
        // For message buttons, provide extra information
        if (this.textContent.trim() === 'Message') {
            // Check if it's a mobile device before showing the alert
            if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
                // It's not a mobile device, so give more info about texting
                e.preventDefault();
                alert('To use the Crisis Text Line:\n\n1. Text HOME to 741741 from your mobile phone\n2. You\'ll receive an automated text asking what\'s going on\n3. A trained crisis counselor will respond shortly');
            }
        }
    });
});

// Set active menu item based on scroll position
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    // Get all sections
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop - 100 && scrollPosition < sectionTop + sectionHeight - 100) {
            const id = section.getAttribute('id');
            document.querySelectorAll('.menu a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});