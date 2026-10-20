import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets.js'

const Login = () => {

  const { backendUrl, token, setToken } = useContext(AppContext)

  const navigate = useNavigate()

  const [state, setState] = useState('Sign Up')
  const [passwordError, setPasswordError] = useState('')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [gender, setGender] = useState('')
  const [phone, setPhone] = useState('')
  const [dob, setDob] = useState('')
  const [line1, setLine1] = useState('')
  const [line2, setLine2] = useState('')
  const [image, setImage] = useState(false)

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {

      if (state === 'Sign Up') {
        const formData = new FormData()

        formData.append('name', name)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('gender', gender)
        formData.append('phone', phone)
        formData.append('dob', dob)
        formData.append('address', JSON.stringify({ line1, line2 }))

        if (image) {
          formData.append('image', image)
        }

        const { data } = await axios.post(
          backendUrl + '/api/user/register',
          formData
        )

        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          if (data.field === 'password') {
            setPasswordError(data.message)
          } else {
            toast.error(data.message)
          }
        }
      } else {
        const { data } = await axios.post(
          backendUrl + '/api/user/login',
          { email, password }
        )

        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          if (data.field === 'password') {
            setPasswordError(data.message)
          } else {
            toast.error(data.message)
          }
        }
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])
  return (
    <div>
      <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center' >

        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-85 sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>

          <p className='text-2xl font-semibold'>{state === 'Sign Up' ? "Create Account" : "Login"}</p>

          <p>Please {state === 'Sign Up' ? "sign up" : "log in"} to book appointment</p>

          {state === 'Sign Up' && (
            <div className='w-full'>

              <p>Full Name</p>
              <input className='border border-zinc-300 rounded w-full p-2 mt-1   focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20' type="text" onChange={(e) => setName(e.target.value)} value={name} required />
            </div>
          )}

          <div className='w-full'>
            <p>Email</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1  focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20' type="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
          </div>

          <div className='w-full '>
            <p>Password</p>
            <input
              className='border border-zinc-300 rounded w-full p-2 mt-1 ' 
              type="password"
              onChange={(e) => {
                setPassword(e.target.value)
                setPasswordError('')
              }}
              value={password}
              required
            />
            {passwordError && (
              <p className="text-red-500 text-xs mt-1">
                {passwordError}
              </p>
            )}

          </div>

          {state === 'Sign Up' && (
            <div className='w-full'>
              <p>Gender:</p>
              <select className='border border-zinc-300 rounded w-full p-2 mt-1 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all' onChange={(e) => setGender(e.target.value)} value={gender} required>
                <option value="" disabled className='text-gray-300'>Select your gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Others</option>
              </select>
            </div>
          )}

          {state === 'Sign Up' && (
            <div className='w-full'>

              <label className='block text-sm font-medium text-gray-700 mb-1.5'>
                Phone Number
              </label>

              <div className='flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all'>
                <span className='px-3 py-2.5 bg-gray-50 border-r border-gray-300 text-gray-600 text-sm'>
                  +91
                </span>

                <input
                  className='w-full p-2 outline-none text-sm bg-transparent'
                  type="tel"
                  placeholder='Enter your phone number'
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  maxLength={10}
                  pattern="[0-9]{10}"
                  required
                />
              </div>
            </div>
          )}

          {state === 'Sign Up' && (
            <div className='w-full'>
              <p>Date of Birth:</p>
              <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="Date" onChange={(e) => setDob(e.target.value)} value={dob} required />
            </div>
          )}
          {state === 'Sign Up' && (
            <div className='w-full'>
              <p>Address:</p>

              <input onChange={(e) => setLine1(e.target.value)} value={line1} className='border rounded px-3 py-2 ' type="text" placeholder='Address 1' required />
              <input onChange={(e) => setLine2(e.target.value)} value={line2} className='border rounded px-3 py-2 ml-2' type="text" placeholder='Address 2' required />

            </div>
          )}
          {state === 'Sign Up' && (
            <div className='w-full'>
              <p>Image:</p>

              <label htmlFor="doc-img">
                <img
                  className='w-26 bg-gray-100 rounded cursor-pointer'
                  src={image ? URL.createObjectURL(image) : assets.upload_icon}
                  alt="Upload profile"
                />
              </label>

              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="doc-img"
                accept="image/*"
                hidden
              />
            </div>
          )}

          <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-balance'>{state === 'Sign Up' ? "Create Account" : "Login"}</button>
          {
            state === "Sign Up"
              ? <p>Already have an account? <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'>Login here</span></p>
              : <p>Create an new account? <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer'>Click here</span></p>
          }
        </div>

      </form>

    </div>
  )
}

export default Login
