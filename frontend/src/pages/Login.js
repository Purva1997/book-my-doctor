import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AppContext } from '../context/AppContext'
function Login () {
    const [state, setState] = useState('Sign Up')
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const { backendUrl, token, setToken } = useContext(AppContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            if (state === 'Sign Up') {
                const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })
                if (data.success) {

                    localStorage.setItem('token', data.token)
                    setToken(data.token)
                    console.log(data.token);

                }
                else {
                    toast.error(data.message || 'Something went wrong')
                }
            }
            else {
                const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })
                if (data.success) {

                    localStorage.setItem('token', data.token)
                    setToken(data.token)
                    console.log(data.token);

                }
                else {
                    toast.error(data.message || 'Something went wrong')
                }

            }
        }
        catch (error) {
            console.error("Error adding doctor:", error.message)

        }

    }
    useEffect(() => {
        if (token) {
            navigate('/')
        }
    }, [token])
    return (
        <div>
            <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex item-center'>
                <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 shadow-lg'>
                    <p className='text-2xl font-semibold'>{state === 'Sign Up' ? 'Create Account' : ' Login'}</p>
                    <p>Please {state === 'Sign Up' ? 'Sing up' : ' Log I n'} to book appointment</p>
                    {state === 'Sign Up' &&
                        <div className='w-full '>
                            <p>Full Name</p>
                            <input className='border border-zinc-300 rounded w-full mt-1 p-2 ' type='text' onChange={(e) => setName(e.target.value)} value={name} required></input>
                        </div>}

                    <div className='w-full'>
                        <p>Email</p>
                        <input className='border border-zinc-300 rounded w-full mt-1 p-2 ' type='text' onChange={(e) => setEmail(e.target.value)} value={email} required></input>
                    </div>
                    <div className='w-full'>
                        <p>Password</p>
                        <input className='border border-zinc-300 rounded w-full mt-1 p-2 ' type='text' onChange={(e) => setPassword(e.target.value)} value={password} required></input>
                    </div>
                    <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base'>{state === 'Sign Up' ? 'Create Account ' : 'Login'}</button>
                    {
                        state === 'Sign Up'
                            ? <p className=''> Already have an account? <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'>Login here</span></p>
                            : <p> Create an new account? <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer'> Click here</span> </p>
                    }
                </div>
            </form>

        </div>
    )
}

export default Login