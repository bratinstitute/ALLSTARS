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
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';
            data.forEach(person => {
                const scoreElement = document.createElement('div');
                scoreElement.innerText = `${person.name}: Score ${person.score}`; // Use person.name instead of Person {id}
                resultsDiv.appendChild(scoreElement);
            });
        })
        .catch(error => console.error('Error:', error));
});
