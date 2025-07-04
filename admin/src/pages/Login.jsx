
import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
const Login = () => {
    const [state,setState] = useState('Admin');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const {setAToken,backendUrl} = useContext(AdminContext);
    const { setDToken} = useContext(DoctorContext);
    console.log(backendUrl);
    
    const onSubmitHandler = async(event)  => {
        event.preventDefault()
        try{
            if(state === 'Admin'){
                const {data} = await axios.post(backendUrl + '/api/admin/login',{email,password})
                if(data.success){
                    console.log(data);
                     localStorage.setItem('aToken',data.token)
                     setAToken(data.token)
                    console.log(data.token);
                    
                }
                else{
                    toast.error(data.message || 'Something went wrong')
                }
            } 
            else{
                const {data} = await axios.post(backendUrl + '/api/doctor/login',{email,password})
                if(data.success){
                    console.log(data);
                     localStorage.setItem('dToken',data.token)
                     setDToken(data.token)
                    console.log(data.token);
                    
                }
                else{
                    toast.error(data.message || 'Something went wrong')
                }
            }
           
        }
        catch(error) {
            console.error("Error adding doctor:", error.message)
            
        }

    }

    return (
        <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
            <div className="flex flex-col gap-3 m-auto item-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
                <p className="text-2xl font-semibold m-auto"><span className="text-primary">{state}</span>Login</p>
                <div className="w-full">
                    <p>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} className="border border-[#DADADA] rounded w-full mt-1 p-2 " type="email" required></input>
                </div>
                <div className="w-full">
                    <p>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} className="border border-[#DADADA] rounded w-full mt-1 p-2 " type="password" required></input>
                </div>
                <button className="bg-primary text-white w-full py-2 rounded-md text-base">Login</button>
                {
                    state === 'Admin' ? 
                    <p className="text-center text-sm">Doctor Login? <span onClick={() => setState('Doctor')} className="text-primary underline cursor-pointer">Click here</span></p> :
                    <p className="text-center text-sm">Admin Login? <span onClick={() => setState('Admin')} className="text-primary underline cursor-pointer">Click here</span></p>
                }
            </div>
            
        </form>
    )
}
export default Login;
