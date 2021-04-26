import { useState } from 'react'
import { API_URL } from '../../Constants'
import { fetchNewComment, editComment, deleteComment, fetchNewLike, deleteLike } from '../logic/Helpers'
import NewComment from './NewComment'
import EditComment from './EditComment'
import UserDisplay from './UserDisplay'

function Comment(props) {

  const { comment, currentUserId } = props;
  const [edit, setEdit] = useState(false);
  const [replies, setReplies] = useState([]);

  async function handleNewComment(content) {
    const newComment = await fetchNewComment(comment.id, 'Comment', content);
    setReplies([...replies, newComment]);
    props.onUpdateCommentCounter(newComment.commentable_id, 1);
  }

  async function handleEditComment(edit, id) {
    if (comment.commentable_type === 'Post') {
      props.onEditComment(edit, id);
    }
    else {
      const comment = await editComment(edit, id);
      props.onUpdateReplies(comment)
    }
  }

  async function handleDeleteComment() {
    if (comment.commentable_type === 'Post') {
      props.onDeleteComment(comment.id);
      props.onUpdateCommentCounter(comment.id, -1);
    }
    else {
      await deleteComment(comment.id);
      props.onUpdateReplies(comment.id);
      props.onUpdateCommentCounter(comment.commentable_id, -1);
    }
  }

  function handleUpdateCommentCounter(id, value) {
    props.onUpdateCommentCounter(id, value);
  }

  function handleUpdateLikeCounter(commentId, likeId) {
    const value = likeId ? 1 : -1;
    setReplies(replies.map(comment => {
      return comment.id === commentId ? 
        { ...comment, like_id: likeId, likes_count: comment.likes_count + value } : comment;
    }));
  }

  async function like() {
    if (comment.like_id) {
      await deleteLike(comment.like_id);
      props.onUpdateLikeCounter(comment.id, false);
    } else {
      const newLike = await fetchNewLike(comment.id, 'Comment');
      props.onUpdateLikeCounter(comment.id, newLike.id);
    }
  }

  function updateReplies(par) {
    if (typeof par === 'number') {
      setReplies(replies.filter(reply => reply.id !== par));
    } else {
      setReplies(replies.map(reply => reply.id === par.id ? par : reply));
    }
  }

  function toggleEdit() {
    setEdit(!edit);
  }

  async function showReplies() {
    const path = '/comments/C' + comment.id;
    const requestOptions = {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    }
    const response = await fetch(API_URL + path, requestOptions);
    const newReplies = await response.json();
    setReplies(newReplies);
  }

  const commentForm = (
    <EditComment
      comment={comment} 
      handleEditComment={handleEditComment}/>
  );

  const commentView = (
    <div className='comment-view'>
      <p className='content'>{comment.content}</p>
    </div>
  );

  const optionList = (
    <div className='buttons'>
      {currentUserId === comment.user_id &&
        <button onClick={toggleEdit}>{edit ? 'Undo' : 'Edit'}</button>}
      {currentUserId === comment.user_id &&
        <button onClick={handleDeleteComment}>X</button>}
      {comment.commentable_type === 'Post' &&
        <button onClick={showReplies}>ShowReplies</button>}
      <button onClick={like}>{comment.like_id ? 'Unlike' : 'Like'}</button>
    </div>
  );

  const replyList = replies.map(reply => {
    return <Comment 
      key={reply.id} 
      comment={reply}
      currentUserId={currentUserId}
      onEditComment={handleEditComment}
      onDeleteComment={handleDeleteComment}
      onUpdateReplies={updateReplies}
      onUpdateCommentCounter={handleUpdateCommentCounter}
      onUpdateLikeCounter={handleUpdateLikeCounter}/>
  });

  return (
    <li className="comment">
      <UserDisplay data={comment}/>
      {edit ? commentForm : commentView}
      <ul>
        <li>#Likes: {comment.likes_count}</li>
        <li>#Replies: {comment.comments_count}</li>
        <li>Date: {comment.created_at}</li>
      </ul>
      {optionList}
      <ul>{replyList}</ul>
      {comment.commentable_type === 'Post' &&
        <NewComment onNewComment={handleNewComment}/>}
    </li>
  );
}

export default Comment;