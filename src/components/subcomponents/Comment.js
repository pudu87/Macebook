import { useState } from 'react'
import { fetchApi } from '../helpers/Fetching'
import ReactTimeAgo from 'react-time-ago'
import NewComment from './NewComment'
import EditComment from './EditComment'
import UserDisplay from './UserDisplay'

function Comment(props) {

  const { parent, comment, currentUserId } = props;
  const [replies, setReplies] = useState([]);
  const [repliesView, setRepliesView] = useState(false);
  const [edit, setEdit] = useState(false);

  async function showReplies() {
    if (replies.length === 0) {
      const path = '/comments/C' + comment.id;
      const newReplies = await fetchApi(path, 'GET');
      setReplies(newReplies);
    }
    setRepliesView(!repliesView);
  }

  async function handleNewComment(data) {
    data.commentable_id = comment.id;
    data.commentable_type = 'Comment';
    const newComment = await fetchApi('/comments', 'POST', data);
    setReplies([...replies, newComment]);
    props.onUpdateCommentCounter(newComment.commentable_id, 1);
    if (!repliesView) showReplies();
  }

  async function handleEditComment(edit, id) {
    if (parent === 'Post') {
      props.onEditComment(edit, id);
    }
    else {
      const path = '/comments/' + id;
      const comment = await fetchApi(path, 'PUT', edit);
      props.onUpdateReplies(comment);
    }
    setEdit(!edit);
  }

  async function handleDeleteComment() {
    if (parent === 'Post') {
      const value = -1 - comment.comments_count;
      props.onDeleteComment(comment.id, value);
      props.onUpdateCommentCounter(comment.id, -1);
    }
    else {
      const path = '/comments/' + comment.id;
      await fetchApi(path, 'DELETE');
      props.onUpdateReplies(comment.id);
      props.onUpdateCommentCounter(comment.commentable_id, -1);
    }
  }

  function updateReplies(par) {
    if (typeof par === 'number') {
      setReplies(replies.filter(reply => reply.id !== par));
    } else {
      setReplies(replies.map(reply => reply.id === par.id ? par : reply));
    }
  }

  function handleUpdateLikeCounter(commentId, likeId) {
    const value = likeId ? 1 : -1;
    setReplies(replies.map(comment => {
      return comment.id === commentId ? 
        { ...comment, like_id: likeId, likes_count: comment.likes_count + value } : comment;
    }));
  }

  async function like() {
    const data = {
      likeable_id: comment.id,
      likeable_type: 'Comment'
    };
    const newLike = await fetchApi('/likes', 'POST', data);
    props.onUpdateLikeCounter(comment.id, newLike.id);
  }

  async function unlike() {
    const path = '/likes/' + comment.like_id;
    await fetchApi(path, 'DELETE');
    props.onUpdateLikeCounter(comment.id, false);
  }

  const commentForm = (
    <EditComment
      parent={parent}
      comment={comment} 
      onEditComment={handleEditComment}/>
  );

  const commentView = (
    <div className='comment-view'>
      <p className='content'>{comment.content}</p>
    </div>
  );

  const attributeList = (
    <ul className='attributes'>
      <li className='likes-counter'>
        <i className='far fa-thumbs-up'></i> {comment.likes_count}
      </li>
      {parent === 'Post' &&
        <li 
          className='comments-counter'
          onClick={comment.comments_count > 0 ? showReplies : undefined}>
          <i className="far fa-comment"></i> {comment.comments_count}
        </li>}
      <li className='date'>
        <ReactTimeAgo date={new Date(comment.created_at)}/>
      </li>
    </ul>
  );

  const optionList = (
    <div className='buttons'>
      {currentUserId === comment.user_id &&
        <button 
          className='toggle-edit-comment'
          onClick={() => {setEdit(!edit)}}>
          <i className={'fas fa-' + (edit ? 'undo' : 'edit')}></i>
        </button>}
      {currentUserId === comment.user_id &&
        <button 
          className='delete-comment'
          onClick={handleDeleteComment}>
          <i className="far fa-trash-alt"></i>
        </button>}
      <button 
        className='like'
        onClick={() => { comment.like_id ? unlike() : like() }}>
        <i className={'fas fa-thumbs-up ' + (comment.like_id ? 'liked' : 'unliked')}></i>
      </button>
    </div>
  );

  const replyList = replies.map(reply => {
    return <Comment 
      key={reply.id} 
      parent='Comment'
      comment={reply}
      currentUserId={currentUserId}
      onEditComment={handleEditComment}
      onDeleteComment={handleDeleteComment}
      onUpdateReplies={updateReplies}
      onUpdateCommentCounter={(id, value) => {props.onUpdateCommentCounter(id, value)}}
      onUpdateLikeCounter={handleUpdateLikeCounter}/>
  });

  return (
    <li className="comment">
      <UserDisplay data={comment}/>
      {edit ? commentForm : commentView}
      {attributeList}
      {optionList}
      {repliesView && <ul>{replyList}</ul>}
      {comment.commentable_type === 'Post' &&
        <NewComment 
          parent='Comment'
          onNewComment={handleNewComment}/>}
    </li>
  );
}

export default Comment;
