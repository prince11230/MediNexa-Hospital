import React from 'react'
import { assets } from '../assets/assets'

const contact = () => {
  return (
    <div>
      
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>CONTACT <span className='text-gray-700 font-medium'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12 mb-28 text-sm'>
        <div>
          <img className='w-full md:max-w-90' src={assets.contact_image} alt=''  />
        </div>

        <div className='flex flex-col justify-start items-start gap-5'>

          <p className='font-semibold text-lg text-gray-600'>OUR OFFICE</p>

          <p className='text-gray-500'>54709 Willms Station</p>

          <p className='text-gray-500'>Suite 350, Washington, USA</p>

          <p className='text-gray-500'>Tel: 9128133488</p>

          <p className='text-gray-500'>Email:<a>princy9128@gmail.com</a></p>

          <p className='font-semibold text-lg text-gray-600'>CAREERS AT PRESCRIPTO</p>

          <p className='text-gray-500'>Learn more about our teams and  job openings.</p>

          <button className='border gap-3 py-3 px-3 p-3 mt-2  text-gray-600 hover:bg-primary hover:text-white transtion-all duration-500'>Explore Jobs</button>
        </div>
        
      </div>
    </div>
  )
}

export default contact
