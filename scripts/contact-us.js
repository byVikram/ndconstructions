// Form Validation
const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const projectType = document.getElementById("project-type").value;
    const message = document.getElementById("message").value;
    const consent = document.getElementById("consent").checked;
    let isValid = true;
    // Simple validation
    if (!name) {
        isValid = false;
        document.getElementById("name").classList.add("border-red-500");
    } else {
        document.getElementById("name").classList.remove("border-red-500");
    }
    if (!email || !email.includes("@")) {
        isValid = false;
        document.getElementById("email").classList.add("border-red-500");
    } else {
        document.getElementById("email").classList.remove("border-red-500");
    }
    if (!phone) {
        isValid = false;
        document.getElementById("phone").classList.add("border-red-500");
    } else {
        document.getElementById("phone").classList.remove("border-red-500");
    }
    if (!projectType) {
        isValid = false;
        document.getElementById("project-type").classList.add("border-red-500");
    } else {
        document
            .getElementById("project-type")
            .classList.remove("border-red-500");
    }
    if (!message) {
        isValid = false;
        document.getElementById("message").classList.add("border-red-500");
    } else {
        document.getElementById("message").classList.remove("border-red-500");
    }
    if (!consent) {
        isValid = false;
        document.querySelector(".checkmark").classList.add("border-red-500");
    } else {
        document.querySelector(".checkmark").classList.remove("border-red-500");
    }
    if (isValid) {
        // In a real implementation, this would submit to a server
        alert("Thank you for your message! We will contact you soon.");
        contactForm.reset();
    }
});