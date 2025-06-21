import { assets } from '../assets/assets'

function About () {
    return (
        <div>
            <div className='text-center text-2xl pt-10 text-gray-500'>
                <p>ABOUT<span className='text-gray-500 font-medium'> US</span></p>
            </div>
            <div className='my-10 flex flex-col md:flex-row gap-12'>
                <img className='w-full md:max-w-[360px] ' src={assets.about_image} alt={''}></img>
                <div className='flex flex-col justify-center gap-6 md:w 2/4 text-sm text-gray-600'>
                    <p>Welcome to bookmyDoctor, Your Trusted Partner In Managing Your Healthcare Needs Conveniently And Efficientle. At bookmyDoctor, We Understand The Challenges Individuals face When It Comes To Scheduling Doctor Appointments And Managing Their Health records. </p>
                    <p>BookmyDoctor Is Committed To Excellence In healthcare technology. We Continuously Strive To Enhance Our Platform, Integrating The Latest Advantages To Improve User Experience And Deliver Superior Service. Whether You're Booking Your First Appointment Or Managing Ongoing Care. BookmyDoctor Is Here To Support You Every Step Of The Way.</p>
                    <b className='text-gray-800'>Our Vision</b>
                    <p>Our Vision At BookmyDoctor Is To Create A Seamless Healthcare Experience For Every User.We Aim To Bridge The Gap Between Patients And Doctors, Making It Easier For You To Access The Care You Need, When You Need It.</p>
                </div>
            </div>
            <div className='text-xl my-4 '>
                <p>WHY<span className='text-gray-700 font-semibold'>CHOOSE US</span> </p>
            </div>
            <div className='flex flex-col md:flex-row mb-20'>
                <div className='border px-10 md:px-16 py-8 sm:py-16 text flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
                    <b>Efficiency:</b>
                    <p>Streamline appointment scheduling that fits in your busy lifestyle.</p>

                </div>
                <div className='border px-10 md:px-16 py-8 sm:py-16 text flex flex-com gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
                    <b>Convenience:</b>
                    <p>Access to a network of your Trusted Doctors in your area. </p>
                </div>
                <div className='border px-10 md:px-16 py-8 sm:py-16 text flex flex-com gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
                    <b>Personalization:</b>
                    <p>Tailored recommendations and reminders to help you stay on top of your health. </p>
                </div>
            </div>
        </div>

    )
}

export default About