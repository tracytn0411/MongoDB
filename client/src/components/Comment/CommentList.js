import React, { Component} from 'react';
import {ListGroup} from 'react-bootstrap';
import CommentDelete from './CommentDel'
//import socketIOClient from 'socket.io-client';
//import openSocket from 'socket.io-client'

class CommentList extends Component {
  constructor(props) {
    super(props);
  }

  deleteComment(commentID) {
    this.props.onDeleteComment(commentID)
  }

  render() {
    return (
      <ListGroup variant="flush" className="mb-3">
        {/* comments array passed from CommentBox as props*/}
        {this.props.commentList.map((comment, index) => {
          return (
            <ListGroup.Item
              key={index}
              className="d-flex align-items-center"
            >
              <CommentDelete 
                commentID={comment._id}
                onDeleteComment={this.deleteComment.bind(this)}
              />
              <span className="text-info mr-auto">{comment.sender}</span>
              {comment.content}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    );
  }
}

export default CommentList;