// Apply filters based on user selection
function applyFilters() {
    let priceFilter = document.getElementById("filter-price").value;
    let typeFilter = document.getElementById("filter-type").value;
    let searchQuery = document.getElementById("search-bar").value.toLowerCase();

    let properties = document.querySelectorAll(".property");

    properties.forEach(property => {
        let price = property.getAttribute("data-price");
        let type = property.getAttribute("data-type");
        let title = property.querySelector("h2").textContent.toLowerCase();

        // Check if property matches filters
        let matchesPrice = priceFilter === "" || price === priceFilter;
        let matchesType = typeFilter === "" || type === typeFilter;
        let matchesSearch = searchQuery === "" || title.includes(searchQuery);

        if (matchesPrice && matchesType && matchesSearch) {
            property.style.display = "block";
        } else {
            property.style.display = "none";
        }
    });
}

// Save property to favorites (Local Storage Example)
function saveToFavorites(propertyName) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (!favorites.includes(propertyName)) {
        favorites.push(propertyName);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        alert("Added to favorites!");
    } else {
        alert("Already in favorites!");
    }
}

// Contact seller (Redirects to Contact Page with Property Name)
function contactSeller(propertyName) {
    window.location.href = `contact.html?property=${propertyName}`;
}

// Load favorites (If needed for future features)
function loadFavorites() {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    console.log("User Favorites:", favorites);
}

// Run on page load
document.addEventListener("DOMContentLoaded", loadFavorites);
