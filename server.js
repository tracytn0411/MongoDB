//Dependencies
require('dotenv').config()
var express = require('express');
var cors = require('cors');
var path = require('path');
var PORT = process.env.PORT || 5000
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
const mongoose = require('mongoose'); 
const Article = require('./models/article')

//Dev for scraping
var axios = require("axios");
var cheerio = require("cheerio");

// Initialize Express
var app = express();

//app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors())
app.use(methodOverride('_method'));

// Connect to MongoDB Atlas, database is web_scraper
var dbURI = process.env.MONGODB_ATLAS_CLUSTER0_URI;
mongoose.connect(dbURI, {
  useCreateIndex: true,
  useNewUrlParser: true, 
  useUnifiedTopology: true //to get rid of terminal deprecationwarning
});
var db = mongoose.connection;

// Checks if connection with the database is successful
db.on("error", function(error) {
  console.log("Database Error:", error);
});
db.once("open", function () {
  console.log("Mongoose connection successfully.");
});

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client/public/index.html'))
// })

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
  Article.find({}, function(error, doc) {
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

// Scrape data from one site and place it into the mongodb db
app.get("/scrape", function(req, res) {
  // Make a request via axios for the news section of `ycombinator`
  axios.get("https://www.smashingmagazine.com/articles/").then(function(response) {

    //console.log(response.data);
    
    // Load the html body from axios into cheerio
    // Load the Response into cheerio and save it to a variable
      // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    var $ = cheerio.load(response.data);

    // For each element with a "title" class
      // (i: iterator. element: the current element)
    $("article.article--post").each(function(i, element) {
      // Save the text and href of each link enclosed in the current element
      //console.log($(element).html());

      var results = {};
      
      results.title = $(element).children("h1").text();
      results.date = $(element).children('div').children('p').children('time').text();
      var articleLink = $(element).children("h1").children('a').attr("href");
      results.link = 'https://www.smashingmagazine.com' + articleLink;
      
      //remove time & a tag from `p` before fetch text from `p` again
      $(element).children('div').children('p').children('time').remove();
      $(element).children('div').children('p').children('a').remove();
      var articleSum = $(element).children('div').children('p').text();
      results.summary = articleSum;

      //console.log(summary)
      var entry = new Article(results) //new document

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
  res.send("Scrape Complete");
});

app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`));