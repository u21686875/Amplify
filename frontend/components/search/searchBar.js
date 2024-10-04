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
        <div className="search-bar">
            <div className="search-input-container">
                <Search className="search-icon" />
                <input 
                    type="text" 
                    placeholder="Search playlists, releases, or users" 
                    className="search-input"
                    value={searchTerm}
                    onChange={handleSearchInputChange}
                />
                {suggestions.length > 0 && (
                    <div className="search-suggestions">
                        {suggestions.map((suggestion, index) => (
                            <div 
                                key={index} 
                                className="suggestion-item"
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                <span>{suggestion.title || suggestion.username}</span>
                                <span className="suggestion-type">{suggestion.type}</span>
                            </div>
                        ))}
                    </div>
                )}
                {isModalOpen && selectedItem && (
                <ReleasePopup
                    release={selectedItem}
                    onClose={handleCloseModal}
                    onAddComment={(id, comment) => {
                        // Implement comment addition logic here
                        console.log('Adding comment to', id, comment);
                    }}
                />
            )}
            </div>
            <div className="profile-container">
                <div className="profile-image" onClick={toggleDropdown}>
                    <img src="/assets/images/user/user.jpg" alt="User image" />
                </div>
                {isDropdownOpen && (
                    <div className="dropdown">
                        <div className="dropdown-option" onClick={() => handleOptionClick('profile')}>Profile page</div>
                        <div className="dropdown-option" onClick={() => handleOptionClick('logout')}>Log out</div>
                    </div>
                )}
            </div>
            <style jsx>{`
            .search-suggestions {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background-color: #333;
                    border-radius: 0 0 5px 5px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
                    z-index: 10;
                    max-height: 300px;
                    overflow-y: auto;
                }
                .suggestion-item {
                    padding: 10px;
                    cursor: pointer;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .suggestion-item:hover {
                    background-color: #444;
                }
                .suggestion-type {
                    font-size: 0.8em;
                    color: #888;
                }
                .search-bar {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 15px;
                    width: 100%;
                    box-sizing: border-box;
                }
                .search-input-container {
                    position: relative;
                    flex-grow: 1;
                }
                .search-input {
                    width: 40%;
                    padding: 20px 10px 20px 40px;
                    border-radius: 20px;
                    border: none;
                    background-color: #222;
                    color: #fff;
                }
                .search-icon {
                    position: absolute;
                    left: 10px;
                    top: 40%;
                    transform: translateY(-50%);
                    color: #888;
                    margin-left: 10px;
                }
                .profile-container {
                    position: relative;
                }
                .profile-image {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    border: 2px solid #1db954;
                    margin-right: 40px;
                    overflow: hidden;
                    cursor: pointer;
                }
                .profile-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .dropdown {
                    position: absolute;
                    width: 126%;
                    top: 104%;
                    right: 30px;
                    background-color: #333;
                    border-radius: 5px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
                    z-index: 10;
                }
                .dropdown-option {
                    padding: 10px 20px;
                    color: #fff;
                    cursor: pointer;
                }
                .dropdown-option:hover {
                    background-color: #444;
                }
                ::placeholder {
                    font-size: 17px;
                    padding-left: 15px;
                }
                    .search-results {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background-color: #333;
                    border-radius: 0 0 5px 5px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
                    z-index: 10;
                    max-height: 300px;
                    overflow-y: auto;
                }
                .search-result-item {
                    padding: 10px;
                    cursor: pointer;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .search-result-item:hover {
                    background-color: #444;
                }
                .result-type {
                    font-size: 0.8em;
                    color: #888;
                }
            `}</style>
        </div>
    );
};

export default SearchBar;