import { Link } from 'react-router-dom'
import { getFullName } from '../logic/Helpers'

function Comment(props) {

  const comment = props.comment;

  return (
    <li className="comment">
      <Link to={`/${comment.user_id}`}>{getFullName(comment.profile)}</Link>
      <p>{comment.content}</p>
      <ul>
        <li>Date: {comment.created_at}</li>
      </ul>
    </li>
  );
}

export default Comment;