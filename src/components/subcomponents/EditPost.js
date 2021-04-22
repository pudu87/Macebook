import { useState } from 'react'

function EditPost(props) {

  const post = props.post

  const [edit, setEdit] = useState({
    content: post.content,
    photo: post.photo
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (typeof edit.photo === 'string') { 
      const { photo, ...alteredEdit } = edit;
      props.handleEditPost(alteredEdit);
    } else {
      props.handleEditPost(edit);
    }
  }

  function handleChange(e) {
    if (e.target.type === 'file') {
      setEdit({...edit, [e.target.name]: e.target.files[0]});
    } else {
      setEdit({...edit, [e.target.name]: e.target.value});
    }
  }

  function removePhoto(e) {
    e.preventDefault();
    setEdit({...edit, photo: null});
  }

  return (
    <div className="edit-post">
      Edit Post
      <form>
        <input 
          type='textarea' 
          className='content'
          name='content'
          value={edit.content}
          onChange={handleChange}/>
        <label>Change photo: 
          <input
            type='file'
            name='photo'
            onChange={handleChange}/>
            <button onClick={removePhoto}>Remove photo</button>
        </label>
        <input 
          type='submit' 
          value='Edit'
          onClick={handleSubmit}/>
      </form>
    </div>
  );
}

export default EditPost;
