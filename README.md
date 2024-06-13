# Project Name

This project is a [brief description of your project].

## Technologies Used

- Express.js
- Redis
- Axios
- CORS
- dotenv
- Zod

## Installation

**Clone the repository:**

```bash
git clone <repository-url>
cd <project-folder>
```

**Clone the repository:**

```bash
npm install
```

**Set up environment variables:**
Create a .env file in the root directory and add the necessary environment variables:

```
PORT=3000
REDIS_URL=redis://<username>:<password>@<host>:<port>
```

Replace <username>, <password>, <host>, <port> with your Redis server details.

**Build the project:**

```bash
npm build
```

**Start the server:**

```bash
npm start
```

## API Endpoint

**GET /api/product/:id**
Retrieves product information based on the provided id.

Example request:

```bash
curl http://localhost:3000/api/product/B07HGTZSZY
```

Example request:

```json
{
  "code": "B07HGTZSZY",
  "title": "Super Widget 3000",
  "variationCount": 3,
  "ratingCount": 120,
  "averageRating": 3.5,
  "buyBoxPrices": {
    "last30Days": 299.99,
    "last90Days": 279.99,
    "last180Days": 249.99
  },
  "inStockRate": {
    "last30Days": 95,
    "last90Days": 92,
    "last180Days": 88
  },
  "salesRankChartData": {
    "labels": ["2024-01-01", "2024-02-01", "2024-03-01"],
    "data": [1200, 1150, 1100]
  },
  "productImage": "http://example.com/image.jpg"
}
```
