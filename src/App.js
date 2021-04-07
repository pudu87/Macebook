import './App.scss';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import LogIn from "./components/LogIn"
import SignUp from "./components/SignUp"
import DashBoard from "./components/DashBoard"
import User from "./components/User"

function App() {
  return (
    <div id="App">
      <Router>
        <NavBar/>
        <Switch>
          <Route path='/login'>
            <LogIn/>
          </Route>
          <Route path='/signup'>
            <SignUp/>
          </Route>
          <Route exact path='/'>
            <DashBoard/>
          </Route>
          <Route path='/:userId'>
            <User/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
