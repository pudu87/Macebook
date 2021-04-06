function Comment(props) {

  const comment = props.comment;

  return (
    <li className="comment">
      <h5>UserId: {comment.user_id} PostId: {comment.post_id}</h5>
      <p>{comment.content}</p>
      <ul>
        <li>Date: {comment.created_at}</li>
      </ul>
    </li>
  );
}

export default Comment;