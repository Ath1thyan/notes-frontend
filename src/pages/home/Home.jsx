import React from 'react'
import Navbar from '../../components/navbar/Navbar';
import TripCard from '../../components/cards/TripCard';
import { MdAdd } from "react-icons/md";
import AddEditTrips from './AddEditTrips';

const Home = () => {
  return (
    <div>
      <Navbar />

      <div className='container mx-auto'>
        <div className='grid grid-cols-3 gap-4 mt-8'>
          <TripCard 
            title="Trip to Ooty on 6th July"
            date="2nd Jul 2024"
            content="Trip to Ooty on 6th July Trip to Ooty on 6th July Trip to Ooty on 6th July"
            tags="#1DayTrip"
            isBookMarked={false}
            onEdit={() => {}}
            onDelete={() => {}}
            onBookMarkedTrip={() => {}}
          />
        </div>
      </div>

      <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10' onClick={() => {}}>
        <MdAdd className="text-[32px] text-white" />
      </button>

      <AddEditTrips />
    </div>
  )
}

export default Home;
