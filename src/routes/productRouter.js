const express = require('express');
const productRouter = express.Router();
const uploadProductImage = require('../app/middlewares/uploadProductImage');

const ProductController = require('../app/controllers/ProductController');
productRouter.get('/types', ProductController.getType);
productRouter.post('/types/upload', ProductController.uploadType);
productRouter.post('/types/delete', ProductController.deleteType);
productRouter.post(
  '/newproduct',
  uploadProductImage.single('file'),
  ProductController.newProduct
);

productRouter.post(
  '/editproduct',
  uploadProductImage.single('file'),
  ProductController.editProduct
);

productRouter.get('/getproduct', ProductController.getProduct);

module.exports = productRouter;
