const logger = require("./logger");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("-----------------------");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error)
  logger.error(error.name)
  logger.error(error.message)
  
  // 查詢找不到單 id
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  // 新增單人 不符合規定
  if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  }

  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token',
    })
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer '))
    request.token = authorization.substring(7)

  next()
}


module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
};
