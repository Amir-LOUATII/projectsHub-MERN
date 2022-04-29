const notFoundMiddleware = (req, res) => {
  res.send("route does not exist");
};

module.exports = notFoundMiddleware;
