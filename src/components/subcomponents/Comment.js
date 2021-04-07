import { getFullName } from '../logic/Helpers'

function Comment(props) {

  const comment = props.comment;

  return (
    <li className="comment">
      <h5>{getFullName(comment.profile)}</h5>
      <p>{comment.content}</p>
      <ul>
        <li>Date: {comment.created_at}</li>
      </ul>
    </li>
  );
}

export default Comment;