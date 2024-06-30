import React, { useState } from 'react'
import TagInput from '../../components/input/TagInput';
import { MdClose } from "react-icons/md"

const AddEditTrips = ({ tripData, type, onClose }) => {

    const [tags, setTags] = useState([]);
    // const [startDate, setStartDate] = useState(new Date());
    // const [endDate, setEndDate] = useState(new Date());
    // const [location, setLocation] = useState("");
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    const [error, setError] = useState(null);


// Add Trip
    const addNewTrip = async () => {}
    
// Edit Trip
    const editTrip = async () => {}


    const handleAddTrip = () => {
        if (!title ) {
            setError("Please enter the title");
            return;
        }

        if (!content ) {
            setError("Please enter the content");
            return;
        }

        setError("");

        if (type === 'edit') {
            editTrip()
        }
        else {
            addNewTrip()
        }
    }

  return (
    <div className='relative'>

        <button className='w-10 h-10 rounded-full items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50' onClick={onClose}>
            <MdClose className="text-xl text-slate-400" />
        </button>

        <div className='flex flex-col gap-2'>
            <label className='input-label'>TITLE</label>
            <input type='text' className='text-2xl text-slate-950 outline-none' placeholder='Go to German next week' value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>

        <div className='flex flex-col gap-2 mt-4'>
            <label className='input-label'>CONTENT</label>
            <textarea type='text' className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded' placeholder='Write a brief description of your trip.' rows={10} value={content} onChange={({ target }) => setContent(target.value)} />
        </div>

        <div className='mt-3'>
            <label className='input-label'>TAGS</label>
            <TagInput tags={tags} setTags={setTags} />
        </div>

        {error && <p className='text-red-500 text-xs pt-4'>{error}</p>}

        <button className='btn-primary font-medium mt-5 p-3' onClick={handleAddTrip}>ADD</button>
    </div>
  )
}

export default AddEditTrips;
