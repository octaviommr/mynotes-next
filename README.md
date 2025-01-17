# MyNotes (Next.js version)

A very simple full-stack note board application, written for sandboxing and demonstration purposes.

It showcases the Next.js framework, specially the front-end features, since front-end development is my main area of interest and one I'm passionate about.

Below is a breakdown of the most relevant application features:

### Front-end

- TypeScript code for static type checking
- State management using Context API and reducers
- Tailwind CSS styling (with Headless UI and Heroicons)
- Accessibility by using ARIA roles and attributes and by ensuring color contrast
- Streaming using "loading.tsx" files, leveraging React Suspense
- Graceful error handling
- Metadata templates

### Back-end

- MongoDB database
- Data modelling and validation using mongoose
- Data mutation using React Server Actions
- Authentication and authorization using the "next-auth" package of Auth.js and Next.js middleware
- Graceful error handling

## Running locally

### Prerequisites

Building and running the application locally requires Node.js 20+ and MongoDB Community Edition 6+ to be installed in your system.

### Install dependencies

Run `npm install` to install all the needed packages for the project.

### Environment variables

Create a ".env.local" file containing the following key and value representing the MongoDB database running locally:

`MONGODB_URI=mongodb://127.0.0.1:27017/your-database-name-goes-here`

Run `npx auth secret` to generate a secret key that will be used to encrypt Auth.js cookies. This will also add it to the ".env.local" file.

### Build and start

Run `npm run dev` to build the application and start the development server. The application can be accessed via http://localhost:3000.
