import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { routes } from "../router/routes";
const AppRouter = () => {
    return (
        <BrowserRouter>
            <div className="navbar">
                <div className="navbar__links">
                    <Link to='/about'>About</Link>
                    <Link to='/posts'>Posts</Link>
                </div>
            </div>
            <div className="App">
                <Routes>
                    {routes.map(route =>
                        <Route
                            key={route.path}
                            Component={route.component}
                            path={route.path}
                            exact={route.exact}
                        />
                    )}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default AppRouter;