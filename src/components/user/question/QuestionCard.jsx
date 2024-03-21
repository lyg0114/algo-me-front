import React from "react";
import Card from "react-bootstrap/Card";
import {Col, ListGroup, Row} from "react-bootstrap";
import ThreeDotsIcon from "../../assets/svg/ThreeDotsIcon";
import {useNavigate} from "react-router-dom";


let spreadElements = {
    background: '#121212',
    borderColor: '#303030',
    color: '#bfbfbf',
};

function QuestionCard({id, title, fromSource, reviewCount, registDt}) {
    const navigate = useNavigate();
    const goToUPdate = () => {
        navigate(`/save-question/${id}`);
    }
    const goToView = () => {
        navigate(`/view-question/${id}`);
    }

    return (
        <Card style={{borderColor: '#121212'}}>
            <Card.Body style={{background: '#0f0f0f', color: '#bfbfbf'}}>
                <Row className="justify-content-end">
                    <Col xs={1} style={{marginRight: '20px'}}>
                        <button onClick={goToUPdate}>
                            <ThreeDotsIcon/>
                        </button>
                    </Col>
                </Row>
                <Row>
                    <Card.Title onClick={goToView} style={{cursor: 'pointer', height: '70px'}}>
                        {title}
                    </Card.Title>
                </Row>
            </Card.Body>
            <ListGroup className="list-group-flush" style={spreadElements}>
                <ListGroup.Item style={spreadElements}>{fromSource}</ListGroup.Item>
                <ListGroup.Item style={spreadElements}>{registDt} [{reviewCount}]</ListGroup.Item>
            </ListGroup>
        </Card>
    )
}

export default QuestionCard
