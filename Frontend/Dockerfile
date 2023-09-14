# Use an official Node runtime as a parent image
FROM node:16.20.2

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install project dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Start the application --> host:port = 0.0.0.0:4200
CMD ["npm", "start"]