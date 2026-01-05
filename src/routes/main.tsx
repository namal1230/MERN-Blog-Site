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
import PersistLogin from "../context/PersistLogin";

const routes = createBrowserRouter([
  { path: "/", element: <DashBoard /> },
  {
    path: "/request-credentials", element: (
      <PersistLogin>
      <RequireAuth allowedRoles={["user"]}>
        <ForgotCredentials />
      </RequireAuth>
      </PersistLogin>
    ),
  },
  {
    path: "/home-page", element: (
      <PersistLogin>
      <RequireAuth allowedRoles={["user"]}>
        <HomePage />
      </RequireAuth>
      </PersistLogin>
    ),
  },
  {
    path: "/new-story", element: (
      <PersistLogin>
      <RequireAuth allowedRoles={["user"]}>
        <NewStory />
      </RequireAuth>
      </PersistLogin>
    ),
  },
  {
    path: "/stories", element: (
      <PersistLogin>
      <RequireAuth allowedRoles={["user"]}>
        <DraftPage />
      </RequireAuth>
      </PersistLogin>
    ),
  },
  {
    path: "/post-page", element: (
      <PersistLogin>
      <RequireAuth allowedRoles={["user","admin"]}>
        <PostUI />
      </RequireAuth>
      </PersistLogin>
    ),
  },
  {
    path: "/edit-post-page", element: (
      <PersistLogin>
      <RequireAuth allowedRoles={["user"]}>
        <EditPhost />
      </RequireAuth>
      </PersistLogin>
    ),
  },
  {
    path: "/admin", element: (
      <PersistLogin>
      <RequireAuth allowedRoles={["admin"]}>
        <AdminDashBoard />
      </RequireAuth>
      </PersistLogin>
    ),
  },
  {
    path: "/admin-email", element: (
      <PersistLogin>
      <RequireAuth allowedRoles={["admin"]}>
        <EmailBox />
      </RequireAuth>
      </PersistLogin>
    ),
  },
  {
    path: "/publihed-post-page", element: (
      <PersistLogin>
      <RequireAuth allowedRoles={["admin","user"]}>
        <PublishedUI />
      </RequireAuth>
      </PersistLogin>
    ),
  },
  {
    path: "/user-profile", element: (
      <PersistLogin>
      <RequireAuth allowedRoles={["admin","user"]}>
        <UserProfile />
      </RequireAuth>
      </PersistLogin>
    ),
  },
  {
    path: "/edit-profile", element: (
      <PersistLogin>
      <RequireAuth allowedRoles={["user"]}>
        <EditUserInfo />
      </RequireAuth>
      </PersistLogin>
    ),
  },
  {
    path: "/follow-phosts", element: (
      <PersistLogin>
      <RequireAuth allowedRoles={["user"]}>
        <FollowerPhosts />
      </RequireAuth>
      </PersistLogin>
    ),
  },
  {
    path: "/report-email", element: (
      <PersistLogin>
      <RequireAuth allowedRoles={["admin"]}>
        <ViewReportEmail />
      </RequireAuth>
    </PersistLogin>
    ),
  },

  { path: "/unauthorized", element: <Unauthorized /> },
])


export default routes;
