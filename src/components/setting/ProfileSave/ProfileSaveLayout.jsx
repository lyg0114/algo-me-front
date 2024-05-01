import React from "react";
import {Container} from "react-bootstrap";
import ProfileSaveHeader from "./ProfileSaveHeader";
import ProfileSaveContent from "./ProfileSaveContent";

function ProfileSaveLayout() {
    return (
        <>
            <Container fluid className='bg-black'>
                <ProfileSaveHeader/>
                <ProfileSaveContent/>
            </Container>
        </>
    );
}

export default ProfileSaveLayout;
