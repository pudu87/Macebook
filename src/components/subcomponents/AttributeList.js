import ReactTimeAgo from 'react-time-ago'

function AttributeList(props) {

  const { parent, likesCount, commentsCount, date } = props;

  return (
    <ul className='attributes'>
      <li className='likes-counter'>
        <span>
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
