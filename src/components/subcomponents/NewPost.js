import { useState } from 'react'

function NewPost(props) {

  const [post, setPost] = useState(initPost());

  function initPost() {
    return {
      content: '',
      photo: null
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onNewPost(post);
    setPost(initPost());
  }

  function handleChange(e) {
    if (e.target.type === 'file') {
      setPost({...post, [e.target.name]: e.target.files[0]});
    } else {
      setPost({...post, [e.target.name]: e.target.value});
    }
  }

  function removePhoto(e) {
    e.preventDefault();
    setPost({...post, photo: null});
  }

  return (
    <article id="new-post">
      <form>
        <textarea
          className='content'
          name='content'
          value={post.content}
          placeholder='Add a new Post here...'
          onChange={handleChange}>
        </textarea>
        <div className='file-upload'>
          <label className='icon-button'>
            <i className="far fa-file-image"></i>
            <input
              type='file'
              name='photo'
              onChange={handleChange}/>
          </label>
          <button 
            className='icon-button'
            onClick={removePhoto}>
            <i className="far fa-trash-alt"></i>
          </button>
          <span>{post.photo ? post.photo.name : 'No File Selected'}</span>
        </div>
        <input 
          type='submit' 
          className='button'
          value='Post'
          onClick={handleSubmit}/>
      </form>
    </article>
  );
}

export default NewPost;