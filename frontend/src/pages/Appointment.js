import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { AppContext } from '../context/AppContext'

function Appointment () {
    const { docId } = useParams()
    const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)
    const navigate = useNavigate()
    const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const [docInfo, setDocInfo] = useState(null)
    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')
    const fetchDocInfo = async () => {
        const docInfo = doctors.find(doc => doc._id === docId)
        setDocInfo(docInfo);

    }

    const getAvailableSlots = async () => {
        setDocSlots([])
        // getting current date
        let today = new Date()

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            let endTime = new Date()
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21, 0, 0, 0)

            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            }
            else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }
            let timeSlots = []
            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

                let day = currentDate.getDate()
                let month = currentDate.getMonth() + 1
                let year = currentDate.getFullYear()

                let slotsDate = day + "_" + month + "_" + year
                const slotTime = formattedTime
                const isSlotAvailable = docInfo?.slots_booked?.[slotsDate] && docInfo.slots_booked[slotsDate]?.includes(slotTime) ? false : true
                if (isSlotAvailable) {
                    timeSlots.push({
                        dateTime: new Date(currentDate),
                        time: formattedTime
                    })
                }

                currentDate.setMinutes(currentDate.getMinutes() + 30)
            }
            setDocSlots((prev) => ([...prev, timeSlots]))
        }

    }

    const bookAppointment = async () => {
        if (!token) {
            toast.warn('Please login to book an appointment')
            return navigate('/login')
        }
        try {
            const date = docSlots[slotIndex][0].dateTime
            let day = date.getDate()
            let month = date.getMonth() + 1
            let year = date.getFullYear()

            const slotDate = day + "_" + month + "_" + year
            const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
            if (data.success) {
                console.log(data);
                toast.success(data.message)
                getDoctorsData()

                navigate('/my-appointments')
            }
            else {
                toast.error(data.message)
                console.log('not booked');
            }

        }
        catch (error) {
            console.error("Error fetching doctors:", error.message)
        }
    }




    useEffect(() => {
        fetchDocInfo()
    }, [doctors, docId])

    useEffect(() => {
        getAvailableSlots()
    }, [docInfo])
    useEffect(() => {
        console.log(docSlots)
    }, [docSlots])
    return docInfo && (
        <div >
            {/* ---------- Doctor Details ---------- */}
            <div className='flex flex-col sm:flex-row gap -4'>
                <div>
                    <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt=''></img>
                </div>

                <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0 ' >
                    {/* ---------- Doctor Info: name, degree, experience ---------- */}
                    <p className='flex items-center gap-2 text-2xl font-medium text-gray-00'>{docInfo.name}
                        <img className='w-5' src={assets.verified_icon} alt=''></img>
                    </p>
                    <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
                        <p>{docInfo.degree} - {docInfo.speciality}</p>
                        <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
                    </div>
                    <div>
                        {/* ---------- Doctor About ---------- */}
                        <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About
                            <img src={assets.info_icon} alt=''></img>
                        </p>
                        <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
                    </div>
                    <div>
                        {/* ---------- Doctor Fees ---------- */}
                        <p className='text-gray-400 mt-4 font-medium'>Appointment Fees:
                            <span className='text-gray-900'>
                                {currencySymbol}{docInfo.fees}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            {/* ---------- Booking Slots ---------- */}
            <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
                <p>Booking Slots</p>
                {console.log(docSlots)}
                <div className='flex item-center gap-3 w-full overflow-x-scroll mt-4'>
                    {
                        docSlots.length && docSlots.map((item, index) => (
                            <div onClick={() => { setSlotIndex(index) }} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`} key={index}>
                                <p>{item[0] ? dayOfWeek[item[0].dateTime.getDay()] : dayOfWeek?.[new Date()?.getDay()]}</p>
                                <p>{item[0] ? item[0].dateTime.getDate() : new Date()?.getDate()}</p>

                            </div>
                        ))
                    }

                </div>
                <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
                    {docSlots.length && docSlots[slotIndex].map((item, index) => (
                        <p onClick={() => setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`} key={index}>
                            {item.time.toLowerCase()}
                        </p>
                    ))}
                </div>
                <div>
                    <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-4'>Book an appointment</button>
                </div>
                {/* ----------Listing of Related Doctors ----------*/}
                <div>
                    <RelatedDoctors docId={docId} speciality={docInfo.speciality}></RelatedDoctors>
                </div>
            </div>
        </div>
    )
}

export default Appointment