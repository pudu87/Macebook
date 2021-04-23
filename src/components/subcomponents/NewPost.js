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
    props.handleNewPost(post);
    setPost(initPost());
  }

  function handleChange(e) {
    if (e.target.type === 'file') {
      setPost({...post, [e.target.name]: e.target.files[0]})
    } else {
      setPost({...post, [e.target.name]: e.target.value})
    }
  }

  function removePhoto(e) {
    e.preventDefault();
    setPost({...post, photo: null});
  }

  return (
    <div id="newpost">
      New Post
      <form>
        <input 
          type='textarea' 
          className='content'
          name='content'
          value={post.content}
          onChange={handleChange}/>
        <label>Add photo: 
          <input
            type='file'
            name='photo'
            onChange={handleChange}/>
            <button onClick={removePhoto}>Remove photo</button>
        </label>
        <input 
          type='submit' 
          value='Post'
          onClick={handleSubmit}/>
      </form>
    </div>
  );
}

export default NewPost;