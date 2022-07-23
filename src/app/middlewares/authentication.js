const authentication = (req, res, next) => {
  const token = req.headers.authorization;
  const email = jwt.verify(token, process.env.SECRET_KEY);
  User.findOne({ email: email }).then((user) => {
    if (user) {
      next();
    } else {
      res.json({
        code: 0,
      });
    }
  });
};
