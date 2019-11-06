import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap';
import axios from 'axios';
//import openSocket from 'socket.io-client'
//const socket = openSocket('http://127.0.0.1:5000')

class CommentForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      author: '',
      comment: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    //form attr 'name' is state object.key
    var name = event.target.name
    //form attr 'value is state object.value
    var value = event.target.value
    this.setState({
      [name]: value //object key:value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    var articleID = this.props.dataThree; // id passed from CommentBox
    var newName = this.state.author;
    var newComment = this.state.comment;
    console.log(`CommentForm: ${articleID} -> ${newName} : ${newComment}`)

    //this props will be passed uptree to CommentBox (child->parent)
    this.props.onCommentSubmit({sender:newName, content:newComment});

    //Testing trial with socket.io
      //!Status: currently only work 1 way from client to server (CommentForm to server.js)
      //TODO : Research socket.io to mongoose.
    // socket.emit('fromForm',[{
    //   article_id: articleID,
    //   comment_author: newName,
    //   comment_text: newComment
    // }])

    //Add new comment to mongo
    axios.post(`/api/addComment`, {
      article_id: articleID,
      comment_author: newName,
      comment_text: newComment
    }).then(res => {
      console.log('new comment added to Mongo')
    })
  }

  render() {
    return (
    <Form className='mt-2' onSubmit={this.handleSubmit}>

      {/* attr name and value are use to set state */}
      <Form.Group controlId="commentSender">
        <Form.Control type="text" placeholder="Name" name='author' value={this.state.author} onChange={this.handleChange} />
      </Form.Group>

      <Form.Group controlId="commentText">
        <Form.Control type="text" ref='text' placeholder="Write a comment..." name='comment' value={this.state.comment} onChange={this.handleChange} />
      </Form.Group>
      
      <Button variant="primary" type="submit" ref='submitBtn'>
        Submit
      </Button>
    </Form>
    )
  }
}

export default CommentForm;
