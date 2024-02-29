import React from 'react';
import MyButton from '../UI/button/MyButton';
import { Row, Col } from 'react-bootstrap';
import { absenceReasons } from "../../consts/absenceReasons";

const TimesheetItem = (props) => {
    return (
        <Row className='text-break border border-info'>
            <Col xs={1} className='border-end border-info'>{props.record.id}</Col>
            <Col xs={2} className='border-end border-info'>
                <span className='fw-bold'>{props.record.employeeId}</span>. {props.record.employeeLastName} {props.record.employeeFirstName}
            </Col>
            <Col xs={1} className='border-end border-info'>{absenceReasons[props.record.reason].name}</Col>
            <Col xs={2} className='border-end border-info'>{props.record.startDate}</Col>
            <Col xs={1} className='border-end border-info'>{props.record.duration}</Col>
            <Col xs={1} className='border-end border-info'>
                <div>
                    {(props.record.discounted)
                        ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                        </svg>
                        : <span>X</span>
                }
                </div>
            </Col>
            <Col xs={3} className='border-end border-info'>{props.record.description}</Col>
            <Col xs={1} className='p-0'>
                <div>
                    <MyButton onClick={() => props.edit(props.record)}>Изменить</MyButton>
                    <MyButton onClick={() => props.remove(props.record)}>Удалить</MyButton>
                </div>
            </Col>
        </Row>
    );
}

export default TimesheetItem;