import React, {useState} from "react";
import Card from "react-bootstrap/Card";
import {ListGroup} from "react-bootstrap";

function QuestionCard({title, fromSource, reviewCount, registDt}) {
    const [imageUrl, setImageUrl] = useState(null);
    const handleClick = (e) => {
        e.preventDefault()
    }

    let spreadElements = {
        background: '#121212',
        borderColor: '#303030',
        color: '#bfbfbf',
    };

    return (
        <Card style={{borderColor: '#121212'}}>
            <Card.Body style={{background: '#0f0f0f', color: '#bfbfbf'}}>
                <Card.Title>{title} [ {reviewCount} ]</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush" style={spreadElements}>
                <ListGroup.Item style={spreadElements}>{fromSource}</ListGroup.Item>
                <ListGroup.Item style={spreadElements}>{registDt}</ListGroup.Item>
            </ListGroup>
        </Card>
    )
}

export default QuestionCard
