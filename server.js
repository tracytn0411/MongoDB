//Dependencies
require('dotenv').config()
var newrelic = require('newrelic');
var express = require('express');
//var cors = require('cors');
var path = require('path');
var PORT = process.env.PORT || 5000
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var colors = require('colors')
const mongoose = require('mongoose'); 
const Article = require('./models/article')

//Dev for scraping
var axios = require("axios");
var cheerio = require("cheerio");

// Initialize Express
var app = express();
// In Express, this lets you call newrelic from within a template.
app.locals.newrelic = newrelic;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//app.use(cors())
app.use(methodOverride('_method'));

//This tell express server where the frontend code is
app.use(express.static(path.join(__dirname, 'client/build')));

// Express only serves static assets in production
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
//}
// Direct to homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})
// The "catchall" handler: for any request that doesn't match any
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/client/build/index.html'));
//   });

// Connect to MongoDB Atlas, database is web_scraper
var dbURI = process.env.MONGODB_ATLAS_CLUSTER0_URI;
//var dbURI = 'mongodb://localhost:27017/web_scraper'
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
db.once("open", function () {
  console.log("Mongoose connection successfully.");
});


// app.get("/", function(req, res) {
//   res.send("Hello world");
// });

// app.use(express.static(path.join(__dirname, 'build')));
// app.get('/*', function(req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// Retrieve data from the db
app.get("/api/articles", function(req, res) {
  // Find all results from the scrapedData collection in the db
    //sort in descending order of date
  Article.find({}).sort({articleDate:-1}).exec(function(error, doc) {
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
  Article.find({"isSaved": true},(function(error, articles) {
    if (error) {
      console.log(error)
    } else {
      //console.log(articles)
      res.json(articles)
    }
  }))
});

// Route to update data when user hits 'save article' btn
app.post('/api/savedArticles', function(req, res) {
  Article.findOneAndUpdate({'_id': req.body.article_id},{'isSaved': true, 'btnStyle':'primary', 'btnText':'Saved!'}, (function(error, articles) {
    if (error) {
      console.log(error)
    } else {
      Article.findById(req.body.article_id, function(error, doc){
        if (error) throw error
        else {
          console.log(colors.cyan('Saved this article' + doc))
          res.json(doc)
        }
      })
    }
  }))
})

// Route to update data when user hits 'saved!' (to unsave)
app.post('/api/unsavedArticles', function(req, res) {
  Article.findOneAndUpdate({'_id': req.body.article_id},{'isSaved': false, 'btnStyle': 'secondary', 'btnText': 'Save Article'}, function(error,articles){
    if (error) {
      console.log(error)
    } else {
      Article.findById(req.body.article_id, function(error, doc){
        if (error) throw error

        else {
          console.log(colors.yellow('Unsave this article' + doc))
          res.json(doc)
        }
      })
    }
  })
})

// Scrape data from one site and place it into the mongodb db
app.get("/api/scrape", function(req, res) {
  // Make a request via axios for the news section
  axios.get("https://www.smashingmagazine.com/articles/").then(function(response) {

    //console.log(response.data);
    
    // Load the Response into cheerio and save it to a variable
      // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    var $ = cheerio.load(response.data);

    // For each 'article' element with class 'article-post'
      // (i: iterator. element: the current element)
    $("article.article--post").each(function(i, element) {
      // Save the text and href of each link enclosed in the current element
      //console.log($(element).html());

      var results = {};
      results.title = $(element).children("h1").text();
      results.date = $(element).children('div').children('p').children('time').text();
      results.articleDate = $(element).children('div').children('p').children('time').attr('datetime');

      var articleLink = $(element).children("h1").children('a').attr("href");
      results.link = 'https://www.smashingmagazine.com' + articleLink;
      
      //remove time & a tag from `p` before fetch text from `p` again
      $(element).children('div').children('p').children('time').remove();
      $(element).children('div').children('p').children('a').remove();
      var articleSum = $(element).children('div').children('p').text();
      results.summary = articleSum;
      //console.log(summary)

      var entry = new Article(results) //new document for each scraped article

      entry.save(function(err, doc){
        if(err) {
          console.log(err);
        } else {
          console.log(doc)
        }
      })
    });
  });

  // Send a message to the browser
  //res.send("Scrape Complete");
  //Reload homepage
  res.redirect('/')
});

app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`));