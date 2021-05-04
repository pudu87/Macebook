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
      <form onSubmit={handleSubmit}>
        <textarea
          className='content'
          name='content'
          value={comment.content}
          placeholder={`Add a new ${title} here...`}
          onChange={handleChange}>
        </textarea>
        <div>
          <input 
            type='submit' 
            value={title}/>
        </div>
      </form>
    </div>
  );
}

export default NewComment;
