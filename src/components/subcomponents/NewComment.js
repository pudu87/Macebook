import { useState } from 'react'

function NewComment(props) {

  const [comment, setComment] = useState(initComment());

  function initComment() {
    return { content: '' };
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onNewComment(comment);
    setComment(initComment());
  }

  function handleChange(e) {
    setComment({...comment, [e.target.name]: e.target.value});
  }

  const title = props.parent === 'Post' ? 'Comment' : 'Reply'

  return (
    <div className="new-comment">
      New {title}
      <form onSubmit={handleSubmit}>
        <input 
          type='textarea' 
          className='content'
          name='content'
          value={comment.content}
          onChange={handleChange}
          placeholder={`Add a new ${title} here...`}/>
        <input 
          type='submit' 
          value={title}/>
      </form>
    </div>
  );
}

export default NewComment;
