FROM node:20

# Usuario sin privilegios
USER node

COPY . /app
WORKDIR /app

#Install the dependencies
RUN npm install --ignore scripts

ARG API_URI="http://localhost:8000"
ENV REACT_APP_API_ENDPOINT=$API_URI

#Create an optimized version of the webapp
RUN npm run build
RUN npm install serve --ignore scripts

#Execute npm run prod to run the server
CMD [ "npm", "run", "prod" ]
#CMD ["npm", "start"]