const mongoose = require('mongoose');

const { Schema } = mongoose;

const ImageSchema = new Schema({
  name: { type: String },
  meta: { type: String },
}, {
  timestamps: true,
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;
