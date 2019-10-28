import React, { Component } from 'react';
//import {Card, Container, Row, Col, Button} from 'react-bootstrap';
import NavbarPage from './NavBar'

import Jumbo from './Jumbo';
import Articles from './Articles'


//var axios = require("axios");

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
  render (){
    return (
        <div>
          <NavbarPage />
          <Jumbo />
          <Articles />
        </div>
      
    )
  }

}

// class App extends Component {
//   // state = {
//   //   articles: []
//   // }

//   constructor(props) {
//     super(props);
//     this.state = {
//       articles: []
//     }
//   }

//   componentDidMount() {
//     // Axios /GET requests go here, when we want data ASAP!
//     axios.get(`/api/articles`)
//       .then(res => {
//         var articles = res.data.map(obj => ({
//           title: obj.title,
//           link: obj.link,
//           summary: obj.summary,
//           date: obj.date
//         }));
//         console.log(articles)
//         this.setState({
//           articles
//         })
//       })
//       .catch(err => console.log(err))
//   }

//   // .then(res => {
//   //   const posts = res.data.results.map(obj => ({title: obj.title, overview: obj.overview}));
//   //   this.setState({ posts });
//   // });
  
//   render() {
//     return (
//       <Container fluid>
//         <Row>
//           {this.state.articles.map(function(article, index){
//             return (
//               <Col md={6} lg={4} key={index}>
//                 <Card>
//                   <Card.Body>
//                     <Card.Title >{article.title}</Card.Title>
//                     <Card.Text>
//                       <span>
//                         {article.date}
//                       </span>
//                       {article.summary}
//                     </Card.Text>
                  
//                     <Card.Link href={article.link} target='_blank'>Read more...</Card.Link>

//                   </Card.Body>
//                   <Card.Footer className='text-right'>
//                     <Button variant='info'>Comment</Button>
//                     <Button variant='secondary'>Save</Button>
//                   </Card.Footer>
//                 </Card>
//               </Col>
//             )}
//           )}
//         </Row>
//       </Container>
//     )}
//   }

export default App;



