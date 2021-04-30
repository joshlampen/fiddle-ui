const { HTTP_CODES } = require("../config/config");

const allowCorsHandler = (req, res, next) => {
  const { HTTP_SUCCESS } = HTTP_CODES;

  // CORS headers
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");

  // Set custom headers for CORS
  res.header(
    "Access-Control-Allow-Headers",
    "Content-type,Accept,X-Access-Token,X-Key"
  );

  if (req.method === "OPTIONS") {
    res.status(HTTP_SUCCESS).end();
  } else {
    next();
  }
};

module.exports = { allowCorsHandler };
