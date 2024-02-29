import Error from "../pages/Error";
import Timesheet from "../pages/Timesheet";

export const routes = [
    {path: '/timesheet', component: Timesheet, exact: true},
    {path: '/', component: Timesheet, exact: true},
    {path: '/*', component: Error, exact: true}
]