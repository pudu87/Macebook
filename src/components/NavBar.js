import { Link } from "react-router-dom"

function NavBar() {
  return (
    <div id="navbar">
      Navbar
      <Link to={'/'}>Home</Link>
      <Link to={'/login'}>LogIn</Link>
      <Link to={'/signup'}>SignUp</Link>
      <Link to={'/logout'}>LogOut</Link>
    </div>
  );
}

export default NavBar;