document.getElementById('compatibility-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const sunSign = document.getElementById('sun-sign').value;
    const moonSign = document.getElementById('moon-sign').value;
    const risingSign = document.getElementById('rising-sign').value;
    const email = document.getElementById('email').value;

    // Check if email is provided
    if (!email) {
        alert("Please enter your email address to receive the results.");
        return;
    }

    fetch(`/compatibility?s=${sunSign}&m=${moonSign}&r=${risingSign}&email=${email}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Display compatibility result in HTML
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = `Your team is the ${data[0].name}`;

            // Clear the email field to indicate successful submission
            document.getElementById('email').value = '';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an issue submitting your form. Please try again.');
        });
});