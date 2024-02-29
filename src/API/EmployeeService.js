import axios from "axios";
export default class EmployeeService {
    static async getAll() {
        const response = await axios('https://localhost:7191/api/v1/employees')
        return response
    }
}