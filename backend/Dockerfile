# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Set the environment variable for the port to listen on
ENV PORT=8080

# Expose the port that the container will listen on
EXPOSE $PORT

# Start the application
CMD ["node", "index.js"]
