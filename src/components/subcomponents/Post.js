import { useState } from 'react'
import { API_URL } from '../../Constants'
import { fetchNewComment, editComment, deleteComment, fetchNewLike, deleteLike } from '../logic/Helpers'
import EditPost from './EditPost'
import Comment from './Comment'
import NewComment from './NewComment'
import UserDisplay from './UserDisplay'

function Post(props) {

  const { post, currentUserId } = props;
  const [comments, setComments] = useState([]);
  const [edit, setEdit] = useState(false);

  function handleDeletePost() {
    props.onDeletePost(post.id);
  }

  function toggleEdit() {
    setEdit(!edit);
  }

  function handleEditPost(edit) {
    props.onEditPost(edit, post.id);
  }

  async function showComments() {
    const path = '/comments/P' + post.id;
    const requestOptions = {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    }
    const response = await fetch(API_URL + path, requestOptions);
    const newComments = await response.json();
    setComments(newComments);
  }

  async function handleNewComment(content) {
    const newComment = await fetchNewComment(post.id, 'Post', content);
    setComments([...comments, newComment]);
    props.onUpdateCommentCounter(post.id, 1);
  }

  async function handleEditComment(comment, id) {
    const edit = await editComment(comment, id)
    setComments(comments.map(comment => comment.id === edit.id ? edit : comment));
  }

  async function handleDeleteComment(id) {
    await deleteComment(id);
    const newComments = comments.filter(comment => comment.id !== id);
    setComments(newComments);
    props.onUpdateCommentCounter(post.id, -1);
  }

  function handleUpdateCommentCounter(id, value) {
    setComments(comments.map(comment => {
      return comment.id === id ?
        { ...comment, comments_count: comment.comments_count + value } : comment;
    }));
    props.onUpdateCommentCounter(post.id, value);
  }

  function handleUpdateLikeCounter(commentId, likeId) {
    const value = likeId ? 1 : -1;
    setComments(comments.map(comment => {
      return comment.id === commentId ? 
        { ...comment, like_id: likeId, likes_count: comment.likes_count + value } : comment;
    }));
  }

  async function like() {
    if (post.like_id) {
      await deleteLike(post.like_id);
      props.onUpdateLikeCounter(post.id, false);
    } else {
      const newLike = await fetchNewLike(post.id, 'Post');
      props.onUpdateLikeCounter(post.id, newLike.id);
    }
  }

  const postView = (
    <div className='post-view'>
      {post.photo && 
        <div 
          className='photo'
          style={{ backgroundImage: `url(${post.photo})` }}>
        </div>}
      <p className='content'>{post.content}</p>
    </div>
  );

  const postForm = (
    <EditPost
      post={post} 
      handleEditPost={handleEditPost}/>
  );
  
  const optionList = (
    <div className='buttons'>
      {currentUserId === post.user_id &&
        <button onClick={toggleEdit}>{edit ? 'Undo' : 'Edit'}</button>}
      {currentUserId === post.user_id &&
        <button onClick={handleDeletePost}>X</button>}
      <button onClick={showComments}>ShowComments</button>
      <button onClick={like}>{post.like_id ? 'Unlike' : 'Like'}</button>
    </div>
  );

  const commentList = comments.map(comment => {
    return <Comment 
      key={comment.id} 
      comment={comment}
      currentUserId={currentUserId}
      onEditComment={handleEditComment}
      onDeleteComment={handleDeleteComment}
      onUpdateCommentCounter={handleUpdateCommentCounter}
      onUpdateLikeCounter={handleUpdateLikeCounter}/>
  });

  return (
    <article className="post">
      <UserDisplay data={post}/>
      {edit ? postForm : postView}
      <ul>
        <li>#Likes: {post.likes_count}</li>
        <li>#Comments: {post.comments_count}</li>
        <li>Date: {post.created_at}</li>
      </ul>
      {optionList}
      <ul>{commentList}</ul>
      <NewComment onNewComment={handleNewComment}/>
    </article>
  );
}

export default Post;