import React, { Component } from "react";
import {BrowserRouter, Route, Link} from 'react-router-dom';

import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl
} from "react-bootstrap";
import {FaGithub} from 'react-icons/fa'

class NavbarPage extends Component {
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
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="#link">Saved Articles</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <a href='https://github.com/tracytn0411/mongodb-web-scraper' role='button'><FaGithub /></a>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </BrowserRouter>
    );
  }
}

export default NavbarPage;

// class Header extends Component {
//   render(){
//     return (      
//         <BrowserRouter>
//           <div> 
//             <Navbar>
//               <Navbar.Header>
//                   <Navbar.Brand>
//                     React-Bootstrap
//                   </Navbar.Brand>
//               </Navbar.Header>  
//               <Nav>
//                 <NavItem><Link to="/">Home</Link></NavItem>
//                 <NavItem><Link to="/github">GitHub</Link></NavItem>
//               </Nav>
//             </Navbar>                              
//             <Switch>   
//               <Route path="/github/user/:login/:score" component={GitHubUser} />                                     
//               <Route path="/github" component={GitHub} />              
//               <Route exact path="/" component={Home} />             
//               <Route path="/*" component={NotFound} />                       
//             </Switch>   
//           </div>  
//         </BrowserRouter>              
//     )
//   }
// }