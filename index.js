const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

function calculateDigitSum(num) {
    return String(Math.abs(num))
        .split('')
        .reduce((sum, digit) => sum + parseInt(digit, 10), 0);
}

function isArmstrong(num) {
    const digits = String(Math.abs(num)).split('').map(Number);
    const power = digits.length;
    const sum = digits.reduce((acc, digit) => acc + Math.pow(digit, power), 0);
    return sum === Math.abs(num);
}

function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function isPerfect(num) {
    let sum = 0;
    for (let i = 1; i <= num / 2; i++) {
        if (num % i === 0) sum += i;
    }
    return sum === num;
}

function getProperties(number) {
    const properties = [];

    if (isArmstrong(number)) properties.push("armstrong");
    if (isPrime(number)) properties.push("prime");
    if (isPerfect(number)) properties.push("perfect");
    properties.push(number % 2 === 0 ? "even" : "odd");

    return properties;
}

async function getFunFact(number) {
    try {
        const response = await axios.get(`http://numbersapi.com/${number}/math`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching fun fact: ${error.message}`);
        return `No fun fact found for ${number}`;
    }
}

// API Endpoint
app.get('/api/classify-number', async (req, res, next) => {
    try {
        const { number } = req.query;

        if (!number) {
            return res.status(400).json({
                error: true,
                number: "alphabet"
            });
        }

        const num = Number(number);

        if (isNaN(num) || !Number.isInteger(num)) {
            return res.status(400).json({
                error: true,
                number: "Invalid input: Please provide a valid integer"
            });
        }

        const response = {
            number: num,
            is_prime: isPrime(num),
            is_perfect: isPerfect(num),
            properties: getProperties(num),
            digit_sum: calculateDigitSum(num),
            fun_fact: await getFunFact(num)
        };

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
