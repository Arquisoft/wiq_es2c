# Use an official Node.js runtime as a parent image
FROM node:alpine

# Set the working directory in the container
WORKDIR /usr/src/gamehistoryservice

RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot

RUN chown -R nonroot:nonroot ./

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install --ignore-scripts

# Copy the app source code to the working directory
COPY .dockerignore ./
COPY gamehistory-model.js ./
COPY gamehistory.js ./
COPY gamehistory.test.js ./

USER nonroot

# Expose the port the app runs on
EXPOSE 8004 

ARG API_ORIGIN_URI="http://localhost:3000"
ENV REACT_APP_API_ORIGIN_ENDPOINT=$API_ORIGIN_URI

# Define the command to run your app
CMD ["node", "gamehistory.js"]

