import React, { Component } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
//import openSocket from 'socket.io-client'
//const socket = openSocket('http://127.0.0.1:5000')

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorInput: "",
      commentInput: "",
      comments: []
    };
    //this.submitComment = this.submitComment.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    //this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    //this.handleDeleteComment = this.handleDeleteComment.bind(this)
  }

  componentDidMount() {
    this.getComments();
  }

  //Get comments from MongoDB with specific article ID
  getComments() {
    var articleID = this.props.dataTwo;
    //console.log(articleID);
    axios
      .get(`/api/getComments/` + articleID)
      .then(res => {
        //console.log(res.data);
        this.setState({
          comments: res.data
        });
      })
      .catch(err => console.log(err));
  }

  handleAuthorChange(authorInput) {
    this.setState({
      authorInput: authorInput
    });
  }

  handleCommentChange(commentInput) {
    this.setState({
      commentInput: commentInput
    });
  }

  //Props passed from CommentForm (child) to update state temporarily
  //The purpose is to display the new comment in CommentList w/o app refresh
  handleCommentSubmit(newComment) {
    let comments = this.state.comments;
    let newComments = comments.concat([newComment]);
    this.setState({
      comments: newComments,
      authorInput: "",
      commentInput: ""
    });
  }

  handleDeleteComment(id) {
    axios
      .delete(`/api/delComment/${id}`)
      .then(res => {
        console.log(res.data);
      })
      .then(this.getComments())
      .catch(err => console.log(`Delete commute error: ${err}`));
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
        <CommentList
          dataThree={this.props.dataTwo}
          commentList={this.state.comments}
          authorInput={this.state.authorInput}
          commentInput={this.state.commentInput}
          onDeleteComment={this.handleDeleteComment.bind(this)}
        />
        <CommentForm
          onCommentSubmit={this.handleCommentSubmit.bind(this)} // Another way to bind
          onAuthorChange={this.handleAuthorChange}
          onCommentChange={this.handleCommentChange}
          authorInput={this.state.authorInput}
          commentInput={this.state.commentInput}
          dataThree={this.props.dataTwo}
        />
      </Container>
    );
  }
}

export default CommentBox;
