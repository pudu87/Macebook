import { useState } from 'react'
import { API_URL } from '../../Constants'
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
    const result = await response.json();
    setComments(result);
  }

  const commentList = comments.map(comment => {
    return <Comment key={comment.id} comment={comment}/>
  });

  return (
    <article className="post">
      <h4>UserId: {post.user_id}</h4>
      <p>{post.id}:{post.content}</p>
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