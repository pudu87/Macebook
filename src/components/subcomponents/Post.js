import { useState } from 'react'
import { API_URL } from '../../Constants'
import EditPost from './EditPost'
import Comment from './Comment'
import NewComment from './NewComment'
import UserDisplay from './UserDisplay'

function Post(props) {

  const { post, currentUserId } = props;
  const [comments, setComments] = useState([]);
  const [edit, setEdit] = useState(false);
  console.log(post);

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
    const path = '/comments/' + post.id;
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

  async function handleEditComment(comment, id) {
    const formData = new FormData();
    Object.entries(comment).forEach(([key, value]) => {
      formData.append(`comment[${key}]`, value);
    })
    const path = '/comments/' + id;
    const requestOptions = {
      method: 'PUT',
      headers: { 'Authorization': localStorage.getItem('token') },
      body: formData
    }
    const response = await fetch(API_URL + path, requestOptions);
    const edit = await response.json();
    setComments(comments.map(comment => comment.id === edit.id ? edit : comment));
  }

  async function handleDeleteComment(id) {
    const path = '/comments/' + id;
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    }
    await fetch(API_URL + path, requestOptions);
    const newComments = comments.filter(comment => comment.id !== id);
    setComments(newComments);
    props.onUpdateCounter(post.id, 'comments_count', -1);
  }

  async function handleNewComment(content) {
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({ 
        comment: { 
          content: content,
          post_id: post.id
        } 
      })
    }
    const response = await fetch(API_URL + '/comments', requestOptions);
    const newComment = await response.json();
    setComments([...comments, newComment]);
    props.onUpdateCounter(post.id, 'comments_count', 1);
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
    </div>
  );

  const commentList = comments.map(comment => {
    return <Comment 
      key={comment.id} 
      comment={comment}
      currentUserId={currentUserId}
      onEditComment={handleEditComment}
      onDeleteComment={handleDeleteComment}/>
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
      <NewComment handleNewComment={handleNewComment}/>
    </article>
  );
}

export default Post;