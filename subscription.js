// subscription.js

// Firestore reference
const db = firebase.firestore();

// Subscribe a user to property alerts
function subscribeUser() {
    const emailInput = document.getElementById("subscriber-email");
    const email = emailInput.value.trim();
    const message = document.getElementById("subscription-message");

    if (!email) {
        message.textContent = "Please enter a valid email!";
        return;
    }

    // Save email to Firestore
    db.collection("subscribers").add({ email: email })
        .then(() => {
            message.textContent = "Subscribed successfully!";
            emailInput.value = "";
        })
        .catch(error => {
            message.textContent = "Error subscribing. Try again!";
            console.error("Error subscribing:", error);
        });
}

// Notify subscribers when a new listing is added
function notifySubscribers(propertyTitle, propertyLocation) {
    db.collection("subscribers").get().then(snapshot => {
        snapshot.forEach(doc => {
            const email = doc.data().email;

            // Simulate email notification (Replace with actual email API)
            console.log(`📩 Sending email to ${email}: "New Property Alert - ${propertyTitle} in ${propertyLocation}"`);
        });
    }).catch(error => {
        console.error("Error fetching subscribers:", error);
    });
}

// Function to add a new property listing and notify subscribers
function addNewListing(title, location, price, description, image) {
    const newProperty = { title, location, price, description, image };

    let listings = JSON.parse(localStorage.getItem("listings")) || [];
    listings.push(newProperty);
    localStorage.setItem("listings", JSON.stringify(listings));

    // Notify subscribers
    notifySubscribers(title, location);

    // Re-render listings
    renderBuyListings();
}
