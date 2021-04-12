import { Link } from 'react-router-dom'
import { getFullName } from "../logic/Helpers";

function Friend(props) {

  const { userStatus, data, category, onHandleRequest } = props;

  function renderButton() {
    return category.method ?
      <button onClick={handleClick}>{category.text}</button> :
      <div>{category.text}</div>
  }

  function handleClick() {
    onHandleRequest(category.method, data.id);
  }

  return (
    <li className="friend">
      <Link to={`/${data.id}`}>{getFullName(data.profile)}</Link>
      {userStatus.isCurrentUser && renderButton()}
    </li>
  );
}

export default Friend;