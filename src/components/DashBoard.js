import { useEffect, useState } from 'react'
import { fetchNewPost, editPost, deletePost } from './logic/Helpers'
import { API_URL } from '../Constants'
import NewPost from './subcomponents/NewPost'
import Post from './subcomponents/Post'

function DashBoard() {

  const [posts, setPosts] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

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
    const result = await response.json();
    setPosts(result.posts);
    setCurrentUserId(result.current_user_id);
  }

  function handleUpdateCommentCounter(id, value) {
    setPosts(posts.map(post => {
      return post.id === id ?
        { ...post, comments_count: post.comments_count + value } : post;
    }));
  }

  function handleUpdateLikeCounter(postId, likeId) {
    const value = likeId ? 1 : -1;
    setPosts(posts.map(post => {
      return post.id === postId ? 
        { ...post, like_id: likeId, likes_count: post.likes_count + value } : post;
      }));
  }

  async function handleEditPost(post, id) {
    const edit = await editPost(post, id);
    setPosts(posts.map(post => post.id === edit.id ? edit : post));
  }

  async function handleDeletePost(id) {
    await deletePost(id);
    const newPosts = posts.filter(post => post.id !== id);
    setPosts(newPosts);
  }

  async function handleNewPost(post) {
    const newPost = await fetchNewPost(post)
    setPosts([newPost, ...posts]);
  }

  const postList = posts.map(post => {
    return <Post 
      key={post.id} 
      post={post}
      currentUserId={currentUserId}
      onUpdateCommentCounter={handleUpdateCommentCounter}
      onUpdateLikeCounter={handleUpdateLikeCounter}
      onEditPost={handleEditPost}
      onDeletePost={handleDeletePost}/>
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