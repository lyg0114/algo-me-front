import React from "react";
import Card from "react-bootstrap/Card";
import {Placeholder} from "react-bootstrap";

function DummyQuestionCard() {
    return (
        <Card style={{
            borderColor: '#121212',
        }}>
            <Card.Body style={{background: '#0f0f0f', color: '#bfbfbf'}}>
                <Placeholder as={Card.Title} animation="glow">
                    <Placeholder xs={6}/>
                </Placeholder>
                <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={7}/> <Placeholder xs={4}/> <Placeholder xs={4}/>{' '}
                    <Placeholder xs={6}/> <Placeholder xs={8}/>
                </Placeholder>
                <Placeholder.Button xs={6} bg="secondary"/>
            </Card.Body>
        </Card>
    )
}

export default DummyQuestionCard
