const Property = require("../models/property");

const getRandomProperties = async (limit) => {
  return await Property.aggregate([
    { $sample: { size: limit } }
  ]);
};

module.exports = getRandomProperties;