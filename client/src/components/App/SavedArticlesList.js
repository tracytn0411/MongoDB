import React, {Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import SavedArticle from './SavedArticle'
var axios = require ('axios');

class SavedArticleList extends Component {
  constructor(props){
    super(props);
    this.state = {
      savedArticles: []
    }
    this.handleUnsave=this.handleUnsave.bind(this)
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

  handleUnsave(updateArticles){
    this.setState({
      savedArticles: updateArticles
    })
  }

  render() { //render() is a method that returns HTML
    return (
      <Container fluid>
        <Row className='mx-4'>
          {/* Have to use arrow function or the map method won't bind */}
          {this.state.savedArticles.map((article,index) => { 
            return (
              <Col md={6} lg={4} key={index}>
                <SavedArticle onUnsave={this.handleUnsave} article={article} index={index} />
              </Col>
            )}
          )}
        </Row>
      </Container>
    )}

}
export default SavedArticleList;