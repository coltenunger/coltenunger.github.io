const contactForm = document.getElementById('contact-form'),
    contactMessage = document.getElementById('contact-message')

const sendEmail = (e) => {
    e.preventDefault()

    // serviceID - templateID - #form - publicKey
    emailjs.sendForm('service_34jbhvg', 'template_fopu9ka', '#contact-form', 'E9e_Tc5W9dGBB1Equ')
        .then(() => {
            // Show sent message
            contactMessage.textContent = 'Message sent successfully'

            // Remove message after 3 seconds
            setTimeout(() => {
                contactMessage.textContent = ''
            }, 3000)

            // Clear input fields
            contactForm.reset()
        }, () => {
            // Show error message
            contactMessage.textContent = 'Message could not be sent (server error)'
        })
}

contactForm.addEventListener('submit', sendEmail)