import {createBrowserRouter} from "react-router-dom";
import DashBoard from "../pages/DashBoard";
import ForgotCredentials from "../pages/ForgotCredentials";
import HomePage from "../pages/HomePage";
import NewStory from "../pages/NewStory";
import DraftPage from "../pages/DraftPage";
import PostUI from "../pages/PostUI";
import EditPhost from "../pages/EditPhost";
import AdminDashBoard from "../pages/AdminDashBoard";
import EmailBox from "../pages/EmailBox";
import PublishedUI from "../pages/PublishedUI";
import UserProfile from "../pages/UserProfile";
import EditUserInfo from "../pages/EditUserInfo";
import FollowerPhosts from "../pages/FollowersPhosts";
import ViewReportEmail from "../pages/ViewReportEmail";
const routes = createBrowserRouter([
    {path:"/", Component:DashBoard},
    {path:"/request-credentials",Component:ForgotCredentials},
    {path:"/home-page",Component:HomePage},
    {path:"/new-story",Component:NewStory},
    {path:"/stories",Component:DraftPage},
    {path:"/post-page",Component:PostUI},
    {path:"/edit-post-page",Component:EditPhost},
    {path:"/admin",Component:AdminDashBoard},
    {path:"/admin-email",Component:EmailBox},
    {path:"/publihed-post-page",Component:PublishedUI},
    {path:"/user-profile",Component:UserProfile},
    {path:"/edit-profile",Component:EditUserInfo},
    {path:"/follow-phosts",Component:FollowerPhosts},
    {path:"/report-email",Component:ViewReportEmail},
])


export default routes;
