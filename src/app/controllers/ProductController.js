const ProductType = require('../models/ProductType');
const mongooseToArray = require('../../utils/mongooesToArray');
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
    const { type } = req.body;
    console.log(req.body);
    ProductType.findOne({ title: type }).then((productType) => {
      if (productType) {
        res.json({
          code: 0,
          message: 'Đã tồn tại loại sản phẩm',
        });
      } else {
        const proType = new ProductType({
          title: type,
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
}

module.exports = new ProductController();
