import React, { Component} from 'react';
import {ListGroup} from 'react-bootstrap';
//import socketIOClient from 'socket.io-client';
//import openSocket from 'socket.io-client'

class CommentList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ListGroup variant="flush" className="mb-3">
        {/* comments array passed from CommentBox as props*/}
        {this.props.data_comments.map((comment, index) => {
          return (
            <ListGroup.Item
              key={index}
              className="d-flex justify-content-between align-items-center"
            >
              <span className="text-info">{comment.sender}</span>
              {comment.content}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    );
  }
}

export default CommentList;