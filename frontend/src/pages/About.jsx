import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-90' src={assets.about_image} alt="" />

        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Welcome To Prescripto, Your Trusted Partner In Managing Your healthcare Needs Conveniently And Efficiently, At Prescripto, We Understand The Challenges Individuals Face When It Comes To Scheduling Doctor Appointment And Managing Their Health Records</p>

          <p>Prescripto is Committed To excellence In Healthcaree technolgy. We continuosuly Strive To Enhance our Platform, integrating The Latest Advancements To Improve Of Managing Ongoing Care. Precripto Is Here to Support You Every Step Of The Way</p>

          <b className='text-gray-800'>Our Vision</b>

          <p>Our Vision At Presvripto Is To Create A Seamless Healthcare Expriencce For Every User. We Aim to bridge The Gap Between Patients And Healthcare provides, Making It Easier for you To Accrss The Care You Need. When Yoou Need It</p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>

        <div className='border px-6 md:px-12 py-8 sm:py-10 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>EFFICIENCY</b>
          <p>Streamlined Appointment Scheduling That Fits into Your Busy Lifestyle.</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>CONVENIENCE</b>
          <p>Access To A Network Of Trusted Healthcare Professionals In Your Area.</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>PERSONALIZATION</b>
          <p>Tailored Recommendations  And Reminders To Help You Stay On Top Of Your Health.</p>

        </div>

      </div>

    </div>
  )
}

export default About
