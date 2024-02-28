import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ResponsiveAutoExample() {
    return (
        <Container>
            <Container>
                {/* 모바일 디자인 */}
                <Row className='d-md-none'>
                    <Col xs={12}>
                        <h1>모바일 디자인</h1>
                        <p>모바일에서 보여지는 내용</p>
                    </Col>
                </Row>

                {/* 데스크톱 디자인 */}
                <Row className='d-none d-md-flex'>
                    <Col md={6}>
                        <h1>데스크톱 디자인 - 좌측</h1>
                        <p>데스크톱에서 좌측에 보여지는 내용</p>
                    </Col>
                    <Col md={6}>
                        <h1>데스크톱 디자인 - 우측</h1>
                        <p>데스크톱에서 우측에 보여지는 내용</p>
                    </Col>
                </Row>
            </Container>        </Container>    );
}

export default ResponsiveAutoExample;
