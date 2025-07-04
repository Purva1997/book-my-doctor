import { assets } from '../assets/assets'

function Header () {
    return (
        <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20'>
            {/* -----Left side----- */}
            <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
                <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight '>
                    Find Top Doctors &<br />
                    Schedule Appointment<br />
                </p>
                <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
                    <img className='w-28' src={assets.group_profiles} alt=''></img>
                    <p>Explore our curated list of trusted doctors, compare specialties and availability, and book your appointment effortlessly—all on your schedule.<br className='hidden sm:block' /></p>
                </div>
                <a href="#speciality" className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-grey-600 text-sm m-auto md:m-0  hover:scale-105 transition-all duration-300'>
                    Book an appointment <img className='w-3' src={assets.arrow_icon} alt=''></img></a>
            </div>
            {/* -----Right side----- */}
            <div className='md:w-1/2 relative'>
                <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.header_img} alt=''></img>
            </div>
        </div>
    )
}

export default Header