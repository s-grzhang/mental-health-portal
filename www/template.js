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
    const studentName = document.getElementById('student-name').value;
    const subject = document.getElementById('email-subject').value;
    const messageBody = document.getElementById('email-message').value;
    const appointmentContext = document.getElementById('appointment-context').textContent;
    const feedbackElement = document.getElementById('form-feedback-message');

    // Clear previous feedback messages
    feedbackElement.style.display = 'none';
    feedbackElement.textContent = '';
    feedbackElement.className = 'form-feedback'; // Reset classes

    if (!toEmail || !fromEmail || !messageBody) {
        feedbackElement.textContent = 'Please fill in all required fields (To, Your Email, Message).';
        feedbackElement.classList.add('error');
        feedbackElement.style.display = 'block';
        return;
    }

    const sendButton = this;
    sendButton.disabled = true;
    sendButton.textContent = 'Sending...';

    const templateParams = {
        to_email: toEmail,          
        from_email: fromEmail,        
        student_name: studentName || 'N/A',
        subject_line: subject,      
        message_html: messageBody,    
        appointment_info: appointmentContext 
    };

    const serviceID = 'service_j5mxuzi'; 
    const templateID = 'template_vgv5uy9';

    emailjs.send(serviceID, templateID, templateParams)
        .then(function(response) {
           console.log('EmailJS SUCCESS!', response.status, response.text);
           feedbackElement.textContent = 'Your message has been sent successfully!';
           feedbackElement.classList.add('success');
           feedbackElement.style.display = 'block';
           document.getElementById('counselor-email-form').reset();
           document.getElementById('appointment-context').textContent = ''; 
        }, function(error) {
           console.log('EmailJS FAILED...', error);
           let errorMessage = 'Failed to send the message. Please try again.';
           if (serviceID === 'service_j5mxuzi' || templateID === 'template_vgv5uy9') {
               errorMessage += ' Please ensure EmailJS Service/Template IDs are correctly set in template.js.';
           }
           feedbackElement.textContent = errorMessage;
           feedbackElement.classList.add('error');
           feedbackElement.style.display = 'block';
        })
        .finally(function() {
            sendButton.disabled = false;
            sendButton.textContent = 'Send Email';
            // Optionally hide the message after a few seconds
            setTimeout(() => {
                feedbackElement.style.display = 'none';
            }, 5000); // Hide after 5 seconds
        });
});

// Handle booking appointment buttons (this populates the 'To' field for the EmailJS function)
const counselorEmails = {
    // For testing, all emails go to your test address
    // Remember to change these back to actual counselor emails for production
    "Kimberly Herring": "kiherring@lwsd.org", // Example: YOUR_TEST_EMAIL@example.com
    "Lindsey Ehrlich": "lehrlich@lwsd.org",
    "Wendi Thomas": "wthomas@lwsd.org",
    "Sarah Gray": "sgray@lwsd.org",
    "Margaret Kinney": "MKinneyKrepel@lwsd.org",
    "Katie Bunyard": "kbunyard@lwsd.org",
    "Ellen Zambrowsky-Huls": "ezambrowsky-huls@lwsd.org",
    "Kasey Dauenhauer": "kdauenhauer@lwsd.org",
    "Tara Kapsch": "tkapsch@lwsd.org",
    "JB Magpantay": "jmagpantay@lwsd.org"
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