import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import LandingPage from "./pages/LandingPage/LandingPage";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import OtpVerification from "./components/auth/OtpVerification";
import AuthRedirect from "./components/auth/AuthRedirect";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Project from "./pages/Projects/Project";
import ProjectDocs from "./pages/Projects/Documents/ProjectDocs";
import SettingProfile from "./pages/Setting/Profile/SettingProfile";
import ResetPassword from "./pages/AuthPages/ResetPassword";
import SettingRoleManage from "./pages/Setting/UserManagement/RoleManagement.tsx/SettingRoleManage";
import DynamicForm from "./pages/HiddenPages/DynamicForm/DynamicForm";
import Support from "./pages/Support/Support";
import Ticket from "./pages/Ticket/Ticket";
import SettingUserManage from "./pages/Setting/UserManagement/SettingUserManage";
import ProjectDetails from "./pages/Projects/ProjectDetails/ProjectDetails";
import Home from "./pages/Dashboard/Home";
import UserProjectList from "./pages/AuthPages/UserProjectList";
import ProjectAuth from "./components/auth/ProjectAuth";
import UserProfiles from "./pages/UserProfiles";
import SelectOrganization from "./pages/SelectOrganization/SelectOrganization";
import Visitors from "./pages/Visitors/Visitors";
import WorkSpace from "./pages/WorkSpace/WorkSpace";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />

        <Routes>

        {/* Public Routes */}
        <Route index path="/" element={<LandingPage />} />

          {/* Protected Routes (Requires Token) */}
          <Route element={<ProtectedRoute />}>
            {/* Dashboard Layout */}
            <Route element={<AppLayout />}>

              <Route index path="/dashboard" element={<Home />} />

              {/* Others Page */}
              <Route path="/profile" element={<UserProfiles />} />
              {/* <Route path="/calendar" element={<Calendar />} /> */}
              {/* <Route path="/blank" element={<Blank />} /> */}

              {/* Forms */}
              {/* <Route path="/form-elements" element={<FormElements />} /> */}

              {/* Tables */}
              {/* <Route path="/basic-tables" element={<BasicTables />} /> */}

              {/* Ui Elements */}
              {/* <Route path="/alerts" element={<Alerts />} /> */}
              {/* <Route path="/avatars" element={<Avatars />} /> */}
              {/* <Route path="/badge" element={<Badges />} /> */}
              {/* <Route path="/buttons" element={<Buttons />} /> */}
              {/* <Route path="/images" element={<Images />} /> */}
              {/* <Route path="/videos" element={<Videos />} /> */}

              {/* Charts */}
              {/* <Route path="/line-chart" element={<LineChart />} /> */}
              {/* <Route path="/bar-chart" element={<BarChart />} /> */}

              {/* Project Page */}
              <Route path="/projects" element={<Project />} />
              <Route path="/project/documents" element={<ProjectDocs />} />

              {/* Select Organization */}
              <Route path="/select-organization" element={<SelectOrganization />} />

              {/* Select Visitor Space */}
              <Route path="/visitors" element={<Visitors />} />

              {/* Select WorkSpace */}
              <Route path="/workspace" element={<WorkSpace />} />

              {/* Setting Page */}
              <Route path="/setting/profile" element={<SettingProfile />} />
              {/* <Route path="/setting/staff-management" element={<SettingStaffManage />} /> */}
              <Route path="/setting/role-management" element={<SettingRoleManage />} />
              <Route path="/setting/user-management" element={<SettingUserManage />} />

              {/* Ticket Page */}
              <Route path="/ticket" element={<Ticket />} />

              {/* Support Page */}
              <Route path="/support" element={<Support />} />

              {/* Hidden Page */}
              <Route path="/setting/dynamic-form" element={<DynamicForm />} />
            </Route>

            <Route path="/project-detail" element={<ProjectDetails />} />
          </Route>

          {/* Redirect authenticated users away from SignIn, SignUp, OtpVerification */}
          <Route element={<AuthRedirect />}>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/otp-verification" element={<OtpVerification />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>         

          <Route element={<ProjectAuth />}>
            <Route path="/select-project" element={<UserProjectList />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
