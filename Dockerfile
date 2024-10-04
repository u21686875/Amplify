# Use a more recent Node.js version as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on (adjust if your app uses a different port)
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]