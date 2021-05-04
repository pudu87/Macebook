import { useCallback, useEffect, useState } from 'react'
import { fetchApi } from '../helpers/Fetching'
import NewPost from '../subcomponents/NewPost'
import Post from '../subcomponents/Post'

function Messages(props) {

  const userStatus = props.userStatus;
  const [posts, setPosts] = useState([]);

  const initPosts = useCallback(async () => {
    const path = userStatus.id ? '/posts/' + userStatus.id : '/posts';
    const newPosts = await fetchApi(path, 'GET');
    setPosts(newPosts);
  }, [userStatus]);

  useEffect(() => {
    initPosts();
  }, [initPosts]);

  async function handleNewPost(post) {
    const newPost = await fetchApi('/posts', 'POST', post);
    setPosts([newPost, ...posts]);
  }

  async function handleEditPost(post, id) {
    const path = '/posts/' + id;
    const edit = await fetchApi(path, 'PUT', post);
    setPosts(posts.map(post => post.id === edit.id ? edit : post));
  }

  async function handleDeletePost(id) {
    const path = '/posts/' + id;
    await fetchApi(path, 'DELETE');
    setPosts(posts.filter(post => post.id !== id));
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

  const newPost = userStatus.isCurrentUser &&
    <NewPost onNewPost={handleNewPost}/>;

  const noFriend = !userStatus.isFriend && !userStatus.isCurrentUser &&
    <div>Befriend this user if you want to see more</div>;

  const postList = posts.map((post, index) => {
    return <div key={post.id}>
      {(index !== 0 || userStatus.isCurrentUser) && <hr/>}
      <Post 
        post={post}
        currentUserId={userStatus.currentUserId}
        onUpdateCommentCounter={handleUpdateCommentCounter}
        onUpdateLikeCounter={handleUpdateLikeCounter}
        onEditPost={handleEditPost}
        onDeletePost={handleDeletePost}/>
      </div>
  });

  return (
    <div id="messages">
      {newPost}
      {noFriend}
      {postList}
    </div>
  );
}

export default Messages;
