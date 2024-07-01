import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import TripCard from '../../components/cards/TripCard';
import { MdAdd } from "react-icons/md";
import AddEditTrips from './AddEditTrips';
import Modal from "react-modal";
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

const Home = () => {

    const [OpenAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        data: null,
        type: "add",
    });

    const [allTrips, setAllTrips] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [isSearch, setIsSearch] = useState(false);

    const navigate = useNavigate();

    const handleEdit = (tripDetails) => {
        setOpenAddEditModal({
            isShown: true,
            data: tripDetails,
            type: "edit",
        });
    }

    // Get user info
    const getUserInfo = async () => {
        try {
            const response = await api.get('/get-user');
            setUserInfo(response.data); 
        } catch (error) {
            console.error("Error fetching user info:", error);
            if (error.response && error.response.status === 401) {
                localStorage.clear(); 
                navigate('/login'); 
            }
        }
    };

    // Get all trips
    const getAllTrips = async () => {
        try {
            const response = await api.get('/get-all-trips');
            if (response.data && response.data.trips) {
                setAllTrips(response.data.trips);
            }
        } catch (error) {
            console.error("Error fetching all trips:", error);
        }
    }

    // Delete trip
    const deleteTrip = async (data) => {
        try {
            const response = await api.delete(`/delete-trip/${data._id}`);
            if (response.data && !response.data.error) {
                getAllTrips();
            }
        } catch (error) {
            console.error("Error deleting trip:", error);
        }
    }

    // Search trips
    const onSearchTrip = async (query) => {
        try {
            const response = await api.get('/search-trips', {
                params: { query },
            });
            if (response.data && response.data.trips) {
                setIsSearch(true);
                setAllTrips(response.data.trips);
            }
        } catch (error) {
            console.error("Error searching trips:", error);
        }
    }

    // Clear search results
    const handleClearSearch = () => {
        setIsSearch(false);
        getAllTrips();
    }

    useEffect(() => {
        getUserInfo();
        getAllTrips();
    }, [OpenAddEditModal.isShown]);

    return (
        <div>
            <Navbar userInfo={userInfo} onSearchTrip={onSearchTrip} handleClearSearch={handleClearSearch} />

            <div className='container mx-auto'>
                <div className='grid grid-cols-3 gap-4 mt-8'>
                    {allTrips.map((item) => (
                        <TripCard
                            key={item._id}
                            title={item.title}
                            date={item.createdOn}
                            content={item.content}
                            tags={item.tags}
                            isBookMarked={item.isBookMarked}
                            onEdit={() => handleEdit(item)}
                            onDelete={() => deleteTrip(item)}
                            onBookMarkedTrip={() => { }}
                        />
                    ))}
                </div>
            </div>

            <button 
                className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 fixed right-10 bottom-10' 
                onClick={() => setOpenAddEditModal({
                    isShown: true,
                    data: null,
                    type: "add",
                })}
            >
                <MdAdd className="text-[32px] text-white" />
            </button>

            <Modal
                isOpen={OpenAddEditModal.isShown}
                onRequestClose={() => setOpenAddEditModal({
                    isShown: false,
                    data: null,
                    type: "add",
                })}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    },
                }}
                contentLabel=""
                className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
            >
                <AddEditTrips 
                    type={OpenAddEditModal.type} 
                    tripData={OpenAddEditModal.data} 
                    onClose={() => setOpenAddEditModal({
                        isShown: false,
                        data: null,
                        type: "add",
                    })} 
                    getAllTrips={getAllTrips}
                />
            </Modal>
        </div>
    )
}

export default Home;
