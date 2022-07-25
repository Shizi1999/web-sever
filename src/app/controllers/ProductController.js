const ProductType = require('../models/ProductType');
const Product = require('../models/Product');
const mongooseToArray = require('../../utils/mongooesToArray');
const cloudinaryDeleteImage = require('../../utils/deleteImage');

class ProductController {
  // [GET]/types
  getType(req, res, next) {
    ProductType.find({}).then((types) => {
      types = mongooseToArray(types);
      res.json(types);
    });
  }

  // [POST]/types/upload
  uploadType(req, res, next) {
    const { name } = req.body;
    ProductType.findOne({ name: name }).then((productType) => {
      if (productType) {
        res.json({
          code: 0,
          message: 'Đã tồn tại loại sản phẩm',
        });
      } else {
        const proType = new ProductType({
          name: name,
          amount: 0,
        });
        proType.save().then(() => {
          res.json({
            code: 1,
            message: 'Successfully',
          });
        });
      }
    });
  }

  // [POST]/types/delete
  deleteType(req, res, next) {
    const { slug } = req.body;
    ProductType.findOneAndDelete({ slug: slug }).then(() => {
      res.json({
        code: 1,
        message: 'Successfull',
      });
    });
  }
  // [POST]/newproduct
  newProduct(req, res, next) {
    const { name, productType, desMarkdown, desHtml } = req.body;
    Product.findOne({ name: name }).then((pro) => {
      if (pro) {
        res.json({
          code: 0,
          message: 'Sản phẩm đã tồn tại',
        });
      } else {
        const types = JSON.parse(req.body.types).map((type, index) => ({
          index,
          ...type,
        }));
        let image = '';
        let imageName = '';
        if (req.file) {
          image = req.file.path;
          imageName = req.file.filename;
        }
        const product = new Product({
          name,
          productType,
          image,
          imageName,
          types,
          desMarkdown,
          desHtml,
          selled: 0,
          isSaling: false,
        });
        product.save().then(() => {
          ProductType.findOneAndUpdate(
            { slug: productType },
            { $inc: { amount: 1 } },
            { new: true }
          );
        });
        res.json({
          code: 1,
          message: 'Successfully',
        });
      }
    });
  }

  editProduct(req, res, next) {
    const { name, productType, desMarkdown, desHtml } = req.body;
    Product.findOne({ name: name }).then((pro) => {
      if (!pro) {
        res.json({
          code: 0,
          message: 'Sản phẩm không tồn tại',
        });
      } else {
        pro = pro.toObject();
        const types = JSON.parse(req.body.types).map((type, index) => ({
          index,
          ...type,
        }));
        if (req.file) {
          if (pro.image !== '') cloudinaryDeleteImage(pro.imageName);
          pro.image = req.file.path;
          pro.imageName = req.file.filename;
        }

        Product.findOneAndUpdate(
          { name: name },
          { $set: { ...pro, productType, desMarkdown, desHtml, types } }
        ).then(() => {
          res.json({
            code: 1,
            message: 'Cập nhật thành công',
          });
        });
      }
    });
  }
  getProduct(req, res, next) {
    const slug = req.query.slug;
    Product.findOne({ slug: slug }).then((pro) => {
      if (pro) {
        res.json({
          code: 1,
          product: pro.toObject(),
        });
      } else {
        res.json({
          code: 0,
        });
      }
    });
  }
}

module.exports = new ProductController();
