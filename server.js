//Dependencies
require("dotenv").config();
var express = require("express");
var cors = require("cors");
var path = require("path");
var PORT = process.env.PORT || 5000;
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var colors = require("colors");

//MongoDB
const mongoose = require("mongoose");
const Article = require("./models/article");
const Comment = require("./models/comment");

//Dev for scraping
var axios = require("axios");
var cheerio = require("cheerio");

// Initialize Express
var app = express();

//Dev for socket.io
const server = require('http').createServer(app);
const io = require('socket.io')(server); //pass server to socket.io
//require('events').defaultMaxListeners = 500

// In Express, this lets you call newrelic from within a template.
//app.locals.newrelic = newrelic;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(methodOverride("_method"));

//This tell express server where the frontend code is
app.use(express.static(path.join(__dirname, "client/build")));

// Direct to homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// Connect to MongoDB Atlas, database is web_scraper
var dbURI = process.env.MONGODB_ATLAS_CLUSTER0_URI;
//var dbURI = "mongodb://localhost:27017/web_scraper";
mongoose.connect(dbURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true //to get rid of terminal deprecationwarning
});
var db = mongoose.connection;

// Checks if connection with the database is successful
db.on("error", function(error) {
  console.log(colors.red("Database Error:", error));
});
db.once("open", function() {
  console.log("Mongoose connection successfully.");
});


//==================SOCKET.IO=================//
//Trial test with socket.io
io.on("connection", (socket) => {
  console.log("a user connected")
  socket.on('article saved',(article) => {
    const title = article.title
    const notification = `Article ${title} has been saved!`
    console.log (notification)
    io.sockets.emit('article saved', (title))
  })
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
})

//=========================ARTICLES=================//
// Retrieve data from the db
app.get("/api/articles", function(req, res) {
  // Find all results from the scrapedData collection in the db
  //sort in descending order of date
  Article.find({})
    .sort({ articleDate: -1 })
    .exec(function(error, doc) {
      // Throw any errors to the console
      if (error) {
        console.log(error);
      }
      // If there are no errors, send the data to the browser as json
      else {
        res.json(doc);
      }
    });
});

// Route to display data on Saved Articles page
app.get("/api/savedArticles", function(req, res) {
  Article.find({ isSaved: true }).exec(function(error, articles) {
    if (error) {
      console.log(error);
    } else {
      //console.log(articles)
      res.json(articles);
    }
  });
});

// Route to update data when user hits 'save article' btn
app.post("/api/savedArticles", function(req, res) {
  Article.findOneAndUpdate(
    { _id: req.body.article_id },
    { isSaved: true, btnStyle: "success", btnText: "Saved!" },
    function(error, articles) {
      if (error) {
        console.log(error);
      } else {
        Article.findById(req.body.article_id, function(error, doc) {
          if (error) {
            console.log("savedARticles error is: ".magenta + error.red);
          } else {
            console.log(colors.cyan("Saved this article" + doc));
            res.json(doc);
          }
        });
      }
    }
  );
});

// Route to update data when user hits 'saved!' (to unsave)
app.post("/api/unsavedArticles", function(req, res) {
  Article.findOneAndUpdate(
    { _id: req.body.article_id },
    { isSaved: false, btnStyle: "secondary", btnText: "Save Article" },
    function(error, doc) {
      if (error) {
        console.log(error);
      } else {
        Article.find({ isSaved: true }, (err, savedArticles) => {
          if (err) {
            console.log(err);
          } else {
            Article.findById(req.body.article_id, (err2, unsavedArticle) => {
              if (err2) console.log(err2);
              else {
                console.log(
                  colors.yellow("Unsave this article" + unsavedArticle)
                );
                res.json({
                  doc: doc,
                  unsavedArticle: unsavedArticle,
                  savedArticles: savedArticles
                });
              }
            });
          }
        });
      }
    }
  );
});

//==============COMMENTS================//
app.get("/api/getComments/:id", (req, res) => {
  Comment.find({ article: req.params.id }).exec(function(error, comments) {
    if (error) {
      console.log(`get comments error: ${error}`.red);
    } else {
      //console.log(colors.green('getComments:' + comments))
      Comment.countDocuments({ article: req.params.id }, (err, count) => {
        if (err) console.log(colors.red(`count comments error: ${err}`));
        else {
          //console.log(`Number of comments: ${count}`.green);
          res.json({
            comments: comments,
            count: count
          });
        }
      });
    }
  });
});

app.post("/api/addComment", function(req, res) {
  var newComment = {};
  newComment.sender = req.body.comment_author;
  newComment.content = req.body.comment_text;
  newComment.article = req.body.article_id;

  var comment = new Comment(newComment);
  console.log(colors.cyan("New comment added: " + comment));
  comment.save(function(error, comment) {
    if (error) {
      console.log(error);
    } else {
      Comment.countDocuments({ article: req.body.article_id }, (err, count) => {
        if (err) console.log(colors.red(`count comments error: ${err}`));
        else {
          //console.log(`Number of comments: ${count}`.green);
          res.json({
            comment: comment,
            count: count
          });
        }
      });
    }
  });
});

app.delete("/api/delComment/:id", (req, res) => {
  Comment.findByIdAndRemove({ _id: req.params.id }).exec((err, comment) => {
    if (err) console.log(colors.red(`Delete comment error: ${err}`));
    else {
      console.log(colors.magenta(`Deleted comment: ${comment}`));
      var articleID = comment.article;
      Comment.countDocuments({ article: articleID }, (err, count) => {
        if (err) console.log(colors.red(`count comments error: ${err}`));
        else {
          //console.log(`Number of comments: ${count}`.green);
          res.json(count);
        }
      });
    }
  });
});

//==============SCRAPE===================//
// Scrape data from one site and place it into the mongodb db
app.get("/api/scrape", function(req, res) {
  // Make a request via axios for the news section
  axios
    .get("https://www.smashingmagazine.com/articles/")
    .then(function(response) {
      // Load the Response into cheerio and save it to a variable
      // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
      var $ = cheerio.load(response.data);

      // For each 'article' element with class 'article-post'
      // (i: iterator, element: the current element)
      $("article.article--post").each(function(i, element) {
        // Save the text and href of each link enclosed in the current element
        //console.log($(element).html());

        var results = {};
        results._id = new mongoose.Types.ObjectId();
        results.title = $(element)
          .children("h1")
          .text();
        results.date = $(element)
          .children("div")
          .children("p")
          .children("time")
          .text();
        results.articleDate = $(element)
          .children("div")
          .children("p")
          .children("time")
          .attr("datetime");

        var articleLink = $(element)
          .children("h1")
          .children("a")
          .attr("href");
        results.link = "https://www.smashingmagazine.com" + articleLink;

        //remove time & a tag from `p` before fetch text from `p` again
        $(element)
          .children("div")
          .children("p")
          .children("time")
          .remove();
        $(element)
          .children("div")
          .children("p")
          .children("a")
          .remove();
        var articleSum = $(element)
          .children("div")
          .children("p")
          .text();
        results.summary = articleSum;
        //console.log(summary)

        var entry = new Article(results); //new document for each scraped article

        entry.save(function(err, doc) {
          if (err) {
            console.log(err);
          } else {
            console.log(doc);
          }
        });
      });
    });

  // Send a message to the browser
  //res.send("Scrape Complete");
  //Reload homepage
  res.redirect("/");
});

server.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`)); //socket.io
//app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`));
