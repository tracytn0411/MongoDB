import React, {useState, useEffect} from 'react';
import {Button, Collapse, Badge} from 'react-bootstrap';
import CommentBox from '../Comment/CommentBox'

//For functional component, props are passed in callback for child to access
function CollapseBtn(props) {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState('');

  const countComment = (number) => {
    if (!number == 0){ //only show if there's any comment
      setCount(number)
    } else { //hide 0 if there's no comment
      setCount('')
    }
  }

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="comments-collapse-text"
        aria-expanded={open}
        variant='outline-info'
      >
        Comment <Badge variant="success">{count}</Badge>
      </Button>
      <Collapse in={open}>
        <div id="comments-collapse-text">
          <CommentBox articleID={props.articleID} onCountComment={countComment} />
        </div>
      </Collapse>
    </>
  );
}

export default CollapseBtn;
