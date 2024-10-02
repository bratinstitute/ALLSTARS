document.getElementById('compatibility-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const sunSign = document.getElementById('sun-sign').value;
    const moonSign = document.getElementById('moon-sign').value;
    const risingSign = document.getElementById('rising-sign').value;

    // Assuming you will define the degrees somewhere; otherwise, use dummy values
    const sunDegree = 0;  // You need to replace this with actual logic for degrees
    const moonDegree = 0;  // You need to replace this with actual logic for degrees
    const risingDegree = 0;  // You need to replace this with actual logic for degrees

    fetch(`/compatibility?s=${sunSign}&m=${moonSign}&r=${risingSign}`)
        .then(response => response.json())
        .then(data => {
            // Sort the data array based on the score, in descending order
            data.sort((a, b) => b.score - a.score);

            // Display only the most compatible person (hide the score)
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';  // Clear previous results

            if (data.length > 0) {
                const topMatch = data[0];  // Get the most compatible person
                const topMatchElement = document.createElement('div');
                topMatchElement.innerText = `Your team is the ${topMatch.name}`;  // Hide the score, only show the name
                resultsDiv.appendChild(topMatchElement);
            }

            // (Optional) Log other results or do nothing with them
            // The following part just hides the other results from the user
        })
        .catch(error => console.error('Error:', error));
});
