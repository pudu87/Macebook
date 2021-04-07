import { useState, useEffect } from 'react'
import { Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom"
import { API_URL } from '../Constants'
import Messages from './user/Messages'
import Profile from './user/Profile'
import Friends from './user/Friends'

function User() {

  let { path, url } = useRouteMatch();
  path = path.replace(/\/$/, '');
  url = url.replace(/\/$/, '');

  const { user_id } = useParams();
  const [userName, setUserName] = useState('');
  
  useEffect(() => {
    initUserName();
  }, [])

  async function initUserName() {
    const path = '/users/' + user_id;
    const requestOptions = {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    }
    const response = await fetch(API_URL + path, requestOptions);
    const name = await response.json();
    setUserName(name.first_name + ' ' + name.last_name)
  }

  return (
    <div id="user">
      {userName}
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
          <Messages userId={user_id}/>
        )}/>
        <Route exact path={`${path}/profile`} render={() => (
          <Profile userId={user_id}/>
        )}/>
        <Route exact path={`${path}/friends`} render={() => (
          <Friends userId={user_id}/>
        )}/>
      </Switch>
    </div>
  );
}

export default User;