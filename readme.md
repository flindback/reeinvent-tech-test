# Hello Reeinvent!

For information on how to run server and client locally, check respective READMEs in /server and /client.

## Notes

Server functionality is served in Cloud Run instance with CICD directly via Dockerfile in /server.
Available at: https://reeinvent-tech-test-st7ohfgpsq-lz.a.run.app/

Client is server using Vercel, since it is very, very, very fast. CI/CD setup with GitHub.
Available at:
https://reeinvent-tech-test.vercel.app/

# Synonyms API Documentation

Overview
The Synonyms API allows you to add pairs of synonyms and find synonyms for a given word. It has two main endpoints: /add for adding synonyms and /find for retrieving synonyms.

## Base URL

The API is accessed through the base URL https://reeinvent-tech-test-st7ohfgpsq-lz.a.run.app/. For local development, use http://localhost:8080.

## Endpoints

### 1. Add Synonyms

**Request**
URL: /add
Method: POST
Content-Type: application/json
Body Parameters:
words (array of strings): An array containing at least two words that are synonyms.

200 OK: Synonyms added successfully.
Body (JSON):

    {
    "success": true,
    "message": "Words added successfully"
    }

400 Bad Request: No words to add.
Body (JSON):

    {
    "success": false,
    "message": "No words to add"
    }

**Example**
bash
Copy code
curl -X POST http://https://reeinvent-tech-test-st7ohfgpsq-lz.a.run.app/add \
-H "Content-Type: application/json" \
-d '{"words": ["fast", "quick"]}'

### 2. Find Synonyms

Request
URL: /find
Method: POST
Content-Type: application/json
Body Parameters:
word (string): The word for which to find synonyms.

**Response**
200 OK: Successfully found synonyms or no synonyms found.

Body when synonyms found (JSON):

    {
    "success": true,
    "message": "Successfully found synonyms for [word]",
    "synonyms": ["synonym1", "synonym2", ...]
    }

Body when no synonyms found (JSON):

    {
    "success": false,
    "message": "No synonyms found for [word]"
    }

400 Bad Request: No word in request.
Body (JSON):

    {
    "success": false,
    "message": "No word in request"
    }

**Example**
bash:
curl -X POST http://localhost:8080/find \
-H "Content-Type: application/json" \
-d '{"word": "fast"}'
CORS Support
This API supports Cross-Origin Resource Sharing (CORS) from the following origins:

https://reeinvent-tech-test.vercel.app
http://localhost:5173
For preflight requests, the API responds to OPTIONS with the allowed methods OPTIONS, POST.

**Error Handling**
Common HTTP status codes returned by the API include:

- 200 OK: The request was successful.
- 400 Bad Request: The request could not be understood by the server due to malformed syntax.
- 403 Forbidden: The server understood the request but refuses to authorize it.
- 404 Not Found: The server has not found anything matching the request URI.
- 500 Internal Server Error: The server encountered an unexpected condition that prevented it from fulfilling the request.

# Backlog

### Main functionality:

- Doneski, for now

### Maybe later:

- Unit tests for frontend components
- End-to-end test after deploy
- Add API key
- Refactor SynonymsContext
