import { useState } from 'react'
import { fetchApi } from '../helpers/Fetching'
import ReactTimeAgo from 'react-time-ago'
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
        <img 
          className='photo'
          src={post.photo} 
          alt={post.photo.split('/').pop().split('.')[0]}/>}
      <p className='content'>{post.content}</p>
    </div>
  );

  const attributeList = (
    <ul className='attributes'>
      <li className='likes-counter'>
        <span>
          <i className='far fa-thumbs-up'></i> {post.likes_count}
        </span>
      </li>
      <li className='comments-counter'>
        <span onClick={post.comments_count > 0 ? showComments : undefined}>
          <i className="far fa-comment"></i> {post.comments_count}
        </span>
      </li>
      <li className='date'>
        <ReactTimeAgo date={new Date(post.created_at)}/>
      </li>
    </ul>
  );

  const optionList = (
    <div className='buttons'>
      {currentUserId === post.user_id &&
        <button 
          className='toggle-edit-post'
          onClick={() => {setEdit(!edit)}}>
          <i className={'fas fa-' + (edit ? 'undo' : 'edit')}></i>
        </button>}
      {currentUserId === post.user_id &&
        <button 
          className='delete-post'
          onClick={() => {props.onDeletePost(post.id)}}>
          <i className="far fa-trash-alt"></i>
        </button>}
      <button 
        className='like'
        onClick={() => { post.like_id ? unlike() : like() }}>
        <i className={'fas fa-thumbs-up ' + (post.like_id ? 'liked' : 'unliked')}></i>
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
