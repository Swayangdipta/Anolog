import React, { useEffect, useState } from 'react'
import { RiLoader3Line } from 'react-icons/ri'
import { register } from './helper/authApiCalls'
import { validateInput } from '../../utils/Validation_Helper'
import { toast } from 'react-toastify'
import { isAuthenticated } from '../../utils/LS_Helper'
import { updatedUserInformation } from '../User/helper/userApiCalls'

const Register = ({setAuthType= f=>f,formType = "register",userData = undefined,setIsEditOpen = f=>f,setUserData = f=>f}) => {
    const [inputs,setInputs] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [formState,setFormState] = useState({
        isLoading: false,
        lastErrorField: ''
    })

    const {name,username,email,password,confirmPassword} = inputs

    const handleChange = ev => {
        setInputs({...inputs,[ev.target.name]: ev.target.value})
    }

    const registerUser = ev => {
        ev.preventDefault()
        setFormState({...formState,isLoading: true})

        if(formType === 'register'){
            if(formState.lastErrorField !== '')
                document.getElementById(formState.lastErrorField).style.borderColor = 'transparent'

            let validationResult = validateInput(inputs,'register')
            if(!validationResult || validationResult.error){
                document.getElementById(validationResult.field).style.borderColor = 'red'
                setFormState({...formState,isLoading: false,lastErrorField: validationResult.field})
                return toast.error(validationResult.error ? validationResult.message :  'Unknown form type! Try refreshing the page.')
            }

            register(inputs).then(data => {
                if(data.response?.data.message[1].code === 11000){
                    setFormState({...formState,isLoading: false})
                    return toast.error('Username or email already exists.')
                }else if(data.response?.data.error){
                    setFormState({...formState,isLoading: false})
                    return toast.error(data.response.data.message[0])
                }else if(data.name === 'AxiosError'){
                    setFormState({...formState,isLoading: false})
                    return toast.error('Something went wrong! Try again.')
                }

                toast.success("Registration successful! Login to continue...")
                setFormState({...formState,isLoading: false,lastErrorField: ''})
                setAuthType('login')
            }).catch(e => console.log(e))            
        }else if(formType === 'edit'){
            updateUser()
        }
    }

    const updateUser = () => {
        const {user,token} = isAuthenticated()
        let userInfo = {
            name: name,
            email: email,
            username: username
        }

        updatedUserInformation(user._id,token,userInfo).then(data => {
            if(data.response?.data.message[1].code === 11000){
                setFormState({...formState,isLoading: false})
                return toast.error('Username or email already exists.')
            }else if(data.response?.data.error){
                setFormState({...formState,isLoading: false})
                return toast.error(data.response.data.message[0])
            }else if(data.name === 'AxiosError'){
                setFormState({...formState,isLoading: false})
                return toast.error('Something went wrong! Try again.')
            }

            toast.success("Update successful!")
            setFormState({...formState,isLoading: false,lastErrorField: ''})
            setIsEditOpen(false)
            setUserData(data.data)
        }).catch(e => console.log(e)) 
    }

    useEffect(() => {
        if(formType === 'edit' && userData){
            setInputs({
                ...inputs,
                name: userData.name,
                username: userData.username,
                email: userData.email
            })
        }
    },[])
  return (
    <div className={`w-[500px] ${formType === 'edit' ? ('h-[300px]') : ('h-[500px]')} relative top-0`}>
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
                {
                    formType === 'register' && (
                        <div className='text-amber-300 text-[12px] mt-[80px]'>Tip: Blogs can be published using <span className='text-green-500'>USERNAME</span> so make it unique or as pen name.</div>
                    )
                }
            </div>
            <form className='w-[55%] h-full p-[20px]' onChange={handleChange}>
                <div>
                    <label htmlFor="name" className='text-zinc-100 text-[18px]'>Fullname</label>
                    <input value={name} id='name' className='w-full rounded h-[30px] border-[2px] mt-[5px] indent-[10px]' type="text" name="name" autoFocus tabIndex={1} placeholder='Your fullname...' />
                </div>
                <div className='mt-[10px]'>
                    <label htmlFor="email" className='text-zinc-100 text-[18px]'>Email</label>
                    <input value={email} id='email' className='w-full rounded h-[30px] border-[2px] mt-[5px] indent-[10px]' type="text" name="email" tabIndex={2} placeholder='Your email address...' />
                </div>
                <div className='mt-[10px]'>
                    <label htmlFor="username" className='text-zinc-100 text-[18px]'>Username</label>
                    <input value={username} id='username' className='w-full rounded h-[30px] border-[2px] mt-[5px] indent-[10px]' type="text" name="username" tabIndex={3} placeholder='Your username...' />
                </div>
                {
                    formType === 'register' && (
                        <>
                        <div className='mt-[10px]'>
                            <label htmlFor="password" className='text-zinc-100 text-[18px]'>Password</label>
                            <input value={password} id='password' className='w-full rounded h-[30px] border-[2px] mt-[5px] indent-[10px]' type="password" name="password" tabIndex={4} placeholder='Your password...' />
                        </div>
                        <div className='mt-[10px]'>
                            <label htmlFor="confirmPassword" className='text-zinc-100 text-[18px]'>Confirm password</label>
                            <input value={confirmPassword} id='confirmPassword' className='w-full rounded h-[30px] border-[2px] mt-[5px] indent-[10px]' type="text" name="confirmPassword" tabIndex={5} placeholder='Re-Enter password...' />
                        </div>
                        </>
                    )
                }
                <button type="submit" disabled={formState.isLoading} onClick={registerUser} className={`w-full rounded mt-[20px] h-[40px] font-[600] text-[19px] text-white flex items-center justify-center ${formState.isLoading ? ('bg-green-900') : ('bg-green-700 hover:bg-green-600')}`}>
                    {formState.isLoading ? (<RiLoader3Line className='animate-spin text-[30px]' />) : formType === 'register' ? 'Register' : 'Update'}
                </button>
                {
                    formType === 'register' && (
                        <>
                            <p className='text-center mt-[10px] text-zinc-500'>Or</p>
                            <div className='text-center underline text-slate-300 cursor-pointer hover:text-slate-400' onClick={() => setAuthType('login')}>Login</div>
                        </>
                    )
                }
            </form>            
        </div>            
    </div>
  )
}

export default Register