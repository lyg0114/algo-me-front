import React from "react";
import {Container} from "react-bootstrap";
import ProfileViewContent from "./ProfileViewContent";
import ProfileViewHeader from "./ProfileViewHeader";

function ProfileViewLayout() {
    return (
        <>
            <Container fluid className='bg-black'>
                <ProfileViewHeader/>
                <ProfileViewContent/>
            </Container>
        </>
    );
}

export default ProfileViewLayout;
