import {createBrowserRouter} from "react-router-dom";
import DashBoard from "../pages/DashBoard";
import ForgotCredentials from "../pages/ForgotCredentials";
import HomePage from "../pages/HomePage";
import NewStory from "../pages/NewStory";
const routes = createBrowserRouter([
    {path:"/", Component:DashBoard},
    {path:"/request-credentials",Component:ForgotCredentials},
    {path:"/home-page",Component:HomePage},
    {path:"/new-story",Component:NewStory},
])

export default routes;
