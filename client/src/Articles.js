import React, {Component} from 'react';
import {Card, Container, Row, Col, Button} from 'react-bootstrap';
var axios = require ('axios');


class Articles extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    }
  }

  componentDidMount() {
    // Axios /GET requests go here, when we want data ASAP!
    axios.get(`/api/articles`)
      .then(res => {
        // var articles = res.data.map(obj => ({
        //   title: obj.title,
        //   link: obj.link,
        //   summary: obj.summary,
        //   date: obj.date
        // }));
        console.log(res.data)
        //console.log(articles)
        this.setState({
          articles: res.data
        })
      })
      .catch(err => console.log(err))
  }

  render() { //render() is a method that returns HTML
    return (
      <Container fluid>
        <Row>
          {this.state.articles.map(function(article, index){
            return (
              <Col md={6} lg={4} key={index}>
                <Card>
                  <Card.Body>
                    <Card.Title >{article.title}</Card.Title>
                    <Card.Text>
                      <span>{article.date}</span>
                      {article.summary}
                    </Card.Text>
                    <Card.Link href={article.link} target='_blank'>Read more...</Card.Link>
                  </Card.Body>
                  <Card.Footer className='text-right'>
                    <Button variant='info'>Comment</Button>
                    <Button variant='secondary'>Save</Button>
                  </Card.Footer>
                </Card>
              </Col>
            )}
          )}
        </Row>
      </Container>
    )}


}

export default Articles;


