import { useState } from 'react'
import EditComment from './EditComment'
import UserDisplay from './UserDisplay'

function Comment(props) {

  const { comment, currentUserId } = props;
  const [edit, setEdit] = useState(false);

  function handleEditComment(edit) {
    props.onEditComment(edit, comment.id);
  }

  function handleDeleteComment() {
    props.onDeleteComment(comment.id);
  }

  function toggleEdit() {
    setEdit(!edit);
  }

  const commentForm = (
    <EditComment
      comment={comment} 
      handleEditComment={handleEditComment}/>
  );

  const commentView = (
    <div className='comment-view'>
      <p className='content'>{comment.content}</p>
    </div>
  );

  const optionList = (
    <div className='buttons'>
      {currentUserId === comment.user_id &&
        <button onClick={toggleEdit}>{edit ? 'Undo' : 'Edit'}</button>}
      {currentUserId === comment.user_id &&
        <button onClick={handleDeleteComment}>X</button>}
    </div>
  );

  return (
    <li className="comment">
      <UserDisplay data={comment}/>
      {edit ? commentForm : commentView}
      <ul>
        <li>Date: {comment.created_at}</li>
      </ul>
      {optionList}
    </li>
  );
}

export default Comment;