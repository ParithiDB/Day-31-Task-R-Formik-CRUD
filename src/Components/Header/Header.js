import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

export default function Header() {
    return (
        <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <h3 className='m-0'>Dashboard</h3>
          </Navbar.Brand>
         
      

      <Nav className="justify-content-end">
        <Nav.Item>
          <Nav.Link>
             <NavLink to='/' className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "link active-link" : "link"}>Books</NavLink>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link>
            <NavLink to='/authors' className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "link active-link" : "link"}>
                Authors
              </NavLink>
          </Nav.Link>
        </Nav.Item>
      </Nav>
        </Container>
      </Navbar>
    );
}
