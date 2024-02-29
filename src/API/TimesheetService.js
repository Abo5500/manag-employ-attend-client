import axios from "axios";
export default class TimesheetService {
    static async getAll() {
        const response = await axios('https://localhost:7191/api/v1/timesheet')
        return response
    }
    //https://192.168.0.101:7191/api/v1/timesheet
    static async create(record) {
        const response = await axios(`https://localhost:7191/api/v1/timesheet`, {
            method: 'post',
            params: {
                employeeId: record.employeeId,
                reason: record.reason,
                startDate: record.startDate,
                duration: record.duration,
                discounted: record.discounted,
                description: record.description
            }
        })
        return response
    }

    static async getComments(postId) {
        const response = await axios("https://jsonplaceholder.typicode.com/comments", {
            params: {
                postId: postId
            }
        })
        return response
    }

    static async getPostWithCommentsById(id) {
        const post = (await this.getById(id)).data
        const comments = (await this.getComments(id)).data
        return {post, comments}
    }
}