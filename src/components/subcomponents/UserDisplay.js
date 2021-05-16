import { Link } from 'react-router-dom'
import { getFullName, getAvatarUrl } from '../helpers/General';

function UserDisplay(props) {
  
  const data = props.data;
  const userId = data.user_id ? data.user_id : data.id;

  return (
    <header className="user-display">
      <div 
        className='avatar'
        style={{ backgroundImage: getAvatarUrl(data.profile.avatar) }}>
      </div>
      <Link 
        to={`/${userId}`}
        className='user-name'>
        {getFullName(data.profile)}
      </Link>
    </header>
  );
}

export default UserDisplay;