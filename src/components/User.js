import { Switch, Route, Link, useRouteMatch } from "react-router-dom"
import Messages from './user/Messages'
import Profile from './user/Profile'
import Friends from './user/Friends'

function User() {

  let { path, url } = useRouteMatch();
  path = path.replace(/\/$/, '');
  url = url.replace(/\/$/, '');

  return (
    <div id="user">
      User
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
        <Route exact path={path}>
          <Messages/>
        </Route>
        <Route path={`${path}/profile`}>
          <Profile/>
        </Route>
        <Route path={`${path}/friends`}>
          <Friends/>
        </Route>
      </Switch>
    </div>
  );
}

export default User;