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

  btnStyle: {
    type: String,
    default: 'secondary'
  },

  btnText: {
    type: String,
    default: 'Save Article'
  },

  date: {
    type: String,
    required: true,
    unique: true
    },
  
  articleDate: {
    type: Date,
    unique: false
  },

  timestamp: {
    type: Date,
    default: Date.now
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