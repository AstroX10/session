# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --only=production

# Copy the entire project into the working directory
COPY . .

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
