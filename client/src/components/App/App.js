import React, { Component } from 'react';
//import {Button, Navbar, Nav} from 'react-bootstrap';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';

import {
  Navbar,
  Nav,
  Button
} from "react-bootstrap";
import {FaGithub} from 'react-icons/fa'

//import NavbarPage from './NavBar'
import Jumbo from './Jumbo';
import ArticleList from './ArticleList'
import SavedArticleList from './SavedArticlesList';


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
                <Link to="/" className='btn btn-light'>Home</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/saved" className='btn btn-light'>Saved Articles</Link>
              </Nav.Item>
              <Nav.Item className='ml-4'>
                <Button variant='info' href='/api/scrape'> Scrape latest news!
                </Button>
              </Nav.Item>
              
            </Nav>
              <a href="https://github.com/tracytn0411/mongodb-web-scraper" role="button">
                <FaGithub />
              </a>
           
           
          </Navbar.Collapse>
        </Navbar>

        <Jumbo />

        <Switch>
          <Route exact path="/" component={ArticleList} />
          <Route path="/saved" component={SavedArticleList} />
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



