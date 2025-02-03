# Number Classification API

## 📌Overview
This API takes a number as input and returns its mathematical properties along with a fun fact.

## Endpoints
### GET /api/classify-number?number=371
#### Parameters:
- `number`: Required integer parameter.

#### 🔹Success Response (200 OK):
```json
{
    "number": 371,
    "is_prime": false,
    "is_perfect": false,
    "properties": ["armstrong", "odd"],
    "digit_sum": 11,
    "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}
```

#### 🔹Error Response (400 BAD):
```json
{
    "number": "alphabet",
    "error": true
}
```

## 🚀 Deployment
### The API is deployed at 
https://number-api-two.vercel.app/api/classify-number?number=341

## Technologies Used
- Node.js
- Express.js
- Axios
- CORS

## Installation
- Clone the repository:
  ```sh
  git clone https://github.com/Mj-devs/NumberApi
  ```
  
- Install dependencies: npm install
- Start the server: node index.js

## Testing
You can test the API using tools like Postman or cURL.
cURL command: 
```sh
curl "https://number-api-two.vercel.app/api/classify-number?number=mj"
```

## Contribution
Feel free to contribute by submitting issues or pull requests.
