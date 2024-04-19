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

                            </Nav>
                            <Nav>
                                <Nav.Link><Link className={"link"} to={'/trial'}>Trial </Link></Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>
        );
    }
}

