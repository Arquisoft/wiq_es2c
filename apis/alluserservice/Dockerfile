# Use an official Node.js runtime as a parent image
FROM node:20

# Usuario sin privilegios
USER node

# Set the working directory in the container
WORKDIR /usr/src/apis/alluserservice

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install --ignore scripts

# Copy the app source code to the working directory
COPY .dockerignore ./
COPY allusers-api.js ./
COPY allusers-api.test.js ./
COPY package-lock.json ./
COPY package.json ./
COPY user-model.js ./

# Expose the port the app runs on
EXPOSE 8006

ARG API_ORIGIN_URI="http://localhost:3000"
ENV REACT_APP_API_ORIGIN_ENDPOINT=$API_ORIGIN_URI

# Define the command to run your app
CMD ["node", "allusers-api.js"]
