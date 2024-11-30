import React, { useState } from 'react';
import { Navbar, Nav, Button, Image } from 'react-bootstrap';
import './Header.css';
import { logout } from '../../firebaseAuth';
import { Link } from 'react-router-dom';

const Header = ({user}) => {
  const [activeButton, setActiveButton] = useState('Home');

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <Navbar bg="white" expand="lg" className="p-3">
      <Navbar.Toggle aria-controls="navbarNav" />

      {/* Left Side - Buttons with Conditional Active Styling */}
      <Button
        variant="outline-secondary"
        className={`me-3 custom-btn ${activeButton === 'Home' ? 'active' : ''}`}
        onClick={() => handleButtonClick('Home')}
      >
        Home
      </Button>
      <Link to='/crateblog'>
      <Button
        variant="outline-secondary"
        className={`me-3 custom-btn ${activeButton === 'Create' ? 'active' : ''}`}
        onClick={() => handleButtonClick('Create')}
      >
        Create
      </Button>
      </Link>
      <Button
        variant="outline-secondary"
        className={`me-3 custom-btn ${activeButton === 'About' ? 'active' : ''}`}
        onClick={() => handleButtonClick('About')}
      >
        About
      </Button>

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
