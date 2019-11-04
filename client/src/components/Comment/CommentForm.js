import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap';
import axios from 'axios';

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
    console.log(articleID)
    //console.log(this.state)
    console.log(newName, newComment)

    axios.post(`/api/addComment`, {
      article_id: articleID,
      comment_author: newName,
      comment_text: newComment
    }).then(res => {
      console.log('new comment added to Mongo')
      //var addedComment = res.data
      //console.log(addedComment)
      //this.props.submitComment(res.data)
    })


    
    // alert('A name was submitted: ' + this.state.value);
    // var author = this.refs.author.getDOMNode().value.trim();
    // var text = this.refs.text.getD
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

// var CommentForm = React.createClass({
//   handleSubmit: function (e) {
//       e.preventDefault();
//       var that = this;
//       var author = this.refs.author.getDOMNode().value.trim();
//       var text = this.refs.text.getDOMNode().value.trim();
//       var comment = { author: author, text: text };
//       var submitButton = this.refs.submitButton.getDOMNode();
//       submitButton.innerHTML = 'Posting comment...';
//       submitButton.setAttribute('disabled', 'disabled');
//       this.props.submitComment(comment, function (err) {
//           that.refs.author.getDOMNode().value = '';
//           that.refs.text.getDOMNode().value = '';
//           submitButton.innerHTML = 'Post comment';
//           submitButton.removeAttribute('disabled');
//       });
//   },
//   render: function () {
//       return (
//           <form className="commentForm" onSubmit={this.handleSubmit}>
//               <input type="text" name="author" ref="author" placeholder="Name" required /><br/>
//               <textarea name="text" ref="text" placeholder="Comment" required></textarea><br/>
//               <button type="submit" ref="submitButton">Post comment</button>
//           </form>
//       );
//   }
// });

export default CommentForm;
