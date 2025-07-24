import { createBrowserRouter } from "react-router-dom";
import Main from "../layOut/Main";
import Home from "../pages/home/Home";
import AdminLayOut from "../layOut/AdminLayOut";
import AdminHome from "../adminPages/adminHome/AdminHome";
import Login from "../pages/login/Login";
import RoleRoute from "../hook/RoleRoute";
import Users from "../adminPages/users/Users";
import AddServiceForm from "../adminPages/services/AddServiceForm";
import AllServices from "../adminPages/services/AllServices";
import UpdateService from "../adminPages/services/UpdateService";
import AddStaff from "../adminPages/staff/AddStaff";
import AllStaff from "../adminPages/staff/AllStaff";
import UpdateStaff from "../adminPages/staff/UpdateStaff";
import Appointment from "../adminPages/Appointment/Appointment";
import GetBooking from "../adminPages/booking/GetBooking";
import PaymentSuccess from "../adminPages/PaymentSuccess";
import UserPayments from "../adminPages/UserPayments";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
    ]
  },
  {
    path: "/admin",
    element: <RoleRoute allowedRoles={['admin', 'staff', 'user']}><AdminLayOut /></RoleRoute>,
    children: [
      { path: "", element: <AdminHome /> },
      { path: "users", element: <Users /> },
      { path: "services", element: <AddServiceForm /> },
      { path: "allServices", element: <AllServices /> },
      { path: "updateData/:id", element: <UpdateService /> },
      { path: "addStaff", element: <AddStaff /> },
      { path: "allStaff", element: <AllStaff /> },
      { path: "updateStaff/:id", element: <UpdateStaff /> },
      { path: "appointment/:id", element: <Appointment /> },
      { path: "allBooking", element: <GetBooking /> },
      { path: "payment-success", element: <PaymentSuccess /> },
      { path: "user-payments", element: <UserPayments /> },





    ]

  }
]);

export default router;