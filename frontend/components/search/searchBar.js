import React from 'react';
import { Search } from 'lucide-react';
class SearchBar extends React.Component {
    render() {
        return (
            <div className="search-bar">
                <div className="search-input-container">
                    <Search className="search-icon" />
                    <input type="text" placeholder="Search by artists, songs or albums" className="search-input" />
                </div>
                <div className="profile-image">
                    <img src="/assets/images/user/user.jpg" alt="User image" />
                </div>
                <style jsx>
                    {
                        `
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

                            .profile-image {
                            width: 60px;
                            height: 60px;
                            border-radius: 50%;
                            border: 2px solid #1db954;
                            margin-right: 40px;
                            overflow: hidden;
                            }

                            .profile-image img {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                            }

                            ::placeholder {
                                font-size: 17px;
                                padding-left: 15px;
                            }
                        `
                    }
                </style>
            </div>
        );
    }
}

export default SearchBar;