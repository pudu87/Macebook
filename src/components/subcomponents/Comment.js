import { Link } from 'react-router-dom'
import UserDisplay from './UserDisplay'

function Comment(props) {

  const comment = props.comment;

  return (
    <li className="comment">
      <UserDisplay data={comment}/>
      <p>{comment.content}</p>
      <ul>
        <li>Date: {comment.created_at}</li>
      </ul>
    </li>
  );
}

export default Comment;