# NestJS JWT Authentication and Question CRUD

This project is a practical demonstration of how to implement JWT (JSON Web Token) authentication in a NestJS application. It covers the creation of users, authentication, and also provides a complete CRUD (Create, Read, Update, Delete) functionality for questions. Additionally, it includes end-to-end (e2e) tests to ensure the reliability of the implemented features.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Tests](#tests)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   - Create a `.env` file at the root of the project.
   - Add the following variables:
     ```env
     JWT_SECRET=<your-secret-key>
     ```

## Usage

1. Start the application:

```bash
npm run start
```

2. Access the application at `http://localhost:3000`.

## Endpoints

- **User**
  - `POST /users`: Register a new user.
  - `POST /authenticate`: Log in and receive a JWT token.

- **Questions**
  - `GET /questions`: Get all questions.
  - `POST /questions`: Create a new question.

## Tests

To run the end-to-end tests:

```bash
npm run test:e2e
```

## Contributing

Feel free to contribute by opening issues or submitting pull requests. Your feedback is highly appreciated!

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to customize and add more details specific to your project. This template provides a solid starting point for your project's README file.