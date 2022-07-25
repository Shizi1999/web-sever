const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const slugUpdate = require('mongoose-slug-updater');
mongoose.plugin(slug);
mongoose.plugin(slugUpdate);
// auto create id
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

ProductSchema = new mongoose.Schema(
  {
    author: ObjectId,
    name: String,
    productType: String,
    image: String,
    imageName: String,
    types: [
      new mongoose.Schema({
        index: Number,
        type: String,
        price: Number,
        amount: Number,
      }),
    ],
    desMarkdown: String,
    desHtml: String,
    selled: Number,
    isSaling: Boolean,
    slug: { type: String, slug: 'name', unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
