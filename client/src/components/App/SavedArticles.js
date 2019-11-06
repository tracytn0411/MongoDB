import React, {Component} from 'react';
import {Card, Container, Row, Col} from 'react-bootstrap';
import SavedBtn from './SavedBtn';
import CollapseBtn from './CollapseBtn';
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

  handleClick() {
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
        <Row className='mx-4'>
          {/* Have to use arrow function or the map method won't bind */}
          {this.state.savedArticles.map(((article,index) => { 
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
                    {/* <Button variant='secondary' onClick={this.handleClick}>Save</Button> */}
                    {/* <Button value={article._id} onClick={this.handleClick}>Save Article       
                    </Button>          */}
                    <SavedBtn 
                    data_article = {article}
                    key={article._id}
                    value={article._id}
                    onClick={this.handleClick}
                    />
                    <CollapseBtn dataOne={article._id}/>
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