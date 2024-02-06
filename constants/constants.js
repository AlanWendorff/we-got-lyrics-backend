const HEADERS_DEFAULT = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

const API_CONFIG = {
  API_URL: process.env.API_URL,
};

module.exports = { API_CONFIG, HEADERS_DEFAULT };
