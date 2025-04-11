// JavaScript source code
document.addEventListener("DOMContentLoaded", () => {
    const savedPropertyList = document.querySelector('.saved-property-list');
    const saved = JSON.parse(localStorage.getItem('favorites')) || [];

    if (saved.length === 0) {
        savedPropertyList.innerHTML = "<p>You haven't saved any properties yet!</p>";
    } else {
        saved.forEach(property => {
            const div = document.createElement('div');
            div.classList.add('property');
            div.innerHTML = `
                <h2>${property}</h2>
                <p>📍 Location: ${property}</p>
                <button onclick="removeProperty('${property}')">❌ Remove</button>
            `;
            savedPropertyList.appendChild(div);
        });
    }
});

function removeProperty(name) {
    let saved = JSON.parse(localStorage.getItem('favorites')) || [];
    saved = saved.filter(item => item !== name);
    localStorage.setItem('favorites', JSON.stringify(saved));
    location.reload();
}
