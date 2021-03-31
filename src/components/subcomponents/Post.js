import Comments from './Comments'
import NewComment from './NewComment'

function Post() {
  return (
    <div className="post">
      Post
      <Comments/>
      <NewComment/>
    </div>
  );
}

export default Post;