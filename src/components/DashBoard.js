import { useEffect, useState } from 'react'
import { fetchNewPost } from './logic/Helpers'
import { API_URL } from '../Constants'
import NewPost from './subcomponents/NewPost'
import Post from './subcomponents/Post'

function DashBoard() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    initPosts();
  }, []);

  async function initPosts() {
    const requestOptions = {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    }
    const response = await fetch(API_URL + '/posts', requestOptions);
    const newPosts = await response.json();
    setPosts(newPosts);
  }

  async function handleNewPost(post) {
    const newPost = await fetchNewPost(post)
    setPosts([newPost, ...posts]);
  }

  const postList = posts.map(post => {
    return <Post key={post.id} post={post}/>
  });

  return (
    <div id="dashboard">
      DashBoard
      <NewPost handleNewPost={handleNewPost}/>
      {postList}
    </div>
  );
}

export default DashBoard;