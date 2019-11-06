import React, {Component} from 'react';
import {Card, Container, Row, Col} from 'react-bootstrap';
import SavedBtn from './SavedBtn';
import CollapseBtn from './CollapseBtn';
var axios = require ('axios');

class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Save Article',
      articles: [],
    };
    // This binding is necessary to make `this` work in the callback
   // this.handleClick = this.handleClick.bind(this);
  }

  handleDelete = itemId => {
    const articles = this.state.articles.filter(article => article.id !== itemId);
    this.setState({ articles: articles });
  };

  componentDidMount() {
    this.getArticles();
  }

  getArticles(){
    // Axios /GET requests go here, when we want data ASAP!
    axios.get(`/api/articles`)
      .then(res => {
        console.log(res.data)
        this.setState({
          articles: res.data
        })
      })
      .catch(err => console.log(err))
  }

  render() { //render() is a method that returns HTML
    return (
      <Container fluid>
        <Row className='mx-4'>
          {/* Have to use arrow function or the map method won't bind */}
          {this.state.articles.map(((article,index) => { 
            return (
              <Col md={6} lg={4} key={index}>
                <Card className='mb-2'>
                  <Card.Body>
                    <Card.Title >{article.title}</Card.Title>
                    <Card.Text>
                      <span>{article.date}</span>
                      {article.summary}
                    </Card.Text>
                    <Card.Link href={article.link} target='_blank'>Read more...</Card.Link>
                  </Card.Body>
                  <Card.Footer className='text-right'>
                    {/* <Button variant='info'>Comment</Button> */}
                    <SavedBtn 
                    data_article = {article}
                    key={article._id}
                    value={article._id}
                    //onClick={this.handleClick}
                      //onDelete={this.handleDelete} 
                    id = {article._id}
                    />
                    <CollapseBtn dataOne={article._id} />
                  </Card.Footer>
                </Card>
              </Col>
            )}
          ))}
        </Row>
      </Container>
    )}

}

export default Articles;


