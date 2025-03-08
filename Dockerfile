# Use an official Node.js image as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose ports for frontend (3000) and backend (5000)
EXPOSE 3000 5000

# Start the app (build and run server)
CMD ["npm", "start"]
