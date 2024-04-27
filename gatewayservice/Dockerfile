# Use an official Node.js runtime as a parent image
FROM node:alpine

# Set the working directory in the container
WORKDIR /usr/src/gatewayservice

RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot

RUN chown -R nonroot:nonroot ./

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install --ignore-scripts

# Copy the app source code to the working directory
COPY .dockerignore ./
COPY gateway-service.js ./
COPY gateway-service.test.js ./
COPY openapi.yaml ./

USER nonroot

ARG API_ORIGIN_URI="http://localhost:3000"
ENV REACT_APP_API_ORIGIN_ENDPOINT=$API_ORIGIN_URI

# Define the command to run your app
CMD ["node", "gateway-service.js"]
