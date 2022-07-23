const accountRouter = require('./accountRouter');
const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
function route(app) {
  app.use('/api/user', userRouter);
  app.use('/api/product', productRouter);
  app.use('/api', accountRouter);
}

module.exports = route;
