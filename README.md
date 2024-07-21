# Jobs API

This Express.js application provides a backend for job management, featuring secure authentication and a comprehensive API documentation accessible via Swagger UI. The application is designed to handle job-related operations securely with JSON Web Tokens (JWT) and integrates MongoDB for data persistence.

## Features

- **Authentication**: Utilizes JWT for secure user authentication.
- **CRUD Operations**: Supports create, read, update, and delete operations for job management.
- **Security**: Implements security measures including rate limiting, CORS, XSS protection, and secure HTTP headers.
- **Swagger UI**: Integrated Swagger UI for easy testing and interaction with the API endpoints.
- **MongoDB Integration**: Uses MongoDB with Mongoose for optimal data management and schema validation.

## Documentation

For detailed API documentation, visit the Swagger UI documentation hosted on Render at [Jobs API Documentation](https://render-jobs-api-sy4l.onrender.com/api-docs).

## Development

This project uses various npm packages to enhance functionality and security:

- `express` for server setup and routing.
- `mongoose` for MongoDB interactions.
- `jsonwebtoken` and `bcryptjs` for authentication and password hashing.
- `swagger-ui-express` for embedding Swagger UI.
- `helmet`, `cors`, `xss-clean`, and `express-rate-limit` for security enhancements.

## Security Enhancements

- **Helmet**: Sets various HTTP headers to protect against common vulnerabilities.
- **CORS**: Configures Cross-Origin Resource Sharing.
- **XSS-Clean**: Sanitizes user input to prevent XSS attacks.
- **Rate Limiting**: Prevents brute-force attacks by limiting the number of requests a user can make to the API.

## Continuous Integration

- **ESLint** and **Prettier**: Ensures code quality and style consistency.
- **Nodemon**: Used in development for automatic server restarts upon file changes.

## Deployment

The application is deployed on Render, with a dedicated and private repository for deployment configurations and sensitive data management.

For more information on the API endpoints and usage, please refer to the live [Swagger UI documentation](https://render-jobs-api-sy4l.onrender.com/api-docs).
