import { useCallback, useEffect, useState } from 'react'
import { getNewPostRequestOptions } from '../logic/Helpers'
import { API_URL } from '../../Constants'
import NewPost from '../subcomponents/NewPost'
import Post from '../subcomponents/Post'

function Messages(props) {
  const userStatus = props.userStatus;
  const [posts, setPosts] = useState([]);

  const initPosts = useCallback(async () => {
    const path = '/posts/' + userStatus.id;
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

  async function handleNewPost(content) {
    const requestOptions = getNewPostRequestOptions(content);
    const response = await fetch(API_URL + '/posts', requestOptions);
    const newPost = await response.json();
    setPosts([newPost, ...posts]);
  }

  const newPost = userStatus.isCurrentUser &&
    <NewPost handleNewPost={handleNewPost}/>;

  const noFriend = !userStatus.isFriend && 
    !userStatus.isCurrentUser &&
    <div>Befriend this user if you want to see more</div>;

  const postList = posts.map(post => {
    return <Post key={post.id} post={post}/>
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