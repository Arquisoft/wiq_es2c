const express = require('express');
const axios = require('axios');
const cors = require('cors');
const promBundle = require('express-prom-bundle');
//libraries required for OpenAPI-Swagger
const swaggerUi = require('swagger-ui-express'); 
const fs = require("fs")
const YAML = require('yaml')

const app = express();
const port = 8000;

const gamehistoryUrl = process.env.GAMEHISTORY_SERVICE_URL || 'http://localhost:8004';
const generatorUrl = process.env.GENERATOR_SERVICE_URL || 'http://localhost:8003';
const authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://localhost:8002';
const userServiceUrl = process.env.USER_SERVICE_URL || 'http://localhost:8001';
const perfilServiceUrl = process.env.PERFIL_SERVICE_URL || 'http://localhost:8005';
const allUsersServiceUrl = process.env.ALLUSERS_SERVICE_URL || 'http://localhost:8006';
const allQuestionsServiceUrl = process.env.ALLQUESTIONS_SERVICE_URL || 'http://localhost:8007';



app.use(cors());
app.use(express.json());

//Prometheus configuration
const metricsMiddleware = promBundle({includeMethod: true});
app.use(metricsMiddleware);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'OK' });
});

app.post('/login', async (req, res) => {
  try {
    // Forward the login request to the authentication service
    const authResponse = await axios.post(authServiceUrl+'/login', req.body);
    res.json(authResponse.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.post('/adduser', async (req, res) => {
  try {
    // Forward the add user request to the user service
    const userResponse = await axios.post(userServiceUrl+'/adduser', req.body);
    res.json(userResponse.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.get(`/generateQuestion`, async (req, res) => {
  try {
    // Forward the add user request to the user service
    const URL = generatorUrl + '/generateQuestion?user=' + req.query.user + "&thematic=" + req.query.thematic + "&language=" + req.query.language ;
    const response = await axios.get(URL);
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.get(`/updateQuestion`, async (req, res) => {
  try {
    // Forward the add user request to the user service
    const response = await axios.get(generatorUrl+'/updateQuestion?time=' + req.query.time + "&correct=" +  req.query.correct,  req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.post('/saveGameHistory', async (req, res) => {
  try {
    const response = await axios.post(gamehistoryUrl+'/saveGameHistory', req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.post('/configureGame', async (req, res) => {
  try {
    const response = await axios.post(generatorUrl+'/configureGame', req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.get('/gamehistory', async (req, res) => {
  try {
    const URL = gamehistoryUrl + '/gamehistory?username=' + req.query.username;
    const response = await axios.get(URL);
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.get('/getUser', async (req, res) => {
  try {
      const URL = perfilServiceUrl + '/getUser?username=' + req.query.username;
      const perfilResponse = await axios.get(URL);
      console.log(perfilResponse);
      res.json(perfilResponse.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.get('/getAllUsers', async (req, res) => {
  try {
      const URL = allUsersServiceUrl + '/getAllUsers';
      const allUsersResponse = await axios.get(URL, req.body);
      res.json(allUsersResponse.data);
  } catch (error) {
      res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.get('/getAllQuestions', async (req, res) => {
  try {
      const URL = allQuestionsServiceUrl + '/getAllQuestions';
      const allQuestionsResponse = await axios.get(URL, req.body);
      res.json(allQuestionsResponse.data);
  } catch (error) {
      res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.get('/topUsers', async (req, res) => {
  try {
    const response = await axios.get(gamehistoryUrl+'/topUsers', req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.get('/ranking', async (req, res) => {
  try {
    const response = await axios.get(gamehistoryUrl+'/ranking?sortBy=' + req.query.sortBy + "&userLimit=" +  req.query.userLimit, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.get('/endgamestats', async (req, res) => {
  try {
    const URL = gamehistoryUrl + '/endgamestats?username=' + req.query.username;
    const response = await axios.get(URL);
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.get('/restartGame', async (req, res) => {
  try {
    const URL = generatorUrl + '/restartGame';
    const response = await axios.get(URL);
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });

  }
});


// Read the OpenAPI YAML file synchronously
// Hubo que cambiar el path porque los test e2e ahora sólo se ejecutan desde webapp
openapiPath='../gatewayservice/openapi.yaml'
if (fs.existsSync(openapiPath)) {
  const file = fs.readFileSync(openapiPath, 'utf8');

  // Parse the YAML content into a JavaScript object representing the Swagger document
  const swaggerDocument = YAML.parse(file);

  // Serve the Swagger UI documentation at the '/api-doc' endpoint
  // This middleware serves the Swagger UI files and sets up the Swagger UI page
  // It takes the parsed Swagger document as input
  app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} else {
  console.log("Not configuring OpenAPI. Configuration file not present.")
}

// Start the gateway service
const server = app.listen(port, () => {
  console.log(`Gateway Service listening at http://localhost:${port}`);
});

module.exports = server