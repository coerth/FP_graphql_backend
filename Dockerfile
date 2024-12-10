# Use the official Node.js image from Docker Hub
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# # Build the application
# RUN npm run build

# Expose the port the app runs on
EXPOSE 4000

# Start the application
CMD ["npm", "run", "dev"]