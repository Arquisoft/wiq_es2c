FROM node:alpine

WORKDIR /app

RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot

RUN chown -R nonroot:nonroot ./

COPY . /app

#Install the dependencies
RUN npm install --ignore-scripts

ARG API_URI="http://localhost:8000"
ENV REACT_APP_API_ENDPOINT=$API_URI

#Create an optimized version of the webapp
RUN npm run build
RUN npm install serve --ignore-scripts

USER nonroot

#Execute npm run prod to run the server
CMD [ "npm", "run", "prod" ]
#CMD ["npm", "start"]