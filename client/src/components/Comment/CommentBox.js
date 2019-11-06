import React, { Component } from "react";
import {Container} from 'react-bootstrap';
import axios from "axios";
import CommentList from './CommentList';
import CommentForm from './CommentForm';
//import openSocket from 'socket.io-client'
//const socket = openSocket('http://127.0.0.1:5000')

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
    //this.submitComment = this.submitComment.bind(this);
  }

  componentDidMount() {
    this.getComments();
  }

  //Get comments from MongoDB with specific article ID
  getComments() {
    var articleID = this.props.dataTwo;
    //console.log(articleID);
    axios.get(`/api/getComments/` + articleID)
      .then(res => {
        //console.log(res.data);
        this.setState({
          comments: res.data
        });
      })
      .catch(err => console.log(err));
  }

  //Props passed from CommentForm (child) to update state temporarily
    //The purpose is to display the new comment in CommentList w/o app refresh
  handleCommentSubmit(newComment) {
    let comments = this.state.comments;
    let newComments = comments.concat([newComment]);
    this.setState({comments : newComments});
  }

  // submitComment(comment){
  //   console.log(comment)
  //   socket.emit('newComment', function (err) {
  //     if (err)
  //         return console.error('New comment error:', err);
  // });
  // }

  render() {
    return (
      <Container className="commentBox mt-4">
        <CommentList dataThree={this.props.dataTwo} data_comments={this.state.comments} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)}
          dataThree={this.props.dataTwo}
        />
      </Container>
    );
  }
}

export default CommentBox;
