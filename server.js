const express = require('express');
const path = require('path'); // Import path module for serving files
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

const elements = {
    "Leo": "Fire", "Sagittarius": "Fire", "Aries": "Fire",
    "Taurus": "Earth", "Virgo": "Earth", "Capricorn": "Earth",
    "Gemini": "Air", "Libra": "Air", "Aquarius": "Air",
    "Cancer": "Water", "Scorpio": "Water", "Pisces": "Water"
};

const signs = [
    { name: "Royals", sun: { sign: "Capricorn" }, moon: { sign: "Gemini" }, rising: { sign: "Gemini" }},
    { name: "Diamondbacks", sun: { sign: "Capricorn" }, moon: { sign: "Taurus" }, rising: { sign: "Pisces" }},
    { name: "Mariners", sun: { sign: "Aquarius" }, moon: { sign: "Aries" }, rising: { sign: "Gemini" }},
    { name: "Rays", sun: { sign: "Pisces" }, moon: { sign: "Gemini" }, rising: { sign: "Taurus" }},
    { name: "Yankees", sun: { sign: "Pisces" }, moon: { sign: "Virgo" }, rising: { sign: "Cancer" }},
    { name: "Brewers", sun: { sign: "Pisces" }, moon: { sign: "Cancer" }, rising: { sign: "Cancer" }},
    { name: "White Sox", sun: { sign: "Aries" }, moon: { sign: "Sagittarius" }, rising: { sign: "Cancer" }},
    { name: "Angels", sun: { sign: "Aries" }, moon: { sign: "Pisces" }, rising: { sign: "Cancer" }},
    { name: "Reds", sun: { sign: "Aries" }, moon: { sign: "Taurus" }, rising: { sign: "Gemini" }},
    { name: "Cubs", sun: { sign: "Aries" }, moon: { sign: "Aries" }, rising: { sign: "Leo" }},
    { name: "Braves", sun: { sign: "Aries" }, moon: { sign: "Capricorn" }, rising: { sign: "Scorpio" }},
    { name: "Pirates", sun: { sign: "Taurus" }, moon: { sign: "Libra" }, rising: { sign: "Virgo" }},
    { name: "Tigers", sun: { sign: "Taurus" }, moon: { sign: "Leo" }, rising: { sign: "Leo" }},
    { name: "Cardinals", sun: { sign: "Taurus" }, moon: { sign: "Taurus" }, rising: { sign: "Leo" }},
    { name: "Phillies", sun: { sign: "Taurus" }, moon: { sign: "Aquarius" }, rising: { sign: "Leo" }},
    { name: "A's", sun: { sign: "Taurus" }, moon: { sign: "Aries" }, rising: { sign: "Virgo" }},
    { name: "Padres", sun: { sign: "Gemini" }, moon: { sign: "Gemini" }, rising: { sign: "Gemini" }},
    { name: "Giants", sun: { sign: "Gemini" }, moon: { sign: "Taurus" }, rising: { sign: "Libra" }},
    { name: "Marlins", sun: { sign: "Gemini" }, moon: { sign: "Taurus" }, rising: { sign: "Virgo" }},
    { name: "Rockies", sun: { sign: "Cancer" }, moon: { sign: "Aries" }, rising: { sign: "Virgo" }},
    { name: "Blue Jays", sun: { sign: "Leo" }, moon: { sign: "Pisces" }, rising: { sign: "Libra" }},
    { name: "Rangers", sun: { sign: "Virgo" }, moon: { sign: "Libra" }, rising: { sign: "Scorpio" }},
    { name: "Orioles", sun: { sign: "Libra" }, moon: { sign: "Gemini" }, rising: { sign: "Sagittarius" }},
    { name: "Dodgers", sun: { sign: "Libra" }, moon: { sign: "Aries" }, rising: { sign: "Capricorn" }},
    { name: "Mets", sun: { sign: "Libra" }, moon: { sign: "Virgo" }, rising: { sign: "Sagittarius" }},
    { name: "Guardians", sun: { sign: "Scorpio" }, moon: { sign: "Gemini" }, rising: { sign: "Aquarius" }},
    { name: "Twins", sun: { sign: "Sagittarius" }, moon: { sign: "Pisces" }, rising: { sign: "Taurus" }},
    { name: "Astros", sun: { sign: "Sagittarius" }, moon: { sign: "Scorpio" }, rising: { sign: "Aries" }},
    { name: "Nationals", sun: { sign: "Sagittarius" }, moon: { sign: "Leo" }, rising: { sign: "Aquarius" }},
    { name: "Red Sox", sun: { sign: "Sagittarius" }, moon: { sign: "Gemini" }, rising: { sign: "Aries" }}
];

// Removed degree-related functions

const calculateElementCompatibility = (element1, element2) => {
    if (element1 === element2) return 1.0; // Perfect match
    if ((element1 === "Fire" && element2 === "Air") || (element1 === "Earth" && element2 === "Water")) return 0.75; // Compatible
    return 0.5; // Less compatible
};

// Updated compatibility function without degree calculations
const calculateCompatibility = (userSun, userMoon, userRising) => {
    return signs.map(person => {
        // Using elements directly for compatibility scores
        const sunElementBonus = calculateElementCompatibility(userSun.element, elements[person.sun.sign]);
        const moonElementBonus = calculateElementCompatibility(userMoon.element, elements[person.moon.sign]);
        const risingElementBonus = calculateElementCompatibility(userRising.element, elements[person.rising.sign]);

        // Set a base score based on element compatibility
        const totalScore = (sunElementBonus * 0.5) + (moonElementBonus * 0.3) + (risingElementBonus * 0.2);

        // Normalize to a 0-100 scale
        return { name: person.name, score: Math.round(totalScore * 100) };
    }).sort((a, b) => b.score - a.score); // Sort by highest compatibility
};

app.get('/compatibility', (req, res) => {
    const { s, m, r } = req.query; // Get parameters from the query string

    const userSun = { element: elements[s] }; // Only element is necessary
    const userMoon = { element: elements[m] }; // Same here
    const userRising = { element: elements[r] }; // Same here

    const results = calculateCompatibility(userSun, userMoon, userRising);
    res.json(results);
});

// Serve the index.html file when accessing the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Adjust path if necessary
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
