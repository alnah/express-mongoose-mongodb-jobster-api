# Jobs API

This Express.js application provides a backend for job management, featuring secure authentication and a comprehensive API documentation accessible. The application is designed to handle job-related operations securely with JSON Web Tokens (JWT) and integrates MongoDB for data persistence.

## Features

- **Authentication**: Utilizes JWT for secure user authentication.
- **CRUD Operations**: Supports create, read, update, and delete operations for job management.
- **Security**: Implements security measures such as rate limiting.
- **MongoDB Integration**: Uses MongoDB with Mongoose for optimal data 
  management and schema validation.
- **Statistics**: Provides monthly application statistics with the `showStats` 
  function.

## Development

This project uses various npm packages to enhance functionality and security:

- `express` for server setup and routing.
- `mongoose` for MongoDB interactions.
- `jsonwebtoken` and `bcryptjs` for authentication and password hashing.
- `express-rate-limit` for rate limiting 
  enhancements.
- `moment` for date formatting in statistics.

## Security Enhancements

- **Rate Limiting**: Prevents brute-force attacks by limiting the number of 
  requests a user can make to the API.

## Continuous Integration

- **ESLint** and **Prettier**: Ensures code quality and style consistency.
- **Nodemon**: Used in development for automatic server restarts upon file 
  changes.

## Deployment

The application is deployed on Render with a dedicated private repository and a React client.

[Jobster API](https://render-jobster-api.onrender.com).
