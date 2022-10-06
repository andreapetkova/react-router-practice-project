import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from './CommentsList';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);

  const params = useParams();

  const {id} = params

  const { sendRequest, status, data: allComments } = useHttp(getAllComments);

  useEffect(()=>{
    sendRequest(id);
  }, [sendRequest,id])

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addedCommentHandler = useCallback(() => {
    sendRequest(id)
  }, [sendRequest, id]);

  let comments;
  console.log(allComments)

  if (status === 'pending') {
    comments = <div className='centered'><LoadingSpinner/></div>
  }

  if (status === 'completed' && (allComments && allComments.length > 0)) {
    comments = <CommentsList comments={allComments}/>
  }

  if (status === 'completed' && (!allComments || allComments.length === 0)) {
    comments = <p className='centered'>No comments yet!</p>
    console.log(comments)
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm id={id} onAddedComment={addedCommentHandler} />
      )}
      {comments}
    </section>
  );
};

export default Comments;
