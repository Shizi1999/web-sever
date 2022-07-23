const express = require('express');
const productRouter = express.Router();

const ProductController = require('../app/controllers/ProductController');
productRouter.get('/types', ProductController.getType);
productRouter.post('/types/upload', ProductController.uploadType);
productRouter.post('/types/delete', ProductController.deleteType);

module.exports = productRouter;
