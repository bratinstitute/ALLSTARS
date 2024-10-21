document.getElementById('compatibility-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const sunSign = document.getElementById('sun-sign').value;
    const moonSign = document.getElementById('moon-sign').value;
    const risingSign = document.getElementById('rising-sign').value;

    fetch(`/compatibility?s=${sunSign}&m=${moonSign}&r=${risingSign}`)
        .then(response => response.json())
        .then(data => {
            // Sort the data array based on the score, in descending order
            data.sort((a, b) => b.score - a.score);

            // Display only the most compatible team
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';  // Clear previous results

            if (data.length > 0) {
                const topMatch = data[0];  // Get the most compatible team
                const teamName = topMatch.name;  // The team name

                // Display the text result
                const topMatchElement = document.createElement('div');
                topMatchElement.innerText = `Your team is the ${teamName}`;
                resultsDiv.appendChild(topMatchElement);

                // Display the team image (converting team name to lowercase)
                const imageElement = document.createElement('img');
                imageElement.src = `./images/teams/${teamName.toLowerCase()}.jpg`;  // Assuming the image files are in a folder named 'images'
                imageElement.alt = `${teamName}`;
                resultsDiv.appendChild(imageElement);  // Add the image to the results div
            }

            // (Optional) Log other results or do nothing with them
        })
        .catch(error => console.error('Error:', error));
});

