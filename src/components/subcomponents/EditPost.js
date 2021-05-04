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
      props.onEditPost(alteredEdit);
    } else {
      props.onEditPost(edit);
    }
  }

  function handleChange(e) {
    if (e.target.type === 'file') {
      setEdit({...edit, [e.target.name]: e.target.files[0]});
    } else {
      setEdit({...edit, [e.target.name]: e.target.value});
    } console.log(edit)
  }

  function removePhoto(e) {
    e.preventDefault();
    setEdit({...edit, photo: null});
  }

  function getPhotoName() {
    if (edit.photo === null) {
      return 'No File Selected';
    } else {
      return edit.photo.name ? edit.photo.name : 'Current Photo';
    }
  } 

  return (
    <article className="edit-post">
      <form>
        <textarea
          className='content'
          name='content'
          value={edit.content}
          onChange={handleChange}>
        </textarea>
        <div className='file-upload'>
          <label><i className="far fa-file-image"></i>
            <input
              type='file'
              name='photo'
              onChange={handleChange}/>
          </label>
          <button onClick={removePhoto}>
            <i className="far fa-trash-alt"></i>
          </button>
          <span>{getPhotoName()}</span>
        </div>
        <input 
          type='submit' 
          value='Post'
          onClick={handleSubmit}/>
      </form>
  </article>
  );
}

export default EditPost;
