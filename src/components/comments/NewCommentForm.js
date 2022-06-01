import {useEffect, useRef} from 'react';

import classes from './NewCommentForm.module.css';
import useHttp from "../../hooks/use-http";
import {addComment} from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import {useParams} from "react-router-dom";

const NewCommentForm = (props) => {
  const commentTextRef = useRef();

    const {sendRequest, status, error} = useHttp(addComment);
    
    const submitFormHandler = (event) => {
    event.preventDefault();
    const enteredText = commentTextRef.current.value;
    
    sendRequest({ commentData: {text: enteredText}, quoteId: props.quoteId});
    
  };
    const {onAddedComment} = props;
    
    useEffect(() => {
        if (status === 'completed' && !error) {
            onAddedComment();
        }
    }, [status, error])

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
        {status === 'pending' && <div className='centered'><LoadingSpinner/></div> }
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className='btn'>Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
