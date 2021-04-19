import { Link } from 'react-router-dom'
import { getFullName } from "../logic/Helpers";

function UserDisplay(props) {
  const data = props.data;

  return (
    <article className="user-display">
      <div 
        className='avatar'
        style={{ backgroundImage: `url(${data.profile.avatar})` }}>
      </div>
      <Link to={`/${data.id}`}>{getFullName(data.profile)}</Link>
    </article>
  );
}

export default UserDisplay;