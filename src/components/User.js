import { useState, useEffect, useCallback } from 'react'
import { Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom"
import { getFullName, getAvatarUrl } from "./helpers/General";
import { fetchApi } from './helpers/Fetching';
import isEqual from 'lodash/isEqual'
import Messages from './user/Messages'
import Profile from './user/Profile'
import Friends from './user/Friends'

function User() {

  let { path, url } = useRouteMatch();
  path = path.replace(/\/$/, '');
  url = url.replace(/\/$/, '');

  const { userId } = useParams();
  const [header, setHeader] = useState({
    first_name: '',
    last_name: '',
    avatar: null
  });
  const [userStatus, setUserStatus] = useState({
    id: userId,
    currentUserId: null,
    isCurrentUser: false,
    isFriend: true
  });

  const initHeader = useCallback(async () => {
    const path = '/users/' + userId;
    const result = await fetchApi(path, 'GET')
    setHeader(result.data.profile);
    setUserStatus({
      id: result.data.id,
      currentUserId: result.current_user_id,
      isCurrentUser: result.is_current_user,
      isFriend: result.is_friend
    });
  }, [userId]);

  useEffect(() => {
    initHeader();
  }, [initHeader]);

  function updateHeader(newHeader) {
    if (!isEqual(header, newHeader)) { setHeader(newHeader) }
  }

  const headerTag = (
    <header id='user-header'>
      <h2>{getFullName(header)}</h2>
      <div 
        className='avatar'
        style={{ backgroundImage: getAvatarUrl(header.avatar) }}>
      </div>
    </header>
  );

  return (
    <div id="user">
      {headerTag}
      <ul id='user-links'>
        <li>
          <Link to={`${url}/`}>Messages</Link>
        </li>
        <li>
          <Link to={`${url}/profile`}>Profile</Link>
        </li>
        <li>
          <Link to={`${url}/friends`}>Friends</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path={path} render={() => (
          <Messages userStatus={userStatus}/>
        )}/>
        <Route exact path={`${path}/profile`} render={() => (
          <Profile userStatus={userStatus} onProfileUpdate={updateHeader}/>
        )}/>
        <Route exact path={`${path}/friends`} render={() => (
          <Friends userStatus={userStatus}/>
        )}/>
      </Switch>
    </div>
  );
}

export default User;