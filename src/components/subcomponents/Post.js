import { useState } from 'react'
import { Link } from 'react-router-dom'
import { API_URL } from '../../Constants'
import { getFullName } from '../logic/Helpers'
import Comment from './Comment'
import NewComment from './NewComment'

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

  const commentList = comments.map(comment => {
    return <Comment key={comment.id} comment={comment}/>
  });

  return (
    <article className="post">
      <Link to={`/${post.user_id}`}>{getFullName(post.profile)}</Link>
      <p>{post.content}</p>
      <ul>
        <li>#Likes: {post.likes_count}</li>
        <li>#Comments: {post.comments_count}</li>
        <li>Date: {post.created_at}</li>
      </ul>
      <button onClick={showComments}>ShowComments</button>
      <ul>{commentList}</ul>
      <NewComment/>
    </article>
  );
}

export default Post;