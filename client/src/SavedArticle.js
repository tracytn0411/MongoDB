import React, {Component} from 'react';
import {Card, Container, Row, Col, Button} from 'react-bootstrap';
var axios = require ('axios');

class SavedArticle extends Component {
  constructor(props){
    super(props);
    this.state = {
      savedArticles: []
    }
  }

  componentDidMount() {
    this.getSavedArticles();
  }

  getSavedArticles(){
    axios.get(`/api/savedArticles`)
      .then (res => {
        console.log(res.data)
        this.setState({
          savedArticles: res.data
        })
      })
      .catch(err => console.log(err))
  }

  render() { //render() is a method that returns HTML
    return (
      <Container fluid>
        <Row>
          {/* Have to use arrow function or the map method won't bind */}
          {this.state.savedArticles.map(((article,index) => { 
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
                    {/* <Button variant='secondary' onClick={this.handleClick}>Save</Button> */}
                    {/* <Button value={article._id} onClick={this.handleClick}>Save Article       
                    </Button>          */}
                  </Card.Footer>
                </Card>
              </Col>
            )}
          ))}
        </Row>
      </Container>
    )}

}
export default SavedArticle;