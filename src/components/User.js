import { useState, useEffect, useCallback } from 'react'
import { Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom"
import { API_URL } from '../Constants'
import isEqual from 'lodash/isEqual'
import Messages from './user/Messages'
import Profile from './user/Profile'
import Friends from './user/Friends'

function User() {

  let { path, url } = useRouteMatch();
  path = path.replace(/\/$/, '');
  url = url.replace(/\/$/, '');

  const { userId } = useParams();
  const [header, setHeader] = useState('');

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
    const newHeader = await response.json();
    setHeader(newHeader);
  }, [userId]);

  useEffect(() => {
    initHeader();
  }, [initHeader]);

  function updateHeader(newHeader) {
    if (!isEqual(header, newHeader)) { setHeader(newHeader) }
  }

  function getUserName() {
    return header.first_name + ' ' + header.last_name;
  }

  return (
    <div id="user">
      {getUserName()}
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
          <Messages userId={userId}/>
        )}/>
        <Route exact path={`${path}/profile`} render={() => (
          <Profile userId={userId} onProfileUpdate={updateHeader}/>
        )}/>
        <Route exact path={`${path}/friends`} render={() => (
          <Friends userId={userId}/>
        )}/>
      </Switch>
    </div>
  );
}

export default User;