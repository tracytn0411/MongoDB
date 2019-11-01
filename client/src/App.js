import React, { Component } from 'react';
//import {Card, Container, Row, Col, Button} from 'react-bootstrap';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';

import {
  Navbar,
  Nav,
  Button
} from "react-bootstrap";
import {FaGithub} from 'react-icons/fa'

//import NavbarPage from './NavBar'
import Jumbo from './Jumbo';
import Articles from './Articles'
import SavedArticles from './SavedArticles';


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
  state = {
    isOpen: false
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <BrowserRouter>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">News Scraper</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Item className='px-2'>
                <Link to="/">Home</Link>
              </Nav.Item>
              <Nav.Item className='px-2'>
                <Link to="/saved">Saved Articles</Link>
              </Nav.Item>
              {/* <Nav.Item className='px-2'>
                <Button href='/api/scrape'> Scrape latest news!
                </Button>
              </Nav.Item> */}
              
            </Nav>
              <a href="https://github.com/tracytn0411/mongodb-web-scraper" role="button">
                <FaGithub />
              </a>
           
           
          </Navbar.Collapse>
        </Navbar>

        <Jumbo />

        <Switch>
          <Route exact path="/" component={Articles} />
          <Route path="/saved" component={SavedArticles} />
        </Switch>
      </BrowserRouter>
    );
  }
}



// class App extends Component {
//   render (){
//     return (
//         <div>
//           <NavbarPage />
//           <Jumbo />
//           <SavedArticle />
//           <Articles />
//         </div>
      
//     )
//   }

// }


  


export default App;



