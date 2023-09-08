import React, { useState } from 'react'
import {Link, Navigate} from 'react-router-dom'
import { login } from './helper/authApiCalls'
import { validateInput } from '../../utils/Validation_Helper'
import { toast } from 'react-toastify'
import { authenticateUser } from '../../utils/LS_Helper'
import { RiLoader2Line, RiLoader3Line } from 'react-icons/ri'
const Login = ({setAuthType = f => f}) => {
    const [inputs,setInputs] = useState({
        username: '',
        password: ''
    })

    const [lastErrorField,setLastErrorField] = useState('')
    const [formState,setFormState] = useState({
        isLoading: false,
        isRedirecting: false
    })

    const {username , password} = inputs

    const loginUser = ev => {
        ev.preventDefault()
        setFormState({...formState,isLoading: true})
        if(lastErrorField !== '')
            document.getElementById(lastErrorField).style.borderColor = 'unset'

        let validationResult = validateInput(inputs,'login')

        if(!validationResult || validationResult.error){
            if(validationResult.error){
                setLastErrorField(validationResult.field)
                document.getElementById(validationResult.field).style.borderColor = 'red'
            }
            setFormState({...formState,isLoading: false})
            return toast.error(validationResult.error ? validationResult.message : 'Unknown form type! Try refreshing the page.')
        }

        login(inputs).then(data => {
            if(data.response?.data.error){
                setFormState({...formState,isLoading: false})
                return toast.error(data.response.data.message)
            }else if(data.name === 'AxiosError'){
                setFormState({...formState,isLoading: false})
                return toast.error('Something went wrong! Try again.')
            }

            authenticateUser(data)

            toast.success("Successfully Logged In! Now Redirecting...")
            setFormState({...formState,isLoading: false,isRedirecting: true})
        }).catch(e => {
            console.log(e);
        })
    }

    const handleChange = ev => {
        setInputs({...inputs,[ev.target.name]: ev.target.value})
    }
  return (
    <div className='w-[500px] h-[400px] relative top-0'>
        {formState.isRedirecting && <Navigate to='/' />}
        <img className='w-full h-full object-fit absolute top-0 left-0 rounded' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmwBpvvvc6HzYWAJ6lUuldkA-8AyqXWjICYjJePRKxrQFBHrVIus36CFJTr1ZBWcj9ibk&usqp=CAU" alt="" />
        <div className='w-full h-full rounded bg-[#111] bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-20 border-[1px] border-zinc-700 flex'>
            <div className='w-[45%] h-full bg-black p-[20px] flex flex-col rounded-l'>
                <img src="https://img.logoipsum.com/285.svg" alt="Website Logo" />
                <span className='text-zinc-700 text-[16px] mb-[20px]'>
                    Blog Annonymously
                </span>

                <div className='flex flex-col mt-[60px]'>
                    <span className='text-zinc-400 text-[14px] mb-[20px]'>Real integrity is doing the right thing, knowing that nobody’s going to know whether you did it or not.</span>
                    <span className='text-zinc-600 text-[14px] text-right mr-[10px]'>― Oprah Winfrey</span>
                </div>
            </div>
            <form className='w-[55%] h-full p-[20px]' onChange={handleChange}>
                <div>
                    <label htmlFor="username" className='text-zinc-100 text-[22px]'>Email</label>
                    <input value={username} id='email' className='w-full rounded h-[35px] border-[2px] mt-[10px] indent-[10px]' type="text" name="username" autoFocus tabIndex={1} placeholder='Your email address...' />
                </div>
                <div className='mt-[20px]'>
                    <label htmlFor="password" className='text-zinc-100 text-[22px]'>Password</label>
                    <input value={password} id='password' className='w-full rounded h-[35px] border-[2px] mt-[10px] indent-[10px]' type="password" name="password" tabIndex={2} placeholder='Your password...' />
                </div>

                <div className='mt-[20px] text-zinc-400 underline'>
                    <Link>Forgot Password?</Link>
                </div>

                <button type="submit" disabled={formState.isLoading} onClick={loginUser} className={`w-full rounded mt-[20px] h-[40px] font-[600] text-[19px] text-white flex items-center justify-center ${formState.isLoading ? ('bg-green-900') : ('bg-green-700 hover:bg-green-600')}`}>
                    {formState.isLoading ? (<RiLoader3Line className='animate-spin text-[30px]' />) : 'Login'}
                </button>
                <p className='text-center mt-[10px] text-zinc-500'>Or</p>
                <div className='text-center underline mt-[10px] text-slate-300 cursor-pointer hover:text-slate-400' onClick={() => setAuthType('register')}>Register</div>
            </form>            
        </div>            
    </div>
  )
}

export default Login