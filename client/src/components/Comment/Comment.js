var Comment = React.createClass({
  render: function () {
      return (
          <div className="comment">
              <span className="author">{this.props.comment.author}</span> said:<br/>
              <div className="body">{this.props.comment.text}</div>
          </div>
      );
  }
});