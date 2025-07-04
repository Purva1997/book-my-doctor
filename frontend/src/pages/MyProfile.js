import axios from 'axios'
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
function MyProfile () {

    const [isEditing, setIsEditing] = useState(false)
    const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext)
    const [image, setImage] = useState(false)


    const updateUserProfileData = async () => {
        try {
            const formData = new FormData();
            image && formData.append('image', image);
            formData.append('name', userData.name);
            formData.append('phone', userData.phone);
            formData.append('gender', userData.gender);
            formData.append('dob', userData.dob);
            formData.append('address', JSON.stringify(userData.address) || userData.address);


            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })
            console.log(data);
            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                setIsEditing(false)
                setImage(false)
            }
            else {
                toast.error(data.message)
            }
        }
        catch (error) {
            toast.error("Error adding doctor:", error.message)


        }

    }

    return userData && (
        <div className='max-w-lg flex flex-col gap-2 text-sm'>
            {
                isEditing
                    ? <label htmlFor="image">
                        <div className='inline-block relative cursor-pointer'>
                            <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt=''></img>
                            <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt=''></img>
                        </div>
                        <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden></input>
                    </label>
                    : <img className='w-36 rounded' src={userData.image} alt=''></img>
            }



            {isEditing
                ? <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' type='text' value={userData.name} onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}></input>
                : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
            }

            <hr className='bg-zinc-400 h-[1px] border-none'></hr>

            <div>
                <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
                    <p className='font-medium'>Email id:</p>
                    <p className='text-blue-500'>{userData.email}</p>
                    <p className='font-medium'>Phone:</p>
                    {
                        isEditing
                            ? <input className='bg-gray-100 max-w-52' type='text' value={userData.phone} onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}></input>
                            : <p className='text-blue-400'>{userData.phone}</p>
                    }

                    <p className='font-medium'>Address:</p>
                    {
                        isEditing
                            ? <p>
                                <input className='bg-gray-50' type='text' value={userData.address.line1} onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}></input>
                                <br></br>
                                <input className='bg-gray-50 mt-2' type='text' value={userData.address.line2} onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}></input>
                            </p>
                            : <p className='text-gray-500'>
                                {userData.address.line1}
                                <br></br>
                                {userData.address.line2}
                            </p>
                    }

                </div>
            </div>
            <div>
                <p className='text-neutral-500 underline mt-3'> BASIC INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
                    <p className='font-medium'>Gender:</p>
                    {
                        isEditing
                            ? <select className='max-w-20 bg-gray-100' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender} >
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                                <option value='Other'>Other</option>
                            </select>
                            : <p className='text-gary-400'>{userData.gender}</p>
                    }
                    <p className='font-medium'>Date of Birth:</p>
                    {
                        isEditing
                            ? <input className='max-w-24 bg-gray-100' type='date' value={userData.dob} onChange={e => setUserData(prev => ({ ...prev, dob: e.target.value }))}></input>
                            : <p className='text-gray-400'>{userData.dob}</p>
                    }
                </div>
            </div>
            <div className='mt-10'>
                {
                    isEditing
                        ? <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white' onClick={updateUserProfileData}>Save</button>
                        : <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white' onClick={() => setIsEditing(true)}>Edit</button>
                }
            </div>
        </div>
    )
}

export default MyProfile