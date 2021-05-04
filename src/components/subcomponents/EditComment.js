import { useState } from 'react'

function EditComment(props) {

  const comment = props.comment

  const [edit, setEdit] = useState({
    content: comment.content
  });

  function handleSubmit(e) {
    e.preventDefault();
    props.onEditComment(edit, comment.id);
  }

  function handleChange(e) {
    setEdit({...edit, [e.target.name]: e.target.value});
  }

  return (
    <div className="edit-comment">
      <form>
        <textarea
          className='content'
          name='content'
          value={edit.content}
          onChange={handleChange}>
        </textarea>
        <div>
          <input 
            type='submit' 
            value='Edit'
            onClick={handleSubmit}/>
        </div>
      </form>
    </div>
  );
}

export default EditComment;
