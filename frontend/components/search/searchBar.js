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
    const { user, logout } = useAuth();

    // Add the missing toggleDropdown function
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Add click outside handler to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isDropdownOpen && !event.target.closest('.profile-dropdown')) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isDropdownOpen]);

    const handleOptionClick = (option) => {
        switch (option) {
            case 'profile':
                navigate('/profile');
                break;
            case 'logout':
                logout();
                break;
            default:
                break;
        }
        setIsDropdownOpen(false);
    };

    // Rest of your existing code remains the same
    useEffect(() => {
        if (searchTerm.trim().length > 0) {
            const delayDebounceFn = setTimeout(() => {
                fetchSuggestions();
            }, 300);
            return () => clearTimeout(delayDebounceFn);
        } else {
            setSuggestions([]);
        }
    }, [searchTerm]);

    const fetchSuggestions = async () => {
        if (searchTerm.trim().length === 0) return;
    
        setIsSearching(true);
        try {
            // Add validation for response type
            const fetchWithValidation = async (url) => {
                const response = await fetch(url, { credentials: 'include' });
                const contentType = response.headers.get('content-type');
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                if (!contentType || !contentType.includes('application/json')) {
                    throw new Error('Server did not return JSON');
                }
                
                return response;
            };
    
            // Fetch data with validation
            const [playlistsRes, releasesRes] = await Promise.all([
                fetchWithValidation('/api/personalPlaylists'),
                fetchWithValidation('/api/newReleases'),
                // fetchWithValidation('/api/users')
            ]);
    
            // Parse JSON responses
            const [playlists, releases] = await Promise.all([
                playlistsRes.json(),
                releasesRes.json(),
                // usersRes.json()
            ]);

            console.log('the fuck is in here:', [playlistsRes, releasesRes])
    
            // Add data validation
            if (!Array.isArray(playlists) || !Array.isArray(releases)) {
                throw new Error('Invalid data format received');
            }
    
            const searchTermLower = searchTerm.toLowerCase().trim();
            const isHashtagSearch = searchTermLower.startsWith('#');
            const cleanSearchTerm = isHashtagSearch ? searchTermLower.slice(1) : searchTermLower;
    
            // Process suggestions with null checks
            const playlistSuggestions = playlists
                .filter(playlist => playlist?.title?.toLowerCase().includes(cleanSearchTerm))
                .map(playlist => ({ ...playlist, type: 'playlist' }));
    
            const releaseSuggestions = releases
                .filter(release => {
                    if (isHashtagSearch) {
                        return release.hashtags?.some(tag =>
                            tag.toLowerCase().includes(cleanSearchTerm)
                        );
                    }
                    return (
                        release.title?.toLowerCase().includes(cleanSearchTerm) ||
                        release.artist?.toLowerCase().includes(cleanSearchTerm) ||
                        release.hashtags?.some(tag =>
                            tag.toLowerCase().includes(cleanSearchTerm)
                        )
                    );
                })
                .map(release => ({
                    ...release,
                    type: 'release',
                    matchingHashtags: release.hashtags?.filter(tag =>
                        tag.toLowerCase().includes(cleanSearchTerm)
                    )
                }));
    
            // const userSuggestions = users
            //     .filter(user => user?.username?.toLowerCase().includes(cleanSearchTerm))
            //     .map(user => ({ ...user, type: 'user' }));
    
            setSuggestions([...playlistSuggestions, ...releaseSuggestions]);
    
        } catch (error) {
            console.error('Error fetching suggestions:', error.message);
            setSuggestions([]);
            
            // Add user-friendly error handling
            if (error.message.includes('Server did not return JSON')) {
                console.log('API server might not be running or endpoints are not configured correctly');
            }
        } finally {
            setIsSearching(false);
        }
    };

    const handleSearchInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value.trim().length === 0) {
            setSuggestions([]);
        }
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

                {isSearching && (
                    <div className="absolute top-full left-0 right-0 w-2/5 bg-neutral-800 rounded-b-lg shadow-lg z-10 p-4">
                        <div className="text-white text-center">Loading...</div>
                    </div>
                )}

                {!isSearching && suggestions.length > 0 && searchTerm.trim() !== '' && (
                    <div className="absolute top-full left-0 right-0 w-2/5 bg-neutral-800 rounded-b-lg shadow-lg z-10 max-h-72 overflow-y-auto">
                        {suggestions.map((suggestion, index) => (
                            <div
                                key={`${suggestion.type}-${index}`}
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
                                <span className={`text-sm ${suggestion.type === 'release' ? 'text-green-400' :
                                    suggestion.type === 'playlist' ? 'text-cyan-400' :
                                        'text-gray-400'
                                    }`}>
                                    {suggestion.type}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

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

            <div className="relative profile-dropdown">
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