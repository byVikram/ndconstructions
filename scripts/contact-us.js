document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const projectType = document.getElementById("project-type");
    const message = document.getElementById("message");
    const consent = document.getElementById("consent");

    let isValid = true;

    // Validation logic
    if (!name.value.trim()) {
        name.classList.add("border-red-500");
        isValid = false;
    } else {
        name.classList.remove("border-red-500");
    }

    if (!email.value.includes("@")) {
        email.classList.add("border-red-500");
        isValid = false;
    } else {
        email.classList.remove("border-red-500");
    }

    if (!phone.value.trim()) {
        phone.classList.add("border-red-500");
        isValid = false;
    } else {
        phone.classList.remove("border-red-500");
    }

    if (!projectType.value) {
        projectType.classList.add("border-red-500");
        isValid = false;
    } else {
        projectType.classList.remove("border-red-500");
    }

    if (!message.value.trim()) {
        message.classList.add("border-red-500");
        isValid = false;
    } else {
        message.classList.remove("border-red-500");
    }

    if (!consent.checked) {
        document.querySelector(".checkmark").classList.add("border-red-500");
        isValid = false;
    } else {
        document.querySelector(".checkmark").classList.remove("border-red-500");
    }

    // If valid, send email via EmailJS
    if (isValid) {
        emailjs.sendForm("service_64xpk1d", "template_wlhq7jo", this)
            .then(function () {
                alert("Message sent successfully!");
                document.getElementById("contact-form").reset();
            }, function (error) {
                console.error("Email sending failed:", error);
                alert("There was an error. Please try again.");
            });
    }
});