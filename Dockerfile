# Use an official lightweight Node.js image.
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /usr/src/App

# Copy package.json and package-lock.json
COPY package*.json ./

# Install production dependencies.
RUN npm install --only=production

# Copy the local code to the container's work directory
COPY . . 

# Build the application for production
RUN npm run build

# Install a simple http server to serve static content
RUN npm install -g serve

# Serve the app on port 8080
CMD ["serve", "-s", "build", "-l", "8080"]

# Open port 8080 to accept connections
EXPOSE 8080
