## Tutorial: Setting Up a Basic NestJS Project

In this tutorial, we will walk through the steps to set up a basic NestJS project. By the end of this tutorial, you will have a working NestJS application ready for development.

### Prerequisites

Before we begin, make sure you have the following prerequisites installed on your machine:

- Node.js (version 12 or higher)
- npm (Node Package Manager)

### Step 1: Create a new NestJS project

1. Open your terminal or command prompt.
2. Create a new directory for your project: `mkdir nestjs-project`.
3. Navigate to the project directory: `cd nestjs-project`.
4. Initialize a new Node.js project: `npm init -y`. This will create a `package.json` file with default configurations.

### Step 2: Install the NestJS CLI

1. In the project directory, install the NestJS CLI globally: `npm install -g @nestjs/cli`. This will provide a command-line interface for generating NestJS components and scaffolding your application.

### Step 3: Generate a new NestJS application

1. In the project directory, generate a new NestJS application using the CLI: `nest new`. You will be prompted to provide a name for your application.
2. Once the installation is complete, navigate into the newly created application directory: `cd <your-application-name>`.

### Step 4: Run the application

1. In the application directory, start the development server: `npm run start:dev`. This command will compile your TypeScript code and start the NestJS application.
2. Open your browser and visit `http://localhost:3000`. You should see a "Hello World!" message, indicating that your NestJS application is running successfully.

Congratulations! You have set up a basic NestJS project. You can now start developing your NestJS application by creating controllers, services, and modules as needed.

### Next Steps

- Explore the project structure and familiarize yourself with the main files and directories.
- Take a look at the `src/main.ts` file, which serves as the entry point for your application.
- Start building your application by creating controllers, services, and modules using the NestJS CLI commands.

```bash
# Generate a new controller
nest generate controller cats

# Generate a new service
nest generate service cats
```

Refer to the official NestJS documentation for more details on how to build your application and utilize the framework's features: [https://docs.nestjs.com](https://docs.nestjs.com)

That's it! You are now ready to start developing your NestJS application. Enjoy coding with NestJS!