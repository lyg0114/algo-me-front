import React from "react";
import {Container} from "react-bootstrap";
import LandingPageContent from "./LandingPageContent";


function LandingPageLayout() {
    return (
        <Container fluid className='bg-black' stystyle={{ background: 'rgb(15, 15, 15)', height: '100vh' }} >
            <LandingPageContent/>
        </Container>
    );
}

export default LandingPageLayout;





