import { useState } from 'react'

function NewPost(props) {

  const [post, setPost] = useState({
    content: '',
    photo: null
  });

  function handleSubmit(e) {
    e.preventDefault();
    props.handleNewPost(post);
  }

  function handleChange(e) {
    if (e.target.type === 'file') {
      setPost({...post, [e.target.name]: e.target.files[0]})
    } else {
      setPost({...post, [e.target.name]: e.target.value})
    }
  }

  return (
    <div id="newpost">
      New Post
      <form onSubmit={handleSubmit}>
        <input 
          type='textarea' 
          className='content'
          name='content'
          value={post.content}
          onChange={handleChange}
          placeholder='Add a new post here...'/>
        <label>Add a photo: 
          <input
            type='file'
            name='photo'
            onChange={handleChange}/>
        </label>
        <input 
          type='submit' 
          value='Post'/>
      </form>
    </div>
  );
}

export default NewPost;