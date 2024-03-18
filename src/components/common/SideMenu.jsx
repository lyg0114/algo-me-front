import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ListIcon from "../assets/svg/ListIcon";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HomeIcon from "../assets/svg/HomeIcon";
import {NavLink} from "react-router-dom";


const offcanvasStyle = {
    width: '250px',
    background: '#0f0f0f',
};
const textStyle = {color: '#bfbfbf'};

function SideMenu() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let linkStyle = {textDecoration: 'none'};
    return (
        <>
            <Row>
                <Col xs={4} sm={3} md={3} lg={3} xl={2} xxl={2}>
                    <Button variant="primary" onClick={handleShow} className="me-2 bg-black border-black">
                        <ListIcon style={{width: '25px', height: '25px', color: '#bfbfbf'}}/>
                    </Button>
                    <Offcanvas style={offcanvasStyle} className="" show={show} onHide={handleClose} placement={'start'}>
                        <Offcanvas.Header closeButton className='mb-3'>
                            <Offcanvas.Title style={textStyle}>ALGO-MI</Offcanvas.Title>
                        </Offcanvas.Header>

                        <Offcanvas.Body>
                            {/*  LINK  */}
                            <NavLink style={linkStyle} to="/main" as={NavLink}>
                                <Row className='mb-2'>
                                    <Col xs={3}>
                                        <HomeIcon style={{width: '20px', height: '20px', color: '#bfbfbf'}}/>
                                    </Col>
                                    <Col xs={9} style={textStyle}> HOME </Col>
                                </Row>
                            </NavLink>
                        </Offcanvas.Body>
                    </Offcanvas>
                </Col>
                <Col className='d-none d-sm-block' xs={8} sm={9} md={9} lg={9} xl={10} xxl={10}>
                    <div style={{color: '#bfbfbf', marginTop: '8px'}}>ALGO-MI</div>
                </Col>
            </Row>
        </>
    );
}

export default SideMenu;
