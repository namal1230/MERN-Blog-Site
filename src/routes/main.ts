import {createBrowserRouter} from "react-router-dom";
import DashBoard from "../pages/DashBoard";
const routes = createBrowserRouter([
    {path:"/", Component:DashBoard}
])

export default routes;