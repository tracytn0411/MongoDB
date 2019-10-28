var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  content: {
    type: String
  },
  article: {
    type: Schema.Types.ObjectId,
    ref: "Article"
  }
},

{versionKey: false});

var Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;