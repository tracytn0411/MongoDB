//import React, { useState } from "react";
import React from "react";

import {Jumbotron} from 'react-bootstrap';
//import {Toast} from "react-bootstrap";
import {Container} from 'react-bootstrap';
import smashing from './smashing.png'

// eslint-disable-next-line react/prop-types
// const ExampleToast = ({ children }) => {
//   const [show, toggleShow] = useState(true);

//   return (
//     <Toast show={show} onClose={() => toggleShow(!show)}>
//       <Toast.Header>
//         <strong className="mr-auto">React-Bootstrap</strong>
//       </Toast.Header>
//       <Toast.Body>{children}</Toast.Body>
//     </Toast>
//   );
// };

const Jumbo = () => (
  <Jumbotron fluid>
    <Container className='p-2'>
      <h1 className="header">Welcome To News Scraper</h1>
      <p className='lead'>Get the lastest news from
      
      <img className='p-2' src={smashing} alt='magazine-logo'></img>
      </p>
      {/* <ExampleToast className="toast">
        We now have Toasts
      <span role="img" aria-label="tada">
          🎉
      </span>
      </ExampleToast> */}
    </Container>
  </Jumbotron>
);

export default Jumbo;

