import React, { useState } from 'react'
import ProfileInfo from '../cards/ProfileInfo';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../searchbar/SearchBar';

const Navbar = ({userInfo, onSearchTrip}) => {

	const [searchQuery, setSearchQuery] = useState('');

	const navigate = useNavigate()

	const onLogout = () => {
		localStorage.clear(); 
		navigate("/login");
	}

	const handleSearch = () => {
        if(searchQuery){
			onSearchTrip(searchQuery)
		}
    }

	const onClearSearch = () => {
        setSearchQuery('')
    }

	return (
		<div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
			<h1 className='text-xl font-medium text-black py-2'>Travels</h1>

			<SearchBar 
				value={searchQuery} 
				onChange={({ target }) => {
					setSearchQuery(target.value)
				}}
				handleSearch={handleSearch}
				onClearSearch={onClearSearch} 
			/>

			<ProfileInfo userInfo={userInfo} onLogout={onLogout} />
		</div>
	)
}

export default Navbar;
