import { createBrowserRouter } from "react-router-dom";
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
import Unauthorized from "../pages/Unauthorized";
import RequireAuth from "../context/RequireAuth";
const routes = createBrowserRouter([
  { path: "/", element: <DashBoard /> },
  {
    path: "/request-credentials", element: (
      <RequireAuth>
        <ForgotCredentials />
      </RequireAuth>
    ),
  },
  {
    path: "/home-page", element: (
      <RequireAuth>
        <HomePage />
      </RequireAuth>
    ),
  },
  {
    path: "/new-story", element: (
      <RequireAuth>
        <NewStory />
      </RequireAuth>
    ),
  },
  {
    path: "/stories", element: (
      <RequireAuth>
        <DraftPage />
      </RequireAuth>
    ),
  },
  {
    path: "/post-page", element: (
      <RequireAuth>
        <PostUI />
      </RequireAuth>
    ),
  },
  {
    path: "/edit-post-page", element: (
      <RequireAuth>
        <EditPhost />
      </RequireAuth>
    ),
  },
  {
    path: "/admin", element: (
      <RequireAuth>
        <AdminDashBoard />
      </RequireAuth>
    ),
  },
  {
    path: "/admin-email", element: (
      <RequireAuth>
        <EmailBox />
      </RequireAuth>
    ),
  },
  {
    path: "/publihed-post-page", element: (
      <RequireAuth>
        <PublishedUI />
      </RequireAuth>
    ),
  },
  {
    path: "/user-profile", element: (
      <RequireAuth>
        <UserProfile />
      </RequireAuth>
    ),
  },
  {
    path: "/edit-profile", element: (
      <RequireAuth>
        <EditUserInfo />
      </RequireAuth>
    ),
  },
  {
    path: "/follow-phosts", element: (
      <RequireAuth>
        <FollowerPhosts />
      </RequireAuth>
    ),
  },
  {
    path: "/report-email", element: (
      <RequireAuth>
        <ViewReportEmail />
      </RequireAuth>
    ),
  },

  { path: "/unauthorized", element: <Unauthorized /> },
])


export default routes;
