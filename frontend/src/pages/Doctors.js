import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

function Doctors () {
    const navigate = useNavigate();
    const { speciality } = useParams()
    const [filterDoc, setFilterDoc] = useState([])
    const [showFilter, setShowFilter] = useState(false);

    const { doctors } = useContext(AppContext);

    const applyFilter = () => {
        if (speciality) {
            setFilterDoc(doctors.filter((doc) => doc.specialization === speciality))
        } else {
            setFilterDoc(doctors)
        }
    }
    useEffect(() => {
        applyFilter()
    }, [doctors, speciality])

    return (
        <div>
            <p className='text-gray-600'>Go with our expert doctors.</p>
            <div className=' flex flex-col sm:flex-row gap-4 my-10 md:mx-10'>
                <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? "bg-primary text-white" : ""}`} onClick={() => setShowFilter(prev => !prev)}>Filters</button>
                <div className={`flex flex-col gap-4 text-sm text-gray-600 ${showFilter ? "flex" : "hidden sm:flex"} sm:w-1/4`}>
                    <p onClick={() => speciality === 'General Physician' ? navigate('/doctors') : navigate(`/doctors/General Physician`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General Physician" ? "bg-blue-100 text-black" : ""}`}>General Physician</p>
                    <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate(`/doctors/Gynecologist`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-blue-100 text-black" : ""}`}>Gynecologist</p>
                    <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate(`/doctors/Dermatologist`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-blue-100 text-black" : ""}`}>Dermatologist</p>
                    <p onClick={() => speciality === 'Pediatrician' ? navigate('/doctors') : navigate(`/doctors/Pediatrician`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatrician" ? "bg-blue-100 text-black" : ""}`}>Pediatrician</p>
                    <p onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate(`/doctors/Neurologist`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-blue-100 text-black" : ""}`}>Neurologist</p>
                    <p onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate(`/doctors/Gastroenterologist`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gastroenterologist" ? "bg-blue-100 text-black" : ""}`}>Gastroenterologist</p>

                </div>
                <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
                    {filterDoc.map((item, index) => (
                        <div onClick={() => navigate(`/appointment/${item._id}`)} key={index} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
                            <img className='bg-blue-100 ' src={item.image} alt='' />
                            <div className='p-4'>
                                <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-gray-500'}`}>
                                    <p className={`w-2 h-2 rounded-full ${item.available ? ' bg-green-500' : 'bg-gray-500'}`}></p>
                                    <p>{item.available ? 'Available' : 'Not Available'}</p>
                                </div>
                                <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                                <p className='text-gray-600 text-sm'>{item.speciality}</p>

                            </div>

                        </div>
                    ),)}
                </div>
            </div>
        </div>
    )
}

export default Doctors