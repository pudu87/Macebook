import { useState } from 'react'
import { Link, useHistory } from "react-router-dom"
import { API_URL } from '../Constants'

function Login(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  function changeEmail(e) {
    setEmail(e.target.value);
  }

  function changePassword(e) {
    setPassword(e.target.value);
  }

  async function handleLogin(e) {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: { email: email, password: password }})
    }
    try {
      const response = await fetch(API_URL + '/login', requestOptions);
      if (response.ok) {
        localStorage.setItem('token', response.headers.get('Authorization'));
        await props.onLogin();
        const json = await response.json();
        history.push('/');
        console.dir(json);
      }
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <div id="login">
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor='email'>Email:</label>
          <input 
            type='email' 
            id='email' 
            name='email'
            value={email} 
            onChange={changeEmail}/>
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input 
            type='password' 
            id='password' 
            name='password'
            value={password} 
            onChange={changePassword}/>
        </div>
        <input 
          type='submit' 
          className='button'
          value='Log In'/>
      </form>
      <Link to={'/signup'}>No account yet? Sign up here.</Link>
    </div>
  );
}

export default Login;