import { useEffect, useState } from 'react'
import { API_URL } from '../../Constants'
import NewPost from '../subcomponents/NewPost'
import Post from '../subcomponents/Post'

function Messages(props) {

  const userId = props.userId;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    initPosts();
  }, [])

  async function initPosts() {
    const path = '/posts/' + userId;
    const requestOptions = {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    }
    const response = await fetch(API_URL + path, requestOptions);
    const newPosts = await response.json();
    setPosts(newPosts);
  }

  const postList = posts.map(post => {
    return <Post key={post.id} post={post}/>
  });

  return (
    <div id="messages">
      Messages
      <NewPost/>
      {postList}
    </div>
  );
}

export default Messages;