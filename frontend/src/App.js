import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import About from './pages/About';
import Appointment from './pages/Appointment';
import Contact from './pages/Contact';
import Doctors from './pages/Doctors';
import Home from './pages/Home';
import Login from './pages/Login';
import MyAppointments from './pages/MyAppointments';
import MyProfile from './pages/MyProfile';
function App () {
  console.log('App')
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer> </ToastContainer>
      <NavBar></NavBar>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='appointment/:docId' element={<Appointment />} />
        <Route path='contact' element={<Contact />}></Route>
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/my-profile' element={<MyProfile />} />


      </Routes>
      <Footer></Footer>
    </div>
  )
}

export default App