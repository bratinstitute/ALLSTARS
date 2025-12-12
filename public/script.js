document.getElementById('compatibility-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const sunSign = document.getElementById('sun-sign').value;
    const moonSign = document.getElementById('moon-sign').value;
    const risingSign = document.getElementById('rising-sign').value;

    fetch(`/compatibility?s=${sunSign}&m=${moonSign}&r=${risingSign}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Display compatibility result in the #results div
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = `Your team is the ${data[0].name}!`;
            resultsDiv.scrollIntoView({ behavior: 'smooth' }); // Smoothly scroll to the results
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an issue submitting your form. Please try again.');
        });
});
