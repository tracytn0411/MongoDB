//import React, { useState } from "react";
import React, { useState } from "react";
import { Jumbotron, Toast, Container, Row, Col } from "react-bootstrap";

import smashing from "../Images/smashing.png";
import socketIOClient from "socket.io-client";
const HeaderToast = () => {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState("");

  const socket = socketIOClient("/");
  socket.on("article saved", notification => {
    setNotification(notification);
    setShow(true);
  });

  return (
    <Toast
      className="ml-auto"
      show={show}
      onClose={() => setShow(false)}
      delay={10000}
      autohide
    >
      <Toast.Header>
        <strong className="mr-auto text-primary">Notification</strong>
      </Toast.Header>
      <Toast.Body>
        <span className="font-weight-bold">{notification}</span> has been saved!
      </Toast.Body>
    </Toast>
  );
};

const Header = () => (
  <Jumbotron fluid>
    <Container fluid>
      <Row>
        <Col md={8} className="text-center p-4">
          <h1 className="header">Welcome To News Scraper</h1>
          <p className="lead">
            Get the lastest news from
            <img className="p-2" src={smashing} alt="magazine-logo" />
          </p>
        </Col>
        <Col md={4}>
          <HeaderToast>
          </HeaderToast>
        </Col>
      </Row>
    </Container>
  </Jumbotron>
);

export default Header;
