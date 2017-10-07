var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = Schema({
  id: Schema.Types.ObjectId,
  username: {
    type: String,
    max: 100
  },
  password: {
    type: String,
    max: 100
  },
  realname: {
    type: String,
    max: 50
  },
  role: {
    type: Array
  },
  email: String,
  avatar: String,
  sid: String,
  class_id: {
    type: Schema.Types.ObjectId,
    ref: 'Class'
  },
  group_id: {
    type: Schema.Types.ObjectId,
    ref: 'Group'
  }
});

var model = mongoose.model('User', UserSchema);

module.exports = model;