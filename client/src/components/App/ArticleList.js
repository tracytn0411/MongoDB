import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Article from "./Article";
var axios = require("axios");

class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
  }

  componentDidMount() {
    this.getArticles();
  }

  getArticles() {
    // Axios /GET requests go here, when we want data ASAP!
    axios
      .get(`/api/articles`)
      .then(res => {
        console.log(res.data);
        this.setState({
          articles: res.data
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    //render() is a method that returns HTML
    return (
      <Container fluid>
        <Row className="mx-4">
          {/* Have to use arrow function or the map method won't bind */}
          {this.state.articles.map((article, index) => {
            return (
              <Col md={6} lg={4} key={index}>
                <Article article={article} />
              </Col>
            );
          })}
        </Row>
      </Container>
    );
  }
}

export default ArticleList;
