const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TempUserSchema = Schema({
  id: Schema.Types.ObjectId,
  realname: {
    type: String,
    max: 50
  },
  sid: {
    type: String
  }
});

const model = mongoose.model('TempUser', TempUserSchema);

module.exports = model;