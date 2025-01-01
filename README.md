# TechLog (like Medium X) | [Live](https://medium-ecru-six.vercel.app)
<img src="https://github.com/user-attachments/assets/8a4cf938-9125-4df9-bcbb-7d7856c160cf" alt="Screenshot 2024-12-28 144922" width="200" height="200"/>

This project contains the source code for a Medium | X like platform. The project is divided into three main components: **Backend**, **Frontend**, and **Common** modules for shared utilities. The application allows users to read, write, and interact with articles, similar to Medium.

## Features

### User Features
- **Authentication:** Secure user login and registration.
- **Profile Management:** Edit profile details including name, and password.
- **Write and Edit Articles:** Create, update, and delete articles.
- **Explore Articles:** Browse articles by title.

## Technologies Used

### Backend
- **Node.js**: JavaScript runtime for server-side programming.
- **Hono**: Web framework for building RESTful APIs.
- **Prisma**: ORM for database management.
- **JWT**: Secure authentication using JSON Web Tokens.
- **Crypto**: Password hashing for secure storage.

### Frontend
- **React.js**: Library for building interactive user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Axios**: For making HTTP requests.

### Common
- Shared utilities and constants used across the application.

### Database
- **PostgreSQL**: Relational database for storing user, article, and interaction data.

### Deployment
- **Vercel**: For hosting the frontend.
- **Cloudflare Worker**: For hosting the backend.

## Getting Started

### Prerequisites
- **Node.js** and **npm** installed.
- **PostgreSQL** installed and running.

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Darshan98Solanki/medium.git
   cd medium
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   ```

4. **Run migrations:**
   Use Prisma to set up the database schema:
   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application should be accessible at `http://localhost:3000`.

## Project Structure
- **`backend/`**: Contains server-side code including API routes and Prisma ORM setup.
- **`frontend/`**: Contains React components, pages, and styling for the client-side application.
- **`common/`**: Shared utilities, constants, and helper functions.

## Contributing
We welcome contributions to improve the project! Follow these steps:

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

## Contact
For any questions or suggestions, feel free to contact [Darshan98Solanki](https://github.com/Darshan98Solanki).

