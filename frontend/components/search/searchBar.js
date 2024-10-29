import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/authContext';
import ReleasePopup from '../releasepopup/release';

const SearchBar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        if (searchTerm) {
            const delayDebounceFn = setTimeout(() => {
                fetchSuggestions();
            }, 300);
            return () => clearTimeout(delayDebounceFn);
        } else {
            setSuggestions([]);
        }
    }, [searchTerm]);

    const toggleDropdown = () => {
        setIsDropdownOpen(prevState => !prevState);
    };

    const handleOptionClick = (option) => {
        setIsDropdownOpen(false);
        if (option === 'profile') {
            navigate('/profile');
        } else if (option === 'logout') {
            handleLogout();
        }
    };

    const handleLogout = () => {
        logout(); // Call the logout function from AuthContext
        navigate('/auth'); // Redirect to the auth page after logout
    };

    const fetchSuggestions = async () => {
        setIsSearching(true);
        try {
            const [playlistsRes, releasesRes, usersRes] = await Promise.all([
                fetch('/api/personalPlaylists'),
                fetch('/api/newReleases'),
                fetch('/api/users')
            ]);
    
            const playlists = await playlistsRes.json();
            const releases = await releasesRes.json();
            const users = await usersRes.json();
    
            console.log('the users found', users);
    
            const playlistSuggestions = Array.isArray(playlists) ? playlists
                .filter(playlist => playlist.title.toLowerCase().includes(searchTerm.toLowerCase()))
                .map(playlist => ({ ...playlist, type: 'playlist' })) : [];
    
            const releaseSuggestions = Array.isArray(releases) ? releases
                .filter(release => 
                    release.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    release.artist.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map(release => ({ ...release, type: 'release' })) : [];
    
            // Handle both single user object and array of users
            const userSuggestions = Array.isArray(users) 
                ? users.filter(user => user.username.toLowerCase().includes(searchTerm.toLowerCase()))
                : (users && users.username && users.username.toLowerCase().includes(searchTerm.toLowerCase()) ? [users] : []);
    
            const mappedUserSuggestions = userSuggestions.map(user => ({ ...user, type: 'user' }));
    
            setSuggestions([...playlistSuggestions, ...releaseSuggestions, ...mappedUserSuggestions]);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
        setIsSearching(false);
    };

    const handleSearchInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSuggestionClick = (suggestion) => {
        setSelectedItem(suggestion);
        setIsModalOpen(true);
        setSearchTerm('');
        setSuggestions([]);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };


    return (
        <div className="flex items-center justify-between p-4 w-full box-border">
            <div className="relative flex-grow">
                <div className="relative w-2/5">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search playlists, releases, or users" 
                        className="w-full py-5 px-10 rounded-full border-none bg-neutral-800 text-white placeholder:text-lg placeholder:pl-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={searchTerm}
                        onChange={handleSearchInputChange}
                    />
                </div>

                {/* Search Suggestions Dropdown */}
                {suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 w-2/5 bg-neutral-800 rounded-b-lg shadow-lg z-10 max-h-72 overflow-y-auto">
                        {suggestions.map((suggestion, index) => (
                            <div 
                                key={index} 
                                className="flex justify-between items-center px-4 py-3 hover:bg-neutral-700 cursor-pointer"
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                <span className="text-white">
                                    {suggestion.title || suggestion.username}
                                </span>
                                <span className="text-sm text-gray-400">
                                    {suggestion.type}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Modal */}
                {isModalOpen && selectedItem && (
                    <ReleasePopup
                        release={selectedItem}
                        onClose={handleCloseModal}
                        onAddComment={(id, comment) => {
                            console.log('Adding comment to', id, comment);
                        }}
                    />
                )}
            </div>

            {/* Profile Section */}
            <div className="relative">
                <div 
                    className="w-14 h-14 rounded-full border-2 border-green-500 overflow-hidden cursor-pointer mr-10"
                    onClick={toggleDropdown}
                >
                    <img 
                        src="/assets/images/user/user.jpg" 
                        alt="User image" 
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Profile Dropdown */}
                {isDropdownOpen && (
                    <div className="absolute w-[126%] top-[104%] right-8 bg-neutral-800 rounded-lg shadow-lg z-10">
                        <div 
                            className="px-5 py-3 text-white cursor-pointer hover:bg-neutral-700"
                            onClick={() => handleOptionClick('profile')}
                        >
                            Profile page
                        </div>
                        <div 
                            className="px-5 py-3 text-white cursor-pointer hover:bg-neutral-700"
                            onClick={() => handleOptionClick('logout')}
                        >
                            Log out
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBar;