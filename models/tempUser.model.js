var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TempUserSchema = Schema({
  id: Schema.Types.ObjectId,
  realname: {
    type: String,
    max: 50
  },
  sid: {
    type: String
  }
});

var model = mongoose.model('TempUser', TempUserSchema);

module.exports = model;