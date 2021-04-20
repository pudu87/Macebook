import { useState } from 'react'
import { API_URL } from '../../Constants'
import Comment from './Comment'
import NewComment from './NewComment'
import UserDisplay from './UserDisplay'

function Post(props) {

  const post = props.post;
  const [comments, setComments] = useState([]);

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
  }

  const commentList = comments.map(comment => {
    return <Comment key={comment.id} comment={comment}/>
  });

  return (
    <article className="post">
      <UserDisplay data={post}/>
      {post.photo && 
        <div 
          className='photo'
          style={{ backgroundImage: `url(${post.photo})` }}>
        </div>}
      <p className='content'>{post.content}</p>
      <ul>
        <li>#Likes: {post.likes_count}</li>
        <li>#Comments: {post.comments_count}</li>
        <li>Date: {post.created_at}</li>
      </ul>
      <button onClick={showComments}>ShowComments</button>
      <ul>{commentList}</ul>
      <NewComment handleNewComment={handleNewComment}/>
    </article>
  );
}

export default Post;