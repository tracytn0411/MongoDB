import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
//import openSocket from 'socket.io-client'
//const socket = openSocket('http://127.0.0.1:5000')

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: "",
      comment: ""
    };
    //this.handleChange = this.handleChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this)
    this.handleCommentChange = this.handleCommentChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAuthorChange(event) {
    //form attr 'name' is state object.key
    //var name = event.target.name;
    //form attr 'value is state object.value
    var author = event.target.value;
    // this.setState({
    //   [name]: value //object key:value
    // });
    this.props.onAuthorChange(author)
  }

  handleCommentChange(event) {
    var comment = event.target.value;
    this.props.onCommentChange(comment)
  }

  handleSubmit(e) {
    e.preventDefault();
    var articleID = this.props.articleID; // id passed from CommentBox
    var newName = this.props.authorInput;
    var newComment = this.props.commentInput;
    console.log(`CommentForm: ${articleID} -> ${newName} : ${newComment}`);

    //this props will be passed uptree to CommentBox (child->parent)
    //this.props.onCommentSubmit({ sender: newName, content: newComment });

    //Testing trial with socket.io
    //!Status: currently only work 1 way from client to server (CommentForm to server.js)
    //TODO : Research socket.io to mongoose.
    // socket.emit('fromForm',[{
    //   article_id: articleID,
    //   comment_author: newName,
    //   comment_text: newComment
    // }])

    //Add new comment to mongo
    axios
      .post(`/api/addComment`, {
        article_id: articleID,
        comment_author: newName,
        comment_text: newComment
      })
      .then(res => {
        var savedComment = res.data
        console.log(`New comment added to Mongo: ${savedComment}`);
        this.props.onCommentSubmit(res.data)
      })
      .catch(err => console.log(`Comment Form error: ${err}`))
  }

  render() {
    return (
      <Form className="mt-2" onSubmit={this.handleSubmit}>
        {/* attr name and value are use to set state */}
        <Form.Group controlId="commentSender">
          <Form.Control
            type="text"
            placeholder="Name"
            name="author"
            value={this.props.authorInput}
            onChange={this.handleAuthorChange}
          />
        </Form.Group>

        <Form.Group controlId="commentText">
          <Form.Control
            type="text"
            ref="text"
            placeholder="Write a comment..."
            name="comment"
            value={this.props.commentInput}
            onChange={this.handleCommentChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" ref="submitBtn">
          Submit
        </Button>
      </Form>
    );
  }
}

export default CommentForm;
