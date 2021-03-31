import NewPost from '../subcomponents/NewPost'
import Post from '../subcomponents/Post'

function Messages() {
  return (
    <div id="messages">
      Messages
      <NewPost/>
      <Post/>
      <Post/>
    </div>
  );
}

export default Messages;