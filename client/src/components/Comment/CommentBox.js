import React, { Component } from "react";
//import socketIOClient from "socket.io-client";
import {Container} from 'react-bootstrap';
import Axios from "axios";
import CommentList from './CommentList';
import CommentForm from './CommentForm';

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //articleID: this.props.dataTwo,
      response: false,
      endpoint: "http://127.0.0.1:5000",
      //addComment: '',
      comments: [],
    };
  }
  componentDidMount() {
    // this.submitComment()
    this.getComments();
    // const { endpoint } = this.state;
    // const socket = socketIOClient(endpoint);
    // socket.on("/api/addComment", data => this.setState({ response: data }));
  }

  getComments(){
    var articleID = this.props.dataTwo
    console.log(articleID)
    Axios.get(`/api/getComments/` + articleID)
      .then(res => {
        console.log(res.data)
        this.setState({
          comments: res.data
        })
      })
      .catch(err => console.log(err))
  }

  // submitComment(childData){
  //   console.log(childData)
  //   this.setState({
  //     comments: childData
  //   })

  // }

  render() {
    return (
    <Container className='commentBox mt-4'>
      <CommentList data_comments={this.state.comments} />
      <CommentForm dataThree={this.props.dataTwo} submitComment={this.submitComment} />
      {/* <ListGroup>

      </ListGroup>
      <Form inline>
        <FormControl type="text" onChange={this.handleNewComment} placeholder="Comment..." className=" mr-sm-2" />
        <Button type="submit">Post</Button>
      </Form> */}
    </Container>

    )
  }
  // render() {
  //   const { response } = this.state;
  //   return (
  //       <div style={{ textAlign: "center" }}>
  //         {response
  //             ? <p>
  //               The temperature in Florence is: {response} °F
  //             </p>
  //             : <p>Loading...</p>}
  //       </div>
  //   );
  // }
}

// var CommentBox = React.createClass({
//   getInitialState: function () {
//       return {
//           comments: null
//       };
//   },
//   componentDidMount: function () {
//       var that = this;
//       this.socket = io();
//       this.socket.on('comments', function (comments) {
//           that.setState({ comments: comments });
//       });
//       this.socket.emit('fetchComments');
//   },
//   submitComment: function (comment, callback) {
//       this.socket.emit('newComment', comment, function (err) {
//           if (err)
//               return console.error('New comment error:', err);
//           callback();
//       });
//   },
//   render: function() {
//       return (
//           <div className="commentBox">
//               <h3>Comments:</h3>
//               <CommentList comments={this.state.comments}/>
//               <CommentForm submitComment={this.submitComment}/>
//           </div>
//       );
//   }
// });

export default CommentBox;
