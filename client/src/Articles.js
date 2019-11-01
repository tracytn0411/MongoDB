import React, {Component} from 'react';
import {Card, Container, Row, Col, Button} from 'react-bootstrap';
import SavedBtn from './SavedBtn';
var axios = require ('axios');


class Articles extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      text: 'Save Article',
      //isSaved: false,
      //clickedBtn: [],
      articles: [],
      //backgroundColors: {}
    };
    // This binding is necessary to make `this` work in the callback
   // this.handleClick = this.handleClick.bind(this);
  }

  handleDelete = itemId => {
    const articles = this.state.articles.filter(article => article.id !== itemId);
    this.setState({ articles: articles });
  };

  // handleClick = (e) => {
  //   this.setState({ getArticles});
  // }
  // handleClick = (e) => {
  //   e.preventDefault();
  //   var articleID = (e.target.value) //get value of the saved button
  //   console.log(articleID)

  //   if(!this.state.isSaved) {
  //     this.setState((state, props) => {
  //       return {
  //         text: 'Saved!',
  //         isSaved: true
  //       }
  //     })
  //     axios.post(`/api/savedArticles`,{
  //       article_id: articleID
  //     })
  //     .then(res => {
  //       console.log('saved!')
  //     })
  //   } else {
  //     this.setState((state, props) => {
  //       return {
  //         text: 'Save Article',
  //         isSaved: false

  //       }
  //     })
  //   }

//   changeIsReply(clickedId) {
//     this.setState(
//     {isReply: !this.state.isReply, clickedComment: clickedId}
// );}
  //clickedid is article.key right?
  // handleClick(clickedId) {
  //   this.setState(
  //     {isSaved: !this.state.isSaved, clickedBtn: clickedId}
  //   )
  // }

    // this.setState(state => ({
    //   isToggleOn: !state.isToggleOn
    // }));
    //const {id} = this.state
    //this.setState({id: id})
  //}

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
    //const {articleID} = this.state
    //const {articles, backgroundColors } = this.state;


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
                    <Button variant='info'>Comment</Button>

                    <SavedBtn 
                    data_article = {article}
                    //data_isSaved={article.isSaved}
                    //data_btn={article.btnStyle}
                    //data_text={article.btnText}
                    key={article._id}
                    value={article._id}
                    //onClick={this.handleClick}
                      //onDelete={this.handleDelete} 
                      id = {article._id}
                    />
                    {/* <Button key={article.key} value={article._id} style={{ backgroundColor: backgroundColors[article] || "pink" }} onClick = {() => this.handleClick(article.key)}>
                    </Button>   */}
                    {/* {this.state.isSaved && this.state.clickedBtn == {article.key} ? 'ON' : 'OFF'}       */}
                           
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


