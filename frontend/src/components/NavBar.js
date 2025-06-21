import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
const NavBar = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = React.useState(false);
    const { token, setToken, userData } = React.useContext(AppContext);
    const backendUrl = process.env.REACT_APP_ADMIN_URL;
    console.log('backendUrl', backendUrl);

    const logout = () => {
        setToken(false);
        localStorage.removeItem('token');
    }

    return (
        <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-grey-400'>
            <img onClick={() => { navigate('/'); window.scrollTo(0, 0) }} className='w-44 cursor-pointer' src={assets.logo} alt='logo'></img>
            <ul className='hidden md:flex items-start gap-5 font-medium'>
                <NavLink to={'/'}>
                    <li className='py-1'>HOME</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'></hr>
                </NavLink>
                <NavLink to={'/doctors'}>
                    <li className='py-1'>All DOCTORS</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'></hr>
                </NavLink>
                <NavLink to={'/about'}>
                    <li className='py-1'>ABOUT</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'></hr>
                </NavLink>
                <NavLink to={'/contact'}>
                    <li className='py-1'>CONTACT</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'></hr>
                </NavLink>
            </ul>
            <button onClick={backendUrl ? () => window.open(backendUrl, "_blank") : null} className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">Admin/Doctor</button>

            <div className='flex items-center gap-4'>
                {
                    token && userData
                        ? <div className='flex items-center gap-2 cursor-pointer group relative'>
                            <img className='w-8 rounded-full' src={userData.image} alt=''></img>
                            <img className='w-2.5' src={assets.dropdown_icon} alt=''></img>
                            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                                    <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                                    <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                                    <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                                </div>
                            </div>
                        </div>
                        : <button onClick={() => navigate('/login')} className='bg-primary text-white py-3 px-8 rounded-full font-light hidden md:block'>Create an account</button>
                }
                <img src={assets.menu_icon} alt='' className='w-6 cursor-pointer md:hidden' onClick={() => setShowMenu(true)}></img>
            </div>

            {/* -----Mobile menu----- */}
            <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                <div className='flex item-center justify-between px-5 py-6'>
                    <img className='w-36' src={assets.logo} alt=''></img>
                    <img className='w-7' src={assets.cross_icon} alt='' onClick={() => setShowMenu(false)}></img>
                </div>
                <ul className='flex flex-col items-center gap-2 font-medium px-5 text-lg mt-5'>
                    <NavLink to={'/'} onClick={() => setShowMenu(false)}><p className="px-4 py-2 rounded inline-block">HOME</p></NavLink>
                    <NavLink to={'/doctors'} onClick={() => setShowMenu(false)}><p className="px-4 py-2 rounded inline-block">ALL DOCTORS</p></NavLink>
                    <NavLink to={'/about'} onClick={() => setShowMenu(false)}><p className="px-4 py-2 rounded inline-block">ABOUT</p></NavLink>
                    <NavLink to={'/contact'} onClick={() => setShowMenu(false)}><p className="px-4 py-2 rounded inline-block">CONTACT</p></NavLink>

                </ul>
            </div>
        </div >
    )
}

export default NavBar