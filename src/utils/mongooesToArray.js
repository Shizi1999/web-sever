const mongooseToArray = (items) => {
  return items.map((item) => item.toObject());
};

module.exports = mongooseToArray;
