import { useState } from 'react'
import { fetchApi } from '../helpers/Fetching'
import EditPost from './EditPost'
import Comment from './Comment'
import NewComment from './NewComment'
import UserDisplay from './UserDisplay'

function Post(props) {

  const { post, currentUserId } = props;
  const [comments, setComments] = useState([]);
  const [commentsView, setCommentsView] = useState(false);
  const [edit, setEdit] = useState(false);

  function handleEditPost(edit) {
    props.onEditPost(edit, post.id);
    setEdit(!edit);
  }

  async function showComments() {
    if (comments.length === 0) {
      const path = '/comments/P' + post.id;
      const newComments = await fetchApi(path, 'GET');
      setComments(newComments);
    }
    setCommentsView(!commentsView);
  }

  async function handleNewComment(data) {
    data.commentable_id = post.id;
    data.commentable_type = 'Post';
    const newComment = await fetchApi('/comments', 'POST', data);
    setComments([...comments, newComment]);
    props.onUpdateCommentCounter(post.id, 1);
    if (!commentsView) showComments();
  }

  async function handleEditComment(comment, id) {
    const path = '/comments/' + id;
    const edit = await fetchApi(path, 'PUT', comment);
    setComments(comments.map(comment => comment.id === edit.id ? edit : comment));
  }

  async function handleDeleteComment(id, value) {
    const path = '/comments/' + id;
    await fetchApi(path, 'DELETE');
    const newComments = comments.filter(comment => comment.id !== id);
    setComments(newComments);
    props.onUpdateCommentCounter(post.id, value);
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
    const data = {
      likeable_id: post.id,
      likeable_type: 'Post'
    };
    const newLike = await fetchApi('/likes', 'POST', data);
    props.onUpdateLikeCounter(post.id, newLike.id);
  }

  async function unlike() {
    const path = '/likes/' + post.like_id;
    await fetchApi(path, 'DELETE');
    props.onUpdateLikeCounter(post.id, false);
  }

  const postForm = (
    <EditPost
      post={post} 
      onEditPost={handleEditPost}/>
  );

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

  const attributeList = (
    <ul>
      <li>#Likes: {post.likes_count}</li>
      <li>#Comments: {post.comments_count}</li>
      <li>Date: {post.created_at}</li>
    </ul>
  );

  const optionList = (
    <div className='buttons'>
      {currentUserId === post.user_id &&
        <button 
          className='toggle-edit-post'
          onClick={() => {setEdit(!edit)}}>{edit ? 'Undo' : 'Edit'}</button>}
      {currentUserId === post.user_id &&
        <button 
          className='delete-post'
          onClick={() => {props.onDeletePost(post.id)}}>X</button>}
      {post.comments_count > 0 && 
        <button 
          className='show-comments'
          onClick={showComments}>
          {commentsView ? 'Hide Comments' : 'Show Comments'}</button>}
      <button 
        className='like'
        onClick={() => { post.like_id ? unlike() : like() }}>
        {post.like_id ? 'Unlike' : 'Like'}
      </button>
    </div>
  );

  const commentList = comments.map(comment => {
    return <Comment 
      key={comment.id} 
      parent='Post'
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
      {attributeList}
      {optionList}
      {commentsView && <ul>{commentList}</ul>}
      <NewComment 
        parent='Post'
        onNewComment={handleNewComment}/>
    </article>
  );
}

export default Post;
