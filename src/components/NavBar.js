import { Link } from "react-router-dom"
import { API_URL } from '../Constants'

function NavBar() {

  function handleLogout() {
    const requestOptions = {
      method: 'DELETE',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    }
    fetch(API_URL + '/logout', requestOptions) 
      .then(response => {
        if(response.ok) {
          return response.json()
        } else {
          return response.json().then(json => Promise.reject(json))
        }
      })
      .then(json => {
        console.dir(json)
      })
      .catch(err => console.error(err))
  }

  return (
    <div id="navbar">
      Navbar
      <Link to={'/'}>Home</Link>
      <Link to={'/login'}>LogIn</Link>
      <Link to={'/signup'}>SignUp</Link>
      <Link to={'/login'} onClick={handleLogout}>LogOut</Link>
    </div>
  );
}

export default NavBar;