# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/gamehistoryservice

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./


# Install app dependencies
RUN npm install

# Copy the app source code to the working directory
COPY .dockerignore ./
COPY gamehistory-model.js ./
COPY gamehistory.js ./
COPY gamehistory.test.js ./
COPY package-lock.json ./
COPY package.json ./

# Expose the port the app runs on
EXPOSE 8004 

ARG API_ORIGIN_URI="http://localhost:3000"
ENV REACT_APP_API_ORIGIN_ENDPOINT=$API_ORIGIN_URI

# Define the command to run your app
CMD ["node", "gamehistory.js"]

