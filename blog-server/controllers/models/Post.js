let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//определение схемы книги
let PostSchema = new Schema(
  {
    author: { type: String, required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  {
    versionKey: false
  }
);

PostSchema.pre('save', next => {
  now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model('post', PostSchema);
