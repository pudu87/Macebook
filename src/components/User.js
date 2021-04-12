import { useState, useEffect, useCallback } from 'react'
import { Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom"
import { API_URL } from '../Constants'
import { getFullName } from "./logic/Helpers";
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
    last_name: ''
  });
  const [userStatus, setUserStatus] = useState({
    id: userId,
    isFriend: true,
    isCurrentUser: false
  });

  const initHeader = useCallback(async () => {
    const path = '/users/' + userId;
    const requestOptions = {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    }
    const response = await fetch(API_URL + path, requestOptions);
    const result = await response.json();
    console.log(result)
    setHeader(result.data.profile);
    setUserStatus({
      id: result.data.id,
      isFriend: result.is_friend,
      isCurrentUser: result.is_current_user
    })
  }, [userId]);

  useEffect(() => {
    initHeader();
  }, [initHeader]);

  function updateHeader(newHeader) {
    if (!isEqual(header, newHeader)) { setHeader(newHeader) }
  }

  return (
    <div id="user">
      {getFullName(header)}
      <ul>
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