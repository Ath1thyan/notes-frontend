import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar';
import TripCard from '../../components/cards/TripCard';
import { MdAdd } from "react-icons/md";
import AddEditTrips from './AddEditTrips';
import Modal from "react-modal"
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

const Home = () => {

    const [OpenAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        data: null,
        type: "add",
    });

    const [userInfo, setUserInfo] = useState(null);

    const navigate = useNavigate();

    // Get info
    const getUserInfo = async () => {
        try {
            const response = await api.get('/get-user');
            setUserInfo(response.data); // Assuming response.data contains user info
        } catch (error) {
            console.error("Error fetching user info:", error);
            if (error.response && error.response.status === 401) {
                localStorage.clear(); // Clear local storage on unauthorized access
                navigate('/login'); // Redirect to login page
            }
        }
    };

    useEffect(() => {
        getUserInfo();
    }, []);


    return (
        <div>
            <Navbar userInfo={userInfo} />

            <div className='container mx-auto'>
                <div className='grid grid-cols-3 gap-4 mt-8'>
                    <TripCard
                        title="Trip to Ooty on 6th July"
                        date="2nd Jul 2024"
                        content="Trip to Ooty on 6th July Trip to Ooty on 6th July Trip to Ooty on 6th July"
                        tags="#1DayTrip"
                        isBookMarked={false}
                        onEdit={() => { }}
                        onDelete={() => { }}
                        onBookMarkedTrip={() => { }}
                    />
                </div>
            </div>

            <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10' onClick={() => {
                setOpenAddEditModal({
                    isShown: true,
                    data: null,
                    type: "add",
                });
            }}>
                <MdAdd className="text-[32px] text-white" />
            </button>

            <Modal 
                isOpen={OpenAddEditModal.isShown}
                onRequestClose={() => {}}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    },
                }}
                contentLabel=""
                className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
            >
                <AddEditTrips type={OpenAddEditModal.type} tripData={OpenAddEditModal.data} onClose={() => {
                    setOpenAddEditModal({
                        isShown: false,
                        data: null,
                        type: "add",
                    });
                }} />
            </Modal>

        </div>
    )
}

export default Home;
