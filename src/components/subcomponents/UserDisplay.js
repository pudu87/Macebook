import { Link } from 'react-router-dom'
import { getFullName, getAvatarUrl } from '../helpers/General';

function UserDisplay(props) {
  const data = props.data;

  return (
    <article className="user-display">
      <div 
        className='avatar'
        style={{ backgroundImage: getAvatarUrl(data.profile.avatar) }}>
      </div>
      <Link to={`/${data.user_id}`}>{getFullName(data.profile)}</Link>
    </article>
  );
}

export default UserDisplay;