import React, { useState, useEffect } from 'react';
import { Search, Hash } from 'lucide-react';
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
    const { user, logout } = useAuth(); // Add user from AuthContext

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
    
            const searchTermLower = searchTerm.toLowerCase().trim();
            const isHashtagSearch = searchTermLower.startsWith('#');
            const cleanSearchTerm = isHashtagSearch ? searchTermLower.slice(1) : searchTermLower;
    
            // Playlist suggestions (unchanged)
            const playlistSuggestions = Array.isArray(playlists) ? playlists
                .filter(playlist => playlist.title.toLowerCase().includes(cleanSearchTerm))
                .map(playlist => ({ ...playlist, type: 'playlist' })) : [];
    
            // Enhanced release suggestions with hashtag search
            const releaseSuggestions = Array.isArray(releases) ? releases
                .filter(release => {
                    if (isHashtagSearch) {
                        // Search only in hashtags when search term starts with #
                        return release.hashtags?.some(tag => 
                            tag.toLowerCase().includes(cleanSearchTerm)
                        );
                    } else {
                        // Search in title, artist, and hashtags for normal search
                        return (
                            release.title.toLowerCase().includes(cleanSearchTerm) ||
                            release.artist.toLowerCase().includes(cleanSearchTerm) ||
                            release.hashtags?.some(tag => 
                                tag.toLowerCase().includes(cleanSearchTerm)
                            )
                        );
                    }
                })
                .map(release => ({ 
                    ...release, 
                    type: 'release',
                    // Add relevant hashtags that match the search
                    matchingHashtags: release.hashtags?.filter(tag =>
                        tag.toLowerCase().includes(cleanSearchTerm)
                    )
                })) : [];
    
            // User suggestions (unchanged)
            const userSuggestions = Array.isArray(users) 
                ? users.filter(user => user.username.toLowerCase().includes(cleanSearchTerm))
                : (users && users.username && users.username.toLowerCase().includes(cleanSearchTerm) ? [users] : []);
    
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

                {/* Search Suggestions Dropdown - Keep unchanged */}
                {suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 w-2/5 bg-neutral-800 rounded-b-lg shadow-lg z-10 max-h-72 overflow-y-auto">
                        {suggestions.map((suggestion, index) => (
                            <div 
                                key={index} 
                                className="flex justify-between items-center px-4 py-3 hover:bg-neutral-700 cursor-pointer"
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                <div className="flex flex-col">
                                    <span className="text-white">
                                        {suggestion.title || suggestion.username}
                                    </span>
                                    {suggestion.type === 'release' && suggestion.matchingHashtags?.length > 0 && (
                                        <div className="flex gap-2 mt-1">
                                            {suggestion.matchingHashtags.map((tag, i) => (
                                                <span 
                                                    key={i} 
                                                    className="text-xs text-cyan-400 flex items-center"
                                                >
                                                    <Hash size={12} className="mr-0.5" />
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <span className={`text-sm ${
                                    suggestion.type === 'release' ? 'text-green-400' :
                                    suggestion.type === 'playlist' ? 'text-cyan-400' :
                                    'text-gray-400'
                                }`}>
                                    {suggestion.type}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Modal - Keep unchanged */}
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

            {/* Profile Section - Updated with user profile image */}
            <div className="relative">
                <div 
                    className="w-14 h-14 rounded-full border-2 border-green-500 overflow-hidden cursor-pointer mr-10 group"
                    onClick={toggleDropdown}
                >
                    <img 
                        src={user?.profileImage || '/assets/images/user/user.jpg'}
                        alt="User image"
                        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                </div>

                {/* Profile Dropdown - Kept original structure */}
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

