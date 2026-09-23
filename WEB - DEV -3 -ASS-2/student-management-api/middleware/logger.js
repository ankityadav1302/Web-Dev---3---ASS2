function logger(req, res, next) {
  const time = new Date().toISOString();

  // res.on('finish') fires after the response has actually been sent
  res.on("finish", () => {
    console.log(`[${time}] ${req.method} ${req.originalUrl} - ${res.statusCode}`);
  });

  next();
}

module.exports = logger;