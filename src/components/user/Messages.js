import { useCallback, useEffect, useState } from 'react'
import { fetchNewPost, editPost, deletePost } from '../logic/Helpers'
import { API_URL } from '../../Constants'
import NewPost from '../subcomponents/NewPost'
import Post from '../subcomponents/Post'

function Messages(props) {

  const userStatus = props.userStatus;
  const [posts, setPosts] = useState([]);

  const initPosts = useCallback(async () => {
    const path = userStatus.id ? '/posts/' + userStatus.id : '/posts';
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
  }, [userStatus]);

  useEffect(() => {
    initPosts();
  }, [initPosts]);

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
    const newPost = await fetchNewPost(post);
    setPosts([newPost, ...posts]);
  }

  const newPost = userStatus.isCurrentUser &&
    <NewPost handleNewPost={handleNewPost}/>;

  const noFriend = !userStatus.isFriend && !userStatus.isCurrentUser &&
    <div>Befriend this user if you want to see more</div>;

  const postList = posts.map(post => {
    return <Post 
      key={post.id} 
      post={post}
      currentUserId={userStatus.currentUserId}
      onUpdateCommentCounter={handleUpdateCommentCounter}
      onUpdateLikeCounter={handleUpdateLikeCounter}
      onEditPost={handleEditPost}
      onDeletePost={handleDeletePost}/>
  });

  return (
    <div id="messages">
      Messages
      {newPost}
      {noFriend}
      {postList}
    </div>
  );
}

export default Messages;
