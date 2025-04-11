// JavaScript source code
document.getElementById("sell-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const property = {
        title: document.getElementById("property-title").value,
        location: document.getElementById("location").value,
        price: document.getElementById("price").value,
        description: document.getElementById("description").value,
        image: document.getElementById("image").value
    };

    let listings = JSON.parse(localStorage.getItem("listings")) || [];
    listings.push(property);
    localStorage.setItem("listings", JSON.stringify(listings));

    alert("Property listed successfully!");
    window.location.href = "buy.html";
});
