import React from 'react';
import {Link} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './barra.css';


export default class Barra extends React.Component {


    render() {
        return (
            <>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{backgroundColor:"white"}}>
                    <Container>
                        <Navbar.Brand><Link className={"link"} to="/">MetaPeNTA</Link></Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link><Link className={"link"} to="/acerca">Acerca </Link></Nav.Link>
                                <NavDropdown  title="Dropdown" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="action3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="action3.2">
                                        Another action
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="action3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="action3.4">
                                        Separated link
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <Nav>
                                <Nav.Link ><Link className={"link"} to={'/contacto'}>Contacto </Link></Nav.Link>
                                <Nav.Link><Link className={"link"} to={'/trial'}>Trial </Link></Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>
        );
    }
}

