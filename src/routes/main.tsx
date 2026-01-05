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
      <RequireAuth allowedRoles={["user"]}>
        <ForgotCredentials />
      </RequireAuth>
    ),
  },
  {
    path: "/home-page", element: (
      <RequireAuth allowedRoles={["user"]}>
        <HomePage />
      </RequireAuth>
    ),
  },
  {
    path: "/new-story", element: (
      <RequireAuth allowedRoles={["user"]}>
        <NewStory />
      </RequireAuth>
    ),
  },
  {
    path: "/stories", element: (
      <RequireAuth allowedRoles={["user"]}>
        <DraftPage />
      </RequireAuth>
    ),
  },
  {
    path: "/post-page", element: (
      <RequireAuth allowedRoles={["user"]}>
        <PostUI />
      </RequireAuth>
    ),
  },
  {
    path: "/edit-post-page", element: (
      <RequireAuth allowedRoles={["user"]}>
        <EditPhost />
      </RequireAuth>
    ),
  },
  {
    path: "/admin", element: (
      <RequireAuth allowedRoles={["admin"]}>
        <AdminDashBoard />
      </RequireAuth>
    ),
  },
  {
    path: "/admin-email", element: (
      <RequireAuth allowedRoles={["admin"]}>
        <EmailBox />
      </RequireAuth>
    ),
  },
  {
    path: "/publihed-post-page", element: (
      <RequireAuth allowedRoles={["admin","user"]}>
        <PublishedUI />
      </RequireAuth>
    ),
  },
  {
    path: "/user-profile", element: (
      <RequireAuth allowedRoles={["admin","user"]}>
        <UserProfile />
      </RequireAuth>
    ),
  },
  {
    path: "/edit-profile", element: (
      <RequireAuth allowedRoles={["user"]}>
        <EditUserInfo />
      </RequireAuth>
    ),
  },
  {
    path: "/follow-phosts", element: (
      <RequireAuth allowedRoles={["user"]}>
        <FollowerPhosts />
      </RequireAuth>
    ),
  },
  {
    path: "/report-email", element: (
      <RequireAuth allowedRoles={["user"]}>
        <ViewReportEmail />
      </RequireAuth>
    ),
  },

  { path: "/unauthorized", element: <Unauthorized /> },
])


export default routes;
