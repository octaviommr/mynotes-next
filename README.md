# MyNotes (Next.js version)

A very simple full-stack note board application, written for sandboxing, learning, and demonstration purposes.

It showcases the Next.js framework, especially the frontend features, since frontend development is my main area of interest and one I'm passionate about.

Below is a breakdown of the most relevant application features:

### Frontend

- TypeScript code for static type checking
- Context API and reducers for state management
- Tailwind CSS for styling (with Headless UI and Heroicons)
- Accessibility features, including the use of semantic HTML, ARIA roles and attributes, and sufficient color contrast for readability
- Streaming using `loading.tsx` files leveraging React Suspense
- Graceful error handling
- Metadata templates

### Backend

- MongoDB database
- mongoose for data modelling and validation
- React Server Actions for data mutation
- next-auth and Next.js middleware for authentication and authorization
- Graceful error handling

This is a personal project so I'm not accepting contributions at the moment.
This project is not intended as production-ready software.

## Running Locally

### Prerequisites

Building and running the application locally requires Node.js 20+ and either MongoDB Community Edition 6+ or a MongoDB Atlas account.

### Install Dependencies

Run `npm install` to install all the needed packages for the project.

### Environment Variables

Copy `.env.example` to `.env.local` and fill in the required values.

If you're using MongoDB Atlas, use the connection string that is provided for your instance as the value for `MONGODB_URI`.

Run `npx auth secret` to generate a secret key for `AUTH_SECRET`, which will be used to encrypt next-auth cookies.

### Start

Run `npm run dev` to start the development server. The application can be accessed via http://localhost:3000.

## Next Steps

- Add tests using Playwright (with Playwright-BDD)
- Create a Tailwind CSS theme
- Deploy the application
- Implement CI/CD to automate deployment with GitHub Actions
- Implement containerization with Docker

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
