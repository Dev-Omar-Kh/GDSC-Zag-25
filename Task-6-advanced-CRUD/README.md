# Project Setup Guide

## How to Run the Project

1. Open the terminal and run the following command to start the development server:
   ```sh
   npm run dev
   ```

2. To start the JSON server, navigate to the data directory and run:
   ```sh
   cd src/assets/Data
   json-server --watch db.json --port 8000
   ```

3. Create a `.env` file in the root directory and add the following line:
   ```sh
   VITE_API_URL=http://localhost:8000
   ```

Now the project should be up and running!

