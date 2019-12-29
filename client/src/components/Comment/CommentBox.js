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
      comments: [],
      count: ""
    };
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
    var articleID = this.props.articleID;
    //console.log(articleID);
    axios
      .get(`/api/getComments/` + articleID)
      .then(res => {
        console.log(res.data.count);
        this.props.onCountComment(res.data.count);
        this.setState({
          comments: res.data.comments,
          count: res.data.count
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
    const comments = this.state.comments;
    const addComment = newComment.comment;
    const updateComments = comments.concat([addComment]);
    const updateCount = newComment.count;
    this.props.onCountComment(updateCount);
    this.setState({
      comments: updateComments,
      count: updateCount,
      authorInput: "",
      commentInput: ""
    });
  }

  handleDeleteComment(deleteComment) {
    var comments = this.state.comments;
    var index = deleteComment.commentIndex;
    comments.splice(index, 1); //remove comment from array according to its index
    var updateCount = deleteComment.commentCount;
    this.props.onCountComment(updateCount);
    this.setState({
      comments: comments,
      count: updateCount
    });
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
          articleID={this.props.articleID}
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
          articleID={this.props.articleID}
        />
      </Container>
    );
  }
}

export default CommentBox;
