const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const slugUpdate = require('mongoose-slug-updater');
mongoose.plugin(slug);
mongoose.plugin(slugUpdate);
// auto create id
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

ProductTypeSchema = new mongoose.Schema({
  author: ObjectId,
  title: String,
  amount: Number,
  slug: { type: String, slug: 'title', unique: true },
});

module.exports = mongoose.model('ProductType', ProductTypeSchema);
