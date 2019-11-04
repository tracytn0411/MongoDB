var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  sender:{
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  article: {
    type: Schema.Types.ObjectId,
    ref: "Article"
  },  
  timestamp: {
    type: Date,
    default: Date.now
  }
},

{versionKey: false});

var Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;