const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const subjectError = document.getElementById("subjectError");
const messageError = document.getElementById("messageError");
const successMessage = document.getElementById("success");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    nameError.textContent = "";
    emailError.textContent = "";
    subjectError.textContent = "";
    messageError.textContent = "";
    successMessage.textContent = "";

    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const subjectValue = subjectInput.value.trim();
    const messageValue = messageInput.value.trim();

    if (nameValue === "") {
        nameError.textContent = "Por favor, ingrese su nombre.";
    }

    if (emailValue === "") {
        emailError.textContent = "Por favor, ingrese su dirección de correo electrónico.";
    } else if (!isValidEmail(emailValue)) {
        emailError.textContent = "Ingrese una dirección de correo electrónico válida.";
    }

          if (subjectValue === "") {
        subjectError.textContent = "Por favor, ingrese un asunto.";
    }

    if (messageValue === "") {
        messageError.textContent = "Por favor, ingrese un mensaje.";
    }

    if (nameError.textContent === "" && emailError.textContent === "" && subjectError.textContent === "" && messageError.textContent === "") {
        successMessage.textContent = "¡Mensaje enviado con éxito!";
        form.reset();
    }
});

function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
}