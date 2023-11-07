# Hello Reeinvent!

For information on how to run server and client locally, check respective READMEs in /server and /client.

## Notes

Server functionality is served in Cloud Run instance with CICD directly via Dockerfile in /server.
Available at: https://reeinvent-tech-test-st7ohfgpsq-lz.a.run.app/

Client is server using Vercel, since it is very, very, very fast. CI/CD setup with GitHub.
Available at:
https://reeinvent-tech-test.vercel.app/

## Backlog

### Main functionality:

- Write API documentation for synonym API (swagger?)
- Add component in client for "adding" synonyms
- Add component to "search" for
- Style components
- Customize CORS headers for production
- Refactor API code with DRY in mind
- Add error handling for bad requests in API

### Maybe later:

- Unit tests for frontend components
- End-to-end test after deploy
- Add API key
