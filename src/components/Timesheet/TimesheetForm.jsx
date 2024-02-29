import React, { useEffect, useState } from "react";
import MyButton from "../UI/button/MyButton";
import MyInput from "../UI/input/MyInput";
import MySelect from "../UI/select/MySelect";
import { Col, Container, Form, Row } from "react-bootstrap";
import { absenceReasons } from "../../consts/absenceReasons";
import MyModal from "../UI/modal/MyModal";

const TimesheetForm = ({ create, employees, id }) => {
    const [record, setRecord] = useState({ reason: absenceReasons[0].value, startDate: '', duration: 1, discounted: false, description: '', employeeId: -1 })
    const [options, setOptions] = useState([])
    const [modal, setModal] = useState(false)
    const [modalMessage, setModalMessage] = useState('Ошибка');

    useEffect(() => {
        var arr = []
        employees.map(emp => {
            arr.push({ value: emp.id, name: `${emp.id}. ${emp.lastName} ${emp.firstName}` })
        })
        setOptions(arr)
        setRecord({ ...record, employeeId: employees[0] })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [employees])

    const AddNewRecord = async (e) => {
        e.preventDefault()
        //Сделать нормальную валидацию 
        if (record.duration < 1) {
            setModalMessage("Продолжительность не может быть меньше 1")
            setModal(true)
        }
        else if (record.description.length === 0) {
            setModalMessage("Заполните комметарий")
            setModal(true)
        }
        else if (record.startDate === '') {
            setModalMessage("Укажите дату начала")
            setModal(true)
        }
        else {
            // var dateArr = record.startDate.split('-')
            // const newRecord = { ...record, id: Date.now(), startDate: `${dateArr[2]}.${dateArr[1]}.${dateArr[0]}` }
            var result = await create(record)
            if (result.isSuccess === true) {
                setModalMessage('Успешно!')
                setModal(true)
                setRecord({ reason: absenceReasons[0].value, startDate: '', duration: 1, discounted: false, description: '' })
            }
            else {
                setModalMessage(`${result.errorMessage}`);
                setModal(true)
            }
        }
    }
    const changeSelectedEmployee = (empId) => {
        setRecord({ ...record, employeeId: empId })
    }
    const changeSelectedReason = (reason) => {
        setRecord({ ...record, reason: absenceReasons[reason].value })
    }
    const changeDuration = (duration) => {
        setRecord({ ...record, duration: duration })
    }
    const changeStartDate = (date) => {
        setRecord({ ...record, startDate: date })
    }
    const changeDiscounted = (discounted) => {
        setRecord({ ...record, discounted: discounted })
    }
    const changeDescription = (descr) => {
        setRecord({ ...record, description: descr })
    }
    const borderStyles = {
        border: '1px solid teal'
    }
    return (
        <Form>
            <MyModal visible={modal} setVisible={setModal}>
                <span>{modalMessage}</span>
            </MyModal>
            <Container>
                <Row style={borderStyles} className="mt-1">
                    <Col xs={3}>Идентификатор: </Col>
                    <Col xs={9}>{(id) ? { id } : 'Появится после создания записи'}</Col>
                </Row>
                <Row style={borderStyles} className="mt-1">
                    <Col xs={3}>Выберите сотрудника: </Col>
                    <Col xs={9} className="pe-0"><MySelect
                        className='w-100 text-break h-100'
                        value={record.employeeId}
                        onChange={(empId) => changeSelectedEmployee(empId)}
                        options={options}
                        defaultValue={'Список сотрудников'}
                    />
                    </Col>
                </Row>
                <Row style={borderStyles} className="mt-1">
                    <Col xs={3}>Причина отсутствия: </Col>
                    <Col xs={9} className="pe-0">
                        <MySelect
                            className='w-100 text-break h-100'
                            value={record.reason}
                            onChange={(reason) => changeSelectedReason(reason)}
                            options={absenceReasons}
                            defaultValue={'Список причин'}
                        />
                    </Col>
                </Row>
                <Row style={borderStyles} className="mt-1">
                    <Col xs={3}>Дата начала: </Col>
                    <Col xs={9}>
                        <input
                            type='date'
                            value={record.startDate}
                            onChange={(e) => changeStartDate(e.target.value)}
                            style={{ width: '50%' }}
                        />
                    </Col>
                </Row>
                <Row style={borderStyles} className="mt-1">
                    <Col xs={3}>Продолжительность: </Col>
                    <Col xs={9}>
                        <MyInput
                            value={record.duration}
                            onChange={(duration) => changeDuration(duration.target.value)}
                            type="number"
                            style={{ width: '50%', padding: '0', margin: '0' }}
                        />
                    </Col>
                </Row>
                <Row style={borderStyles} className="mt-1">
                    <Col xs={3}>Учтено при оплате: </Col>
                    <Col xs={9}>
                        <Form.Check
                            value={record.discounted}
                            onChange={(e) => changeDiscounted(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row style={borderStyles} className="mt-1">
                    <Col xs={3}>Комментарий: </Col>
                    <Col xs={9} className="pe-0">
                        <Form.Control
                            as="textarea" rows={3}
                            value={record.description}
                            onChange={(descr) => { changeDescription(descr.target.value) }}
                            placeholder="Напишите комментарий"
                        />
                    </Col>
                </Row>
            </Container>

            <MyButton style={{ marginTop: '5px' }} onClick={AddNewRecord}>Добавить запись</MyButton>
        </Form>
    )
}

export default TimesheetForm;