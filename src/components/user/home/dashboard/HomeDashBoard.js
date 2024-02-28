import React from "react";
import {Col, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import {Container} from "react-bootstrap";

function HomeDashBoard() {

    return (
        <Container fluid>
            {/* 상단의 Nav */}
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Your Logo</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Row className="justify-content-center">
                <Col xs={12} md={6} lg={4}>

                    <Card>
                        <Card.Img
                            variant="top"
                            src=
                                "https://media.geeksforgeeks.org/wp-content/cdn-uploads/logo-new-2.svg"
                            alt="GeeksforGeeks Logo"
                        />
                        <Card.Body>
                            <Card.Title>JavaScript</Card.Title>
                            <Card.Text>
                                JavaScript is a lightweight, cross-platform,
                                single-threaded, and interpreted compiled
                                programming language. It is also known as
                                the scripting language for webpages. It
                                is well-known for the development of web
                                pages, and many non-browser environments also
                                use it.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={12} md={6} lg={4}>
                    <Card>
                        <Card.Img
                            variant="top"
                            src=
                                "https://media.geeksforgeeks.org/wp-content/cdn-uploads/logo-new-2.svg"
                            alt="GeeksforGeeks Logo"
                        />
                        <Card.Body>
                            <Card.Title>React.js</Card.Title>
                            <Card.Text>
                                JavaScript is a lightweight, cross-platform,
                                single-threaded, and interpreted compiled
                                programming language. It is also known as
                                the scripting language for webpages. It
                                is well-known for the development of web
                                pages, and many non-browser environments also
                                use it.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default HomeDashBoard;
