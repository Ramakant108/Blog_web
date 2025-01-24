
import { Navbar, Nav, Button, Image } from 'react-bootstrap';
import './Header.css';
import { logout } from '../../firebaseAuth';
import { NavLink } from 'react-router-dom';

const Header = ({user ,setActive}) => {
 

  const handleButtonClick = (buttonName) => {
    setActive(buttonName);
  };

  return (
    <Navbar bg="white" expand="lg" className="p-3">
      <Navbar.Toggle aria-controls="navbarNav" />

      {/* Left Side - Buttons with Conditional Active Styling */}
      <NavLink to={'/'} className="nav-link" onClick={() => handleButtonClick('home')}>
      <Button
        variant="outline-secondary"
        className=" custom-btn"

      >
        Home
      </Button>
      </NavLink>
     
      <NavLink to={'/blogs'} className="nav-link" >
      <Button
        variant="outline-secondary"
        className=" custom-btn"

      >
        Blog
      </Button>
      </NavLink>
      
      <NavLink to='/createblog' className="nav-link">
      <Button
        variant="outline-secondary"
        className=" custom-btn"
        onClick={() => handleButtonClick('Create')}
      >
        Create
      </Button>
      </NavLink>
      {/* Right Side - Profile Image & Logout */}
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          <Image
            src="https://via.placeholder.com/40"
            roundedCircle
            className="me-3"
            style={{ width: '40px', height: '40px' }}
            data-bs-toggle="tooltip" 
            data-bs-placement="bottom"
            title={user.displayName}
          />
          <Button variant="outline-danger" className="custom-btn"  onClick={()=>logout()}>
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
