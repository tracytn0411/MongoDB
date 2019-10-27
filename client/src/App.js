import React, { Component } from 'react';
import {Card, Container, Row, Col} from 'react-bootstrap';


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
        var articles = res.data.map(obj => ({
          title: obj.title,
          link: obj.link,
          summary: obj.summary,
          date: obj.date
        }));
        console.log(articles)
        this.setState({
          articles
        })
      })
      .catch(err => console.log(err))
  }

  // .then(res => {
  //   const posts = res.data.results.map(obj => ({title: obj.title, overview: obj.overview}));
  //   this.setState({ posts });
  // });
  
  render() {
    return (
      <Container fluid>
        <Row>
          {this.state.articles.map(function(article, index){
            return (
              <Col md={6} lg={4}>
                <Card>
                  <Card.Body>
                    <Card.Title key={index}>{article.title}</Card.Title>
                    <Card.Text>
                      <span>
                        {article.date}
                      </span>
                      {article.summary}
                    </Card.Text>
                  
                    <Card.Link href={article.link} target='_blank'>Read more...</Card.Link>

                  </Card.Body>
                </Card>
              </Col>
            )}
          )}
        </Row>
      </Container>
    )}
  }

export default App;



