var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({

  title: {
    type: String,
    required: true,
    unique: true
  },

  link: {
    type: String,
    required: true,
    unique: true,
  },

  summary: {
    type: String,
    required: true,
    unique: true,
  },
  
  comments: {
    type: Schema.Types.ObjectId,
    ref: "comment"
  },

  isSaved: {
    type: Boolean,
    default: false
  },

  date: {
    type: String,
    required: true,
    unique: true
    }
},

{versionKey: false});

// new collection
var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;

/*
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
  {
    id: Number,
    message: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Data", DataSchema);
*/