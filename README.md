# MyNotes (Next.js version)

A very simple full-stack note board application, written for sandboxing and demonstration purposes.

It showcases the Next.js framework, specially the frontend features, since frontend development is my main area of interest, and one I'm passionate about.

Below is a breakdown of the most relevant application features:

### Frontend

- TypeScript code for static type checking
- Context API and reducers for state management
- Tailwind CSS for styling (with Headless UI and Heroicons)
- Accessibility by using semantic HTML, ARIA roles and attributes, and by ensuring color contrast
- Streaming using "loading.tsx" files leveraging React Suspense
- Graceful error handling
- Metadata templates

### Backend

- MongoDB database
- mongoose for data modelling and validation
- React Server Actions for data mutation
- next-auth and Next.js middleware for authentication and authorization
- Graceful error handling

This is a personal project so I'm not accepting contributions at the moment.

## Running locally

### Prerequisites

Building and running the application locally requires Node.js 20+ and either MongoDB Community Edition 6+ or a MongoDB Atlas account.

### Install dependencies

Run `npm install` to install all the needed packages for the project.

### Environment variables

Create a ".env.local" file containing the following key and value representing the address of the MongoDB instance:

`MONGODB_URI=your-mongodb-instance-address-goes-here`

Typically, a local MongoDB instance address looks like `mongodb://127.0.0.1:27017/your-database-name-goes-here`. If you're using MongoDB Atlas, use the connection string that is provided for your instance.

Run `npx auth secret` to generate a secret key that will be used to encrypt next-auth cookies. This will also add it to the ".env.local" file.

### Build and start

Run `npm run dev` to build the application and start the development server. The application can be accessed via http://localhost:3000.

## Next Steps

- Add tests using Playwright (with Playwright-BDD)
- Build a Tailwind CSS theme
- Implement containerization using Docker
- Deploy the application
- Automate deployment using GitHub actions
