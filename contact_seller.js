document.addEventListener("DOMContentLoaded", function () {
    // Get property name from URL
    const urlParams = new URLSearchParams(window.location.search);
    const propertyName = urlParams.get('property');

    // Set property name field
    if (propertyName) {
        document.getElementById("property-name").value = propertyName;
    }

    // Handle form submission
    document.getElementById("contact-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form from actually submitting

        // Get form data
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const message = document.getElementById("message").value;

        // Simulate form submission (You can replace this with an API call)
        alert(`Message sent to seller!\n\nProperty: ${propertyName}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`);

        // Clear form after submission
        document.getElementById("contact-form").reset();
    });
});
