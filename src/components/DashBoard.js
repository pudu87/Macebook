import NewPost from './subcomponents/NewPost'
import Post from './subcomponents/Post'
import Comments from './subcomponents/Comments'

function DashBoard() {
  return (
    <div id="dashboard">
      DashBoard
      <NewPost/>
      <Post/>
      <Post/>
    </div>
  );
}

export default DashBoard;