import React, { useState } from 'react';
import { Navbar, Nav, Button, Image } from 'react-bootstrap';
import './Header.css';
import { logout } from '../../firebaseAuth';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Header = ({user}) => {
  const [activeButton, setActiveButton] = useState('Home');

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <Navbar bg="white" expand="lg" className="p-3">
      <Navbar.Toggle aria-controls="navbarNav" />

      {/* Left Side - Buttons with Conditional Active Styling */}
      <NavLink to={'/'} className="nav-link">
      <Button
        variant="outline-secondary"
        className=" custom-btn"
        onClick={() => handleButtonClick('Home')}
      >
        Home
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
      <NavLink to={'/about'} className="nav-link">
      <Button
        variant="outline-secondary"
        className="me-3 custom-btn"
        onClick={() => handleButtonClick('About')}
      >
        About
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
