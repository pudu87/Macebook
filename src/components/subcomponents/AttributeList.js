import { useState, useRef, useEffect } from 'react'
import { fetchApi } from '../helpers/Fetching'
import { getFullName } from '../helpers/General';
import ReactTimeAgo from 'react-time-ago'

function AttributeList(props) {

  const { id, entity, parent, likesCount, commentsCount, date } = props;
  const [likes, setLikes] = useState([]);
  const [likesChanged, setLikesChanged] = useState(true);
  const [showLikes, setShowLikes] = useState(false);
  const content = useRef(null);

  useEffect(() => {
    showLikes ?
      document.addEventListener('mousedown', handleClickOutside) :
      document.removeEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showLikes]);

  useEffect(() => {
    setLikesChanged(true);
  }, [likesCount]);

  async function displayLikes() {
    if (likesChanged) {
      const prefix = entity === 'post' ? 'P' : 'C';
      const path = '/likes/' + prefix + id;
      const newLikes = await fetchApi(path, 'GET');
      setLikes(newLikes);
    }
    setShowLikes(true);
  }

  function handleClickOutside(e) {
    if (!(content.current && content.current.contains(e.target))) {
      setShowLikes(false);
    }
  }

  const likeList = likes.map(like => {
    return <li key={like.user_id}>{getFullName(like.profile)}</li>
  });

  const likesBox = (
    <div>
      <div className='overlay'></div>
      <div className='likes'>
        <i className="fas fa-window-close hide"></i>
        <div ref={content}>
          <i className='far fa-thumbs-up'></i>
          <ul>{likeList}</ul>
        </div>
      </div>
    </div>
  );

  return (
    <ul className='attributes'>
      {showLikes && (likes.length > 0) && likesBox}
      <li className='likes-counter'>
        <span onClick={displayLikes}>
          <i className='far fa-thumbs-up'></i> {likesCount}
        </span>
      </li>
      {parent !== 'Comment' &&
        <li className='comments-counter'>
          <span onClick={commentsCount > 0 ? props.onShowChildren : undefined}>
            <i className="far fa-comment"></i> {commentsCount}
          </span>
        </li>}
      <li className='date'>
        <ReactTimeAgo date={new Date(date)}/>
      </li>
    </ul>
  )
}

export default AttributeList;
