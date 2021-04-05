import { useState } from 'react'
import { API_URL } from '../Constants'

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function changeEmail(e) {
    setEmail(e.target.value);
  }

  function changePassword(e) {
    setPassword(e.target.value);
  }

  function handleLogin(e) {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: { email: email, password: password }})
    }
    fetch(API_URL + '/login', requestOptions)
      .then(response => {
        if (response.ok) {
          console.log(response.headers.get('Authorization'));
          localStorage.setItem('token', response.headers.get('Authorization'));
          return response.json();
        }
      })
      .then(json => console.dir(json))
      .catch(err => console.error(err))
  }

  return (
    <div id="login">
      <form onSubmit={handleLogin}>
        <label htmlFor='email'>Email:</label>
        <input 
          type='email' 
          id='email' 
          name='email'
          value={email} 
          onChange={changeEmail}/>
        <label htmlFor='password'>Password:</label>
        <input 
          type='password' 
          id='password' 
          name='password'
          value={password} 
          onChange={changePassword}/>
        <input 
          type='submit' 
          value='Confirm'/>
      </form>
    </div>
  );
}

export default Login;