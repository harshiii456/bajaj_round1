# University Qualifier API

Production-ready REST API for university qualifier exam with Node.js and Express.

## Installation

```bash
npm install
```

## Environment Setup

1. Copy `.env.example` to `.env`
2. Update the environment variables:
   ```bash
   cp .env.example .env
   ```

3. Set your credentials in `.env`:
   ```
   OFFICIAL_EMAIL=your.email@chitkara.edu.in
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=3000
   ```

## Running the Application

```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### 1. Health Check

**GET** `/health`

Response:
```json
{
  "is_success": true,
  "official_email": "your.email@chitkara.edu.in"
}
```

### 2. BFHL Operations

**POST** `/bfhl`

Request body must contain exactly one of the following keys:

#### Fibonacci
```json
{
  "fibonacci": 10
}
```
Response:
```json
{
  "is_success": true,
  "official_email": "your.email@chitkara.edu.in",
  "data": [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
}
```

#### Prime Numbers
```json
{
  "prime": [2, 3, 4, 5, 6, 7, 8, 9, 10]
}
```
Response:
```json
{
  "is_success": true,
  "official_email": "your.email@chitkara.edu.in",
  "data": [2, 3, 5, 7]
}
```

#### LCM
```json
{
  "lcm": [4, 6, 8]
}
```
Response:
```json
{
  "is_success": true,
  "official_email": "your.email@chitkara.edu.in",
  "data": 24
}
```

#### HCF (GCD)
```json
{
  "hcf": [12, 18, 24]
}
```
Response:
```json
{
  "is_success": true,
  "official_email": "your.email@chitkara.edu.in",
  "data": 6
}
```

#### AI Question
```json
{
  "AI": "What is the capital of France?"
}
```
Response:
```json
{
  "is_success": true,
  "official_email": "your.email@chitkara.edu.in",
  "data": "paris"
}
```

## Error Responses

### Validation Error (400)
```json
{
  "is_success": false,
  "official_email": "your.email@chitkara.edu.in",
  "error": "Request must contain exactly one key"
}
```

### Method Not Allowed (405)
```json
{
  "is_success": false,
  "official_email": "your.email@chitkara.edu.in",
  "error": "Method not allowed"
}
```

### Internal Server Error (500)
```json
{
  "is_success": false,
  "official_email": "your.email@chitkara.edu.in",
  "error": "Internal server error"
}
```

## Validation Rules

- **fibonacci**: Number between 1 and 1000
- **prime**: Non-empty array of numbers
- **lcm**: Non-empty array of non-zero integers
- **hcf**: Non-empty array of integers
- **AI**: Non-empty string (sanitized for security)

## Security Features

- Rate limiting (100 requests per 15 minutes)
- Request body size limit (10KB)
- Prototype pollution prevention
- Input sanitization
- Helmet.js security headers
- No eval() or dynamic code execution

## Deployment

Ready to deploy on:
- Vercel
- Render
- Railway
- Any Node.js hosting platform

## Dependencies

- express: Web framework
- dotenv: Environment variables
- @google/generative-ai: Gemini API integration
- helmet: Security headers
- express-rate-limit: Rate limiting

## Testing

```bash
# Health check
curl http://localhost:3000/health

# Fibonacci
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"fibonacci": 5}'

# Prime numbers
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"prime": [2, 3, 4, 5, 6]}'
```
