# Use an official Node.js runtime as a parent image
FROM node:alpine

# Set the working directory in the container
WORKDIR /usr/src/authservice

RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot

RUN chown -R nonroot:nonroot ./

# Copy package.json and package-lock.json to the working directory
USER root
COPY package*.json ./

# Install app dependencies
RUN npm install bcrypt
RUN npm install --ignore-scripts

# Copy the app source code to the working directory
COPY .dockerignore ./
COPY auth-model.js ./
COPY auth-service.js ./
COPY auth-service.test.js ./

USER nonroot

# Expose the port the app runs on
EXPOSE 8002

# Define the command to run your app
CMD ["node", "auth-service.js"]
