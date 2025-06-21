
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const currencySymbol = "₹";
    const backendUrl = import.meta?.env?.VITE_BACKEND_URL || 'http://localhost:4000';

    const [doctors, setDoctors] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);
    const [userData, setUserData] = useState(false)
    useEffect(() => {
        if (userData?.address && typeof userData.address === 'string') {
            try {
                const parsedAddress = JSON.parse(userData.address);
                setUserData(prev => ({ ...prev, address: parsedAddress }));
            } catch (error) {
                console.error("Error parsing address:", error);
                toast.error("Invalid address format");
            }
        }
    }, [userData]);

    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/list')
            if (data.success) {
                setDoctors(data.doctors)
            }
            else {
                toast.error(data.message || 'to get doctor datA:Something went wrong')
            }
        }
        catch (error) {
            console.error("Error fetching doctors:", error.message)
        }
    }


    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } })
            console.log('data', data)
            if (data.success) {
                setUserData(data.userData)
            }
            else {
                toast.error(data.message || 'Something went wrong')
            }
        }
        catch (error) {
            console.error("Error fetching doctors:", error.message)
        }
    }


    const value = {
        doctors,
        getDoctorsData,
        currencySymbol,
        token,
        setToken,
        backendUrl,
        userData,
        setUserData,
        loadUserProfileData
    };


    useEffect(() => {
        getDoctorsData()
    }, [])

    useEffect(() => {
        if (token) {
            loadUserProfileData()
        }
        else {
            setUserData(false)
        }
    }, [token])


    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider;