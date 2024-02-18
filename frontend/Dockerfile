# # Use the official Node.js image with Alpine Linux
# FROM node:alpine
# # Set the working directory inside the container
# WORKDIR /usr/src/app
# # Copy package.json and package-lock.json to the working directory
# COPY package*.json ./
# Run npm install next
# # Install dependencies
# RUN npm install
# # Copy the rest of the application code
# COPY . .
# # Expose the port on which your application will run
# EXPOSE 3000
# # Run the application
# CMD ["npm", "run", "dev"]

# Use the official Node.js 18 image as a base
FROM node:18-alpine

# Set the working directory in the Docker container
WORKDIR /app

# Add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Copy package.json and yarn.lock to install dependencies
COPY package.json yarn.lock* ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Build the Next.js application
RUN yarn build

# Inform Docker that the container is listening on port 3000 at runtime.
EXPOSE 3000

# Define the command to run your app using CMD which defines your runtime. Here we will use the Next.js start script.
CMD ["yarn", "start"]

