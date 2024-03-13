FROM node:20

COPY . /app
WORKDIR /app

#Install the dependencies
RUN npm install

ARG API_URI="http://localhost:8000"
ENV REACT_APP_API_ENDPOINT=$API_URI
ARG API_GENERATOR_URI="http://localhost:8003"
ENV REACT_APP_API_GENERATOR_ENDPOINT=$API_GENERATOR_URI

#Create an optimized version of the webapp
RUN npm run build
RUN npm install serve

#Execute npm run prod to run the server
CMD [ "npm", "run", "prod" ]
#CMD ["npm", "start"]