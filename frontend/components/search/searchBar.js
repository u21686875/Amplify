import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsDropdownOpen(prevState => !prevState);
    };

    const handleOptionClick = (path) => {
        setIsDropdownOpen(false);
        navigate(path);
    };

    return (
        <div className="search-bar">
            <div className="search-input-container">
                <Search className="search-icon" />
                <input type="text" placeholder="Search by artists, songs or albums" className="search-input" />
            </div>
            <div className="profile-container">
                <div className="profile-image" onClick={toggleDropdown}>
                    <img src="/assets/images/user/user.jpg" alt="User image" />
                </div>
                {isDropdownOpen && (
                    <div className="dropdown">
                        <div className="dropdown-option" onClick={() => handleOptionClick('/profile')}>Profile page</div>
                        <div className="dropdown-option" onClick={() => handleOptionClick('/auth')}>Log out</div>
                    </div>
                )}
            </div>
            <style jsx>{`
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
                    top: 49%;
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
            `}</style>
        </div>
    );
};

export default SearchBar;