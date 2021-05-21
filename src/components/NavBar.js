import { Link } from "react-router-dom"
import { API_URL } from '../Constants'
import Mace from '../images/mace.png'

function NavBar(props) {

  const userId = props.userId;

  async function handleLogout() {
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
          props.onLogout();
          return response.json();
        } else {
          return response.json().then(json => Promise.reject(json));
        }
      })
      .then(json => console.dir(json))
      .catch(err => console.error(err));
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
        <div><Link to={'/'}>Home</Link></div>
        <div><Link to={'/' + userId}>My Page</Link></div>
        <div>
          <Link to={'/login'} onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;