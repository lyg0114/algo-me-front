import React from "react";
import {Container} from "react-bootstrap";


function CommonLayout({children}) {
    return (
        <Container fluid className='bg-black' stystyle={{ background: 'rgb(15, 15, 15)', height: '100vh' }} >
            {children}
        </Container>
    );
}

export default CommonLayout;





