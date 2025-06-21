import { assets } from '../assets/assets'

function Footer () {
    return (
        <div className='md:mx-10 grid grid-cols-[3fr_1fr_1fr] my-10'>
            <div className='flex flex-col  text-sm'>
                {/* ------Left Section----- */}
                <img className='mb-5 w-40' src={assets.logo} alt=''></img>
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>
                    BookMyDoctor is an easy-to-use online booking platform that helps patients find and schedule appointments with trusted doctors across India. With 24/7 access.It reduces phone calls and no-shows while enhancing efficiency for both clinics and patients. Practice owners can customize operating hours, block off times, manage multiple providers, view and export appointment data.
                </p>
            </div>
            <div>
                {/* ------Middle Section----- */}
                <p className='text-xl font-medium mb-5'>
                    COMPANY
                </p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div>
                {/* ------Right Section----- */}
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+91 123 456 7890</li>
                    <li>bookmydoctor@gmail.com</li>
                </ul>

            </div>
            {/* ------Copyright Section----- */}
            <div>
                <hr>
                </hr>
                <p className='text-center text-gray-600 text-sm py-5'>Copyright © 2023. All rights reserved.</p>
            </div>
        </div >
    )
}

export default Footer