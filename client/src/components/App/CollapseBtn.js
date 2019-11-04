import React, {useState} from 'react';
import {Button, Collapse} from 'react-bootstrap';
import CommentBox from '../Comment/CommentBox'

//For functional component, props are passed in callback for child to access
function CollapseBtn(props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="comments-collapse-text"
        aria-expanded={open}
        variant='outline-info'
      >
        Comment
      </Button>
      <Collapse in={open}>
        <div id="comments-collapse-text">
          <CommentBox dataTwo={props.dataOne} />
          
        </div>
      </Collapse>
    </>
  );
}

export default CollapseBtn;

// render(<CollapseBtn />);