import React, { useEffect, useState } from "react";
import MyModal from "../components/UI/modal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import Loader from "../components/UI/loader/Loader";
import { useFetching } from "../hooks/useFetching";
import TimesheetService from "../API/TimesheetService";
import TimesheetList from "../components/Timesheet/TimesheetList";
import TimesheetForm from "../components/Timesheet/TimesheetForm";
import EmployeeService from "../API/EmployeeService";

function Timesheet() {
    const [records, setRecords] = useState([])
    const [employees, setEmployees] = useState([])
    const createRecord = async (newRecord) => {
        console.log(newRecord);
        const response = await TimesheetService.create(newRecord);
        //ТУТ АЙДИ ПРИХОДИТ
        if (response.status === 201) {
            var record = {...newRecord, id: response.data.id}
            setRecords([...records, record])
            setModal(false)
            return {isSuccess: true};
        }
        return { isSuccess: false, errorMessage: "Check" };

    }
    const removeRecord = async (record) => {
        const response = await TimesheetService.remove(record.id);
        //ТУТ ПРОВЕРКА СТАТУСКОДА   
        setRecords([...records.filter(p => p.id !== record.id)])
    }

    const [modal, setModal] = useState(false)
    const [fetchTimesheet, isTimesheetLoading, timesheetError] = useFetching(async () => {
        const response = await TimesheetService.getAll()
        setRecords([...records, ...response.data])
    })
    const getEmployees = async () => {
        const response = await EmployeeService.getAll();
        setEmployees(response.data)
    }


    useEffect(() => {
        fetchTimesheet()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        if (isTimesheetLoading) return;
    }, [isTimesheetLoading])

    return (
        <div>
            <MyButton style={{ marginTop: '24px' }} onClick={() => { setModal(true); getEmployees() }}>Добавить запись</MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <TimesheetForm create={createRecord} employees={employees} />
            </MyModal>
            <hr style={{ margin: '15px 0' }} />
            {timesheetError &&
                <h1>{timesheetError}</h1>
            }
            {isTimesheetLoading &&
                <div style={{ display: "flex", justifyContent: 'center' }}><Loader /></div>
            }

            {(!isTimesheetLoading && records.length === 0)
                ? <div style={{ textAlign: 'center', fontWeight: "bold", fontSize: '2em' }}>Записи не найдены</div>
                : <TimesheetList records={records} remove={removeRecord} />
            }
        </div>
    );
}

export default Timesheet;
