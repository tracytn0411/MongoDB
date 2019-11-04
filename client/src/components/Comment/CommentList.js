import React, { Component} from 'react';
//import socketIOClient from 'socket.io-client';
import {ListGroup} from 'react-bootstrap';

class CommentList extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   comments: []
    // }
  }

  // componentDidMount() {
  //   this.setState({
  //     comments: this.props.data_comments
  //   })
  // }

  

  render () {
    return (
      <ListGroup variant='flush' className='mb-3'>
        {this.props.data_comments.map((comment, index) => {
          return (
            <ListGroup.Item key={index} className='d-flex justify-content-between align-items-center' >
              <span className='text-info'>{comment.sender}</span>
              {comment.content}
            </ListGroup.Item>
          )
        })}

      </ListGroup>
    )
  }
}

export default CommentList;

// class CommentList extends React.Component {
  
//   constructor(props) {
//     super(props);
//   }
  
//   render() {
//     let commentNodes = this.props.comments.map(function(comment, index) {
//       return (<Comment key={index} author={comment.author}>{comment.text}</Comment>);
//     });
//     return (<div className="commentList">{commentNodes}</div>);
//   }
  
// }