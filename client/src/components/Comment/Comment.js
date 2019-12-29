import React, { Component } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.deleteComment = this.deleteComment.bind(this);
  }

  deleteComment(e) {
    var commentID = this.props.commentID;
    const commentIndex = parseInt(this.props.index);
    console.log(`Deleted book that has id: ${commentIndex}`);

    axios
      .delete(`/api/delComment/${commentID}`)
      .then(res => {
        console.log(res.data);
        const count = res.data;
        this.props.onDeleteComment({
          commentIndex: commentIndex,
          commentCount: count
        });
      })
      .catch(err => console.log(`Delete comment error: ${err}`));
  }

  render() {
    const commentID = this.props.commentID;
    //console.log(commentID);
    const comment = this.props.comment;
    return (
      <>
        <Button
          variant="light"
          size="small"
          id={commentID}
          onClick={this.deleteComment}
        >
          x
        </Button>
        <span className="text-info mr-auto">{comment.sender}</span>
        {comment.content}
      </>
    );
  }
}

export default Comment;
