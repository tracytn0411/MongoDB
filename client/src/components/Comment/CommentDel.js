import React, { Component } from "react";
import { Button } from "react-bootstrap";

class CommentDelete extends Component {
  constructor(props) {
    super(props);
    this.deleteComment = this.deleteComment.bind(this);
  }

  deleteComment(e) {
    var commentID = e.target.id;
    console.log(`Deleted book that has id: ${commentID}`);
    this.props.onDeleteComment(commentID); //pass the commute id to Custom (parent)
  }

  render() {
    const commentID = this.props.commentID;
    console.log(commentID);
    return (
      <Button
        variant="outline-light"
        size='small'
        id={commentID}
        onClick={this.deleteComment}
      >
        x
      </Button>
    );
  }
}

export default CommentDelete;
