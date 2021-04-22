import { useState } from 'react'

function EditComment(props) {

  const comment = props.comment

  const [edit, setEdit] = useState({
    content: comment.content
  });

  function handleSubmit(e) {
    e.preventDefault();
    props.handleEditComment(edit);
  }

  function handleChange(e) {
    setEdit({...edit, [e.target.name]: e.target.value});
  }

  return (
    <div className="edit-comment">
      Edit Comment
      <form>
        <input 
          type='textarea' 
          className='content'
          name='content'
          value={edit.content}
          onChange={handleChange}/>
        <input 
          type='submit' 
          value='Edit'
          onClick={handleSubmit}/>
      </form>
    </div>
  );
}

export default EditComment;
