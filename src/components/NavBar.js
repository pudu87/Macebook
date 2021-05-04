import { Link } from "react-router-dom"
import { API_URL } from '../Constants'
import Mace from '../images/mace.png'

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

  const logo = (
    <div 
      className='logo'
      style={{ backgroundImage: `url(${Mace})` }}>
    </div>
  );

  return (
    <div id="navbar">
      <header>
        <h1 className='macebook'>Macebook</h1>
        {logo}
        <p>a Very Medieval Social Network</p>
      </header>
      <nav>
        <Link to={'/'}>Home</Link>
        <Link to={'/login'}>LogIn</Link>
        <Link to={'/signup'}>SignUp</Link>
        <Link to={'/login'} onClick={handleLogout}>LogOut</Link>
      </nav>
    </div>
  );
}

export default NavBar;