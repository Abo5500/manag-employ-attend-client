import { CSSTransition, TransitionGroup } from "react-transition-group";
import RecordItem from "./TimesheetItem";
import { Container, Row, Col } from 'react-bootstrap';

const TimesheetList = ({ records, remove }) => {
    return (
        <Container className='border border-info text-center'>
            <Row className='text-break border border-info fw-bold'>
                <Col xs={1} className='border-end border-info d-flex align-items-center justify-content-center'>Идентификатор</Col>
                <Col xs={2} className='border-end border-info d-flex align-items-center justify-content-center'>Сотрудник</Col>
                <Col xs={1} className='border-end border-info d-flex align-items-center justify-content-center'>Причина отсутствия</Col>
                <Col xs={2} className='border-end border-info d-flex align-items-center justify-content-center'>Дата начала</Col>
                <Col xs={1} className='border-end border-info d-flex align-items-center justify-content-center'>
                    Продолжительность (раб. дней)
                </Col>
                <Col xs={1} className='border-end border-info d-flex align-items-center justify-content-center'>Учтено при оплате</Col>
                <Col xs={3} className='border-end border-info d-flex align-items-center justify-content-center'>Комментарий</Col>
                <Col xs={1} className='d-flex align-items-center justify-content-center'>Действия</Col>
            </Row>
            <TransitionGroup>
                {records.map((record) =>
                    <CSSTransition
                        key={record.id}
                        timeout={500}
                    >
                        <RecordItem remove={remove} record={record} />
                    </CSSTransition>
                )}
            </TransitionGroup>
        </Container>
    );
}

export default TimesheetList;