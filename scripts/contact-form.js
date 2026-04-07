const form = document.querySelector('.js-contact-form');
const nameInput = document.querySelector('.input-name');
const emailInput = document.querySelector('.input-email');
const messageInput = document.querySelector('.input-message');

const nameError = document.querySelector('.js-name-error');
const emailError = document.querySelector('.js-email-error');
const messageError = document.querySelector('.js-message-error');

const sendButton = document.querySelector('.js-send-button');
const buttonText = document.querySelector('.js-button-text');
const formStatus = document.querySelector('.js-form-status');

function showError(input, errorElement, message) {
    input.classList.add('error');
    input.classList.remove('success');
    errorElement.textContent = message;
}

function showSuccess(input, errorElement) {
    input.classList.remove('error');
    input.classList.add('success');
    errorElement.textContent = '';
}

function clearStatus() {
    formStatus.textContent = '';
    formStatus.classList.remove('success-message', 'error-message');
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateName() {
    const value = nameInput.value.trim();

    if (value === '') {
        showError(nameInput, nameError, 'Name is required');
        return false;
    }

    if (value.length < 3) {
        showError(nameInput, nameError, 'Name must be at least 3 characters');
        return false;
    }

    showSuccess(nameInput, nameError);
    return true;
}

function validateEmail() {
    const value = emailInput.value.trim();

    if (value === '') {
        showError(emailInput, emailError, 'Email is required');
        return false;
    }

    if (!isValidEmail(value)) {
        showError(emailInput, emailError, 'Enter a valid email address');
        return false;
    }

    showSuccess(emailInput, emailError);
    return true;
}

function validateMessage() {
    const value = messageInput.value.trim();

    if (value === '') {
        showError(messageInput, messageError, 'Message is required');
        return false;
    }

    if (value.length < 10) {
        showError(messageInput, messageError, 'Message must be at least 10 characters');
        return false;
    }

    showSuccess(messageInput, messageError);
    return true;
}

nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
messageInput.addEventListener('input', validateMessage);

(function () {
    emailjs.init("wg1Ki3dMFsPfdHA0u");
})();

form.addEventListener('submit', function (event) {
    event.preventDefault();
    clearStatus();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();

    if (!isNameValid || !isEmailValid || !isMessageValid) {
        formStatus.textContent = "Please fix the errors before sending.";
        formStatus.classList.add("error-message");
        return;
    }

    sendButton.disabled = true;
    buttonText.textContent = "Sending...";

    emailjs.send("service_n374frp", "template_6p08hew", {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        message: messageInput.value.trim()
    })
    .then((response) => {
        console.log("SUCCESS!", response);

        formStatus.textContent = "Message sent successfully!";
        formStatus.classList.remove("error-message");
        formStatus.classList.add("success-message");

        form.reset();
        buttonText.textContent = "Send";
        sendButton.disabled = false;
    })
    .catch((error) => {
        console.log("FAILED...", error);

        formStatus.textContent = `Failed to send message: ${error.text || 'Unknown error'}`;
        formStatus.classList.remove("success-message");
        formStatus.classList.add("error-message");

        buttonText.textContent = "Send";
        sendButton.disabled = false;
    });
});