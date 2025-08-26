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

// Initialize EmailJS when config is available
document.addEventListener('DOMContentLoaded', function() {
    if (window.AppConfig && window.AppConfig.emailjs.publicKey) {
        emailjs.init(window.AppConfig.emailjs.publicKey);
    }
});

// Email form submission using EmailJS
document.getElementById('send-email-btn')?.addEventListener('click', function(e) {
    e.preventDefault();
    
    const toEmail = document.getElementById('email-to').value;
    const fromEmail = document.getElementById('email-from').value;
    const studentName = document.getElementById('student-name')?.value;
    const subject = document.getElementById('email-subject').value;
    const messageBody = document.getElementById('email-message').value;
    const appointmentContext = document.getElementById('appointment-context')?.textContent;
    const feedbackElement = document.getElementById('form-feedback-message');

    // Clear previous feedback messages
    if (feedbackElement) {
        feedbackElement.style.display = 'none';
        feedbackElement.textContent = '';
        feedbackElement.className = 'form-feedback';
    }

    if (!toEmail || !fromEmail || !messageBody) {
        if (feedbackElement) {
            feedbackElement.textContent = 'Please fill in all required fields (To, Your Email, Message).';
            feedbackElement.classList.add('error');
            feedbackElement.style.display = 'block';
        } else {
            alert('Please fill in all required fields');
        }
        return;
    }

    // Check if EmailJS is configured
    if (!window.AppConfig || !window.AppConfig.emailjs.publicKey) {
        console.warn('EmailJS not configured, falling back to mailto:');
        const mailtoLink = `mailto:${toEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('From: ' + fromEmail + '\n\n' + messageBody)}`;
        window.location.href = mailtoLink;
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
        appointment_info: appointmentContext || ''
    };

    emailjs.send(window.AppConfig.emailjs.serviceId, window.AppConfig.emailjs.templateId, templateParams)
        .then(function(response) {
           console.log('EmailJS SUCCESS!', response.status, response.text);
           if (feedbackElement) {
               feedbackElement.textContent = 'Your message has been sent successfully!';
               feedbackElement.classList.add('success');
               feedbackElement.style.display = 'block';
           } else {
               alert('Your message has been sent successfully!');
           }
           document.getElementById('counselor-email-form')?.reset();
           if (document.getElementById('appointment-context')) {
               document.getElementById('appointment-context').textContent = '';
           }
        }, function(error) {
           console.log('EmailJS FAILED...', error);
           const errorMessage = 'Failed to send the message. Please try again.';
           if (feedbackElement) {
               feedbackElement.textContent = errorMessage;
               feedbackElement.classList.add('error');
               feedbackElement.style.display = 'block';
           } else {
               alert(errorMessage);
           }
        })
        .finally(function() {
            sendButton.disabled = false;
            sendButton.textContent = 'Send Email';
            if (feedbackElement) {
                setTimeout(() => {
                    feedbackElement.style.display = 'none';
                }, 5000);
            }
        });
});

// Get counselor emails from config or fallback to default
function getCounselorEmails() {
    if (window.AppConfig) {
        if (window.AppConfig.useTestEmail && window.AppConfig.testEmail) {
            // Use test email for all counselors
            const testEmails = {};
            Object.keys(window.AppConfig.counselorEmails).forEach(name => {
                testEmails[name] = window.AppConfig.testEmail;
            });
            return testEmails;
        }
        return window.AppConfig.counselorEmails;
    }
    
    // Fallback if config not available
    return {
        "Kimberly Herring": "counselor@example.com",
        "Lindsey Ehrlich": "counselor@example.com",
        "Wendi Thomas": "counselor@example.com",
        "Sarah Gray": "counselor@example.com",
        "Margaret Kinney": "counselor@example.com",
        "Katie Bunyard": "counselor@example.com",
        "Ellen Zambrowsky-Huls": "counselor@example.com",
        "Kasey Dauenhauer": "counselor@example.com",
        "Tara Kapsch": "counselor@example.com",
        "JB Magpantay": "counselor@example.com"
    };
}

document.querySelectorAll('.counselor-item .btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get the counselor name from the sibling element
        const counselorItem = this.closest('.counselor-item');
        const counselorNameFull = counselorItem.querySelector('.counselor-name').textContent;
        
        // Extract the base name without the last name range
        const counselorName = counselorNameFull.split('(')[0].trim();
        
        // Find the email form and scroll to it
        const emailForm = document.querySelector('.email-form');
        emailForm.scrollIntoView({ behavior: 'smooth' });
        
        // Set the counselor's email in the "To" field
        const counselorEmails = getCounselorEmails();
        if (counselorEmails[counselorName]) {
            document.getElementById('email-to').value = counselorEmails[counselorName];
            
            // Set the appointment context message
            document.getElementById('appointment-context').textContent = `Booking an appointment with ${counselorName}`;
            
            // Update subject with counselor name
            document.getElementById('email-subject').value = `Appointment Request with ${counselorName}`;
            
            // Focus on the "From" field since "To" is already filled
            setTimeout(() => {
                document.getElementById('email-from').focus();
            }, 800); // Wait for the scroll to complete
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