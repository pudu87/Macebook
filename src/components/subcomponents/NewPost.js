import { useState } from 'react'

function NewPost(props) {

  const [post, setPost] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    props.handleNewPost(post);
  }

  function handleChange(e) {
    setPost(e.target.value);
  }

  return (
    <div id="newpost">
      New Post
      <form onSubmit={handleSubmit}>
        <input 
          type='textarea' 
          className='content'
          value={post}
          onChange={handleChange}
          placeholder='Add a new post here...'/>
        <input 
          type='submit' 
          value='Post'/>
      </form>
    </div>
  );
}

export default NewPost;