# Inter-Human-Caribou Harmony (IHCH) Application

The Inter-Human-Caribou Harmony (IHCH) Application is a MongoDB, Express, React.js and Node.js (MERN) stack application that allows eligible caribou to report human sightings and securely communicate with other caribou using the application. The application incorporates the Google Maps API for human sightings and Socket.IO for real-time communication, as well as real-time updates of human sightings. JSON Web Tokens and bcrypt are implemented in the application for authentication/security.

## Dependencies

### Backend

- "bcrypt": "^5.0.0",
- "cors": "^2.8.5",
- "dotenv": "^8.2.0",
- "express": "^4.17.1",
- "express-validator": "^6.6.1",
- "http": "0.0.1-security",
- "jsonwebtoken": "^8.5.1",
- "mongoose": "^5.10.10",
- "socket.io": "^3.0.1"

### Frontend

- "axios": "^0.21.0",
- "sass": "^1.29.0",
- "socket.io-client": "^3.0.1",

## Running The Application

You will need to create a .env file in the backend directory, a .env.local file in the victor-yu-tech-test directory.
The contents will be provided to you upon request (in this case, will be e-mailed to Bruno)!

In the backend directory, begin by running:

### `npm i`

This installs the additional dependencies.

Next run:

### `npm start`

Starts the server.

In the victor-yu-tech-test directory, begin by running:

### `npm i`

This installs the additional dependencies.

Next run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
