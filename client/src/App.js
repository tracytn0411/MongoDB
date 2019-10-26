import React, { Component } from 'react';

var axios = require("axios");

/*
class App extends Component {
  render() {
    return (
        <h1>Hello Tracy!</h1>
    );
  }
}
export default App;
*/

class App extends Component {
  // state = {
  //   articles: []
  // }

  constructor(props) {
    super(props);
    this.state = {
      articles: []
    }
  }

  componentDidMount() {
    // Axios /GET requests go here, when we want data ASAP!
    axios.get(`/api/articles`)
      .then(res => {
        var articles = res.data.map(obj => ({title:obj.title}));
        console.log(articles)
        this.setState({ articles })
      })
      .catch(err => console.log(err))
  }

  // .then(res => {
  //   const posts = res.data.results.map(obj => ({title: obj.title, overview: obj.overview}));
  //   this.setState({ posts });
  // });
  
  render() {
    return (
      <ul>
        {this.state.articles.map(function(article, index){
          return (
            <li key={index}>{article.title}</li>
          )}
        )}
      </ul>
    )}
  }

export default App;

