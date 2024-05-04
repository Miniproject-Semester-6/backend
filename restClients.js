const axios = require("axios");

const MODELS_BASE_URL = "https://models-ct5j.onrender.com";

const modelsClient = axios.create({
  baseURL: MODELS_BASE_URL,
});

module.exports = { modelsClient };
