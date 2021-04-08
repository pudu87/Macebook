import { useState } from 'react'

function NewComment(props) {

  const [comment, setComment] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    props.handleNewComment(comment);
  }

  function handleChange(e) {
    setComment(e.target.value);
  }

  return (
    <div className="newcomment">
      New Comment
      <form onSubmit={handleSubmit}>
        <input 
          type='textarea' 
          className='content'
          value={comment}
          onChange={handleChange}
          placeholder='Add a new comment here...'/>
        <input 
          type='submit' 
          value='Comment'/>
      </form>
    </div>
  );
}

export default NewComment;