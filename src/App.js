import './App.scss';
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { fetchApi } from './components/helpers/Fetching';
import NavBar from "./components/NavBar"
import LogIn from "./components/LogIn"
import SignUp from "./components/SignUp"
import DashBoard from "./components/DashBoard"
import User from "./components/User"
import PrivateRoute from "./components/PrivateRoute"

function App() {

  const [currentUserId, setCurrentUserId] = useState(false);

  async function initAuthorization() {
    const path = '/users/' + 0;
    const id = await fetchApi(path, 'GET');
    if (id) setCurrentUserId(id);
  }

  useEffect(() => {
    initAuthorization();
  },[currentUserId]);

  async function handleLogin() {
    await initAuthorization();
  }

  function handleLogout() {
    setCurrentUserId(false);
  }

  const footer = (
    <footer>
      <span>Created by pudu</span>
      <a href='https://github.com/pudu87'>
        <i className="fab fa-github"></i>
      </a>
    </footer>
  )

  return (
    <div id="App">
      <Router>
        <NavBar 
          onLogout={handleLogout}
          userId={currentUserId}/>
        <Switch>
          <Route path='/login'>
            <LogIn onLogin={handleLogin}/>
          </Route>
          <Route path='/signup'>
            <SignUp onSignup={handleLogin}/>
          </Route>
          <PrivateRoute 
            exact path='/'
            currentUserId={currentUserId} 
            component={DashBoard}/>
          <PrivateRoute 
            path='/:userId' 
            currentUserId={currentUserId} 
            component={User}/>
        </Switch>
      </Router>
      {footer}
    </div>
  );
}

export default App;
