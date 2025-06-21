
import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/NAvBar';
import Sidebar from './components/Sidebar';
import { AdminContext } from './context/AdminContext';
import { DoctorContext } from './context/DoctorContext';
import AddDoctor from './pages/Admin/AddDoctor';
import AllAppointments from './pages/Admin/AllAppointments';
import Dashboard from './pages/Admin/Dashboard';
import DoctorsList from './pages/Admin/DoctorsList';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorProfile from './pages/Doctor/DoctorProfile';
import Login from "./pages/Login";

const App = () => {
  const {aToken} = useContext(AdminContext); 
  const {dToken} = useContext(DoctorContext)
  return aToken || dToken ? (
    <div className='bg-[#F8F9FD]'> 
       <ToastContainer></ToastContainer>
      <Navbar></Navbar>
      <div className='flex items-start'>
        <Sidebar></Sidebar>
        <Routes>
          {/* Admin panel */}
          <Route path='/' element={<></>}></Route>
          <Route path='/admin-dashboard' element={<Dashboard></Dashboard>}></Route>
          <Route path='/all-appointment' element={<AllAppointments></AllAppointments>}></Route>
          <Route path='/add-doctor' element={<AddDoctor></AddDoctor>}></Route>
          <Route path='/doctor-list' element={<DoctorsList></DoctorsList>}></Route>
          {/* Doctor panel */}
          <Route path='/doctor-dashboard' element={<DoctorDashboard></DoctorDashboard>}></Route>
          <Route path='/doctor-profile' element={<DoctorProfile></DoctorProfile>}></Route>
          <Route path='/doctor-appointments' element={<DoctorAppointments></DoctorAppointments>}></Route>
        </Routes>
      </div>
    </div>
  ):
  (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Login></Login>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App