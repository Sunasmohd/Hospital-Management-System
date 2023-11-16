import { createBrowserRouter } from "react-router-dom";
import AdminNavBar from "../components/Admin/AdminNavBar";
import Dashboard from "../components/Admin/Dashboard";
import Hospital from "../components/Models/Hospital";
import Doctor from "../components/Models/Doctor";
import Department from "../components/Models/Department";
import Navbar from "../components/Main/Navbar";
import MainHome from "../components/Main/MainHome";
import BookNow from "../components/Main/BookNow";
import Login from "../components/Login/Login";
import Register from "../components/Login/Register";
import ManagerHome from "../components/Manager/ManagerHome";
import ManagerHosp from "../components/Manager/ManagerHosp";
import ManagerDoc from "../components/Manager/ManagerDoc";
import AllUserDetails from "../components/User/AllUserDetails";
import PatientView from "../components/Patient/PatientView";
import MyBookings from "../components/Bookings/MyBookings";
import BookingStatus from "../components/Bookings/BookingStatus";
import HospitalDetail from "../components/Models/HospitalDetail";
import DoctorDetail from "../components/Models/DoctorDetail";
import DepartmentDetail from "../components/Models/DepartmentDetail";

const router = createBrowserRouter([
    {path:'/',element:<Navbar/>,children:[
        {index:true,element:<MainHome/>},
        {path:'/hospitals',element:<Hospital/>},
        {path:'/doctors',element:<Doctor/>},
        {path:'/departments',element:<Department/>},
        {path:'/appoinment',element:<BookNow/>},
        {path:'/login',element:<Login/>},
        {path:'/register',element:<Register/>},
        {path:'/hospitals/:slug',element:<HospitalDetail/>},
        {path:'/doctors/:slug',element:<DoctorDetail/>},
        {path:'/departments/:slug',element:<DepartmentDetail/>},


    ]},
    {path:'/dashboard',element:<AdminNavBar/> , children : [
        {index:true,element:<Dashboard/>},
        
    ]},
    {path:'/manager',element:<AdminNavBar/> , children : [
        {index:true,element:<ManagerHome/>},
        {path:'/manager/addHospital',element:<ManagerHosp/>},
        {path:'/manager/addDoctor',element:<ManagerDoc/>},
        
    ]},
    {path:'/hospitals',element:<Hospital/>},
    {path:'/doctors',element:<Doctor/>},
    {path:'/departments',element:<Department/>},
    {path:'/user',element:<AllUserDetails/>},
    {path:'/patient',element:<PatientView/>},
    {path:'/mybooking',element:<MyBookings/>},
    {path:'/bookingstatus',element:<BookingStatus/>},



    

])

export default router