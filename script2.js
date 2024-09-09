document.addEventListener("DOMContentLoaded", function() {
    const h1 = document.querySelector('.h1-animation');
    const text = h1.textContent;
    h1.innerHTML = '';

    for (let letter of text) {
        const span = document.createElement('span');
        span.textContent = letter;

        // Add a space for word separation
        if (letter === ' ') {
            span.innerHTML = '&nbsp;';
        }

        h1.appendChild(span);
    }
});


setTimeout(() => {
    // Add bounce effect to all text elements
    const textElements = document.querySelectorAll('h1, h2, h3, p'); // Adjust selectors as needed
    textElements.forEach(el => el.classList.add('bounce'));

    // Add fade-out effect to the body
    document.body.classList.add('zoom-blur');

    // Navigate to the new page after animation
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000); // Match this duration with the CSS transition duration
},3000); // Delay before animation starts
