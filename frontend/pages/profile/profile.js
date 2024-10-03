import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, UserMinus, UserPlus } from 'lucide-react';
import Sidebar from '../../components/sidebar/sideBar';
import { useAuth } from '../../components/AuthContext/authContext';
const ProfileSettings = () => {
    const navigate = useNavigate();
    const { user, login, logout } = useAuth();
    const [expandedSection, setExpandedSection] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
    });
    const [friends, setFriends] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);

    useEffect(() => {
        console.log("Current user in AuthContext:", user); // Keep this log
        if (user && user.username) {
            setFormData({ username: user.username });
            fetchFriendsData();
        } else {
            console.error("User or username is missing in AuthContext");
        }
    }, [user]);

    const toggleSection = (section, event) => {
        if (event.target.tagName.toLowerCase() === 'input' ||
            event.target.tagName.toLowerCase() === 'select' ||
            event.target.tagName.toLowerCase() === 'button') {
            return;
        }
        setExpandedSection(prevSection => prevSection === section ? null : section);
    };

    const handleDeleteAccount = async () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            try {
                const response = await fetch('/api/users', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username: user.username }),
                });

                if (!response.ok) {
                    throw new Error('Failed to delete user account');
                }

                logout();
                navigate('/auth');
            } catch (error) {
                console.error('Error deleting user account:', error);
                alert('Failed to delete account. Please try again.');
            }
        }
    };


    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = async (section) => {
        if (section === 'Personal information') {
            try {
                const response = await fetch('/api/users', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                if (!response.ok) {
                    throw new Error('Failed to update user data');
                }
                const updatedData = await response.json();
                login(updatedData); // Update the user data in AuthContext
                setExpandedSection(null);
            } catch (error) {
                console.error('Error updating user data:', error);
            }
        }
    };

    const fetchFriendsData = async () => {
        try {
            const response = await fetch(`/api/users/${user.username}/friends`);
            if (response.ok) {
                const data = await response.json();
                console.log('Friends data:', data); // Add this log
                setFriends(data.friends);
                setFriendRequests(data.friendRequests);
            } else {
                console.error('Error fetching friends data:', await response.text());
            }
        } catch (error) {
            console.error('Error fetching friends data:', error);
        }
    };
    
    const handleAcceptFriend = async (friendUsername) => {
        try {
            const response = await fetch('/api/users/accept-friend', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: user.username, friendUsername })
            });
            if (response.ok) {
                fetchFriendsData(); // Refresh friends list
            }
        } catch (error) {
            console.error('Error accepting friend request:', error);
        }
    };


    const handleUnfriend = async (friendUsername) => {
        try {
            const response = await fetch('/api/users/unfriend', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: user.username, friendUsername })
            });
            if (response.ok) {
                fetchFriendsData(); // Refresh friends list
            }
        } catch (error) {
            console.error('Error unfriending user:', error);
        }
    };


    const handleCancel = () => {
        setExpandedSection(null);
        // Reset form data to current user data
        if (user && user.username) {
            setFormData({ username: user.username });
        }
    };


    const goBack = () => {
        navigate('/home');
    };

    return (
        <div className="page-container">
            <Sidebar />
            <div className="profile-settings">
                <div className="header">
                    <div className="back-button" onClick={goBack}><ChevronLeft /></div>
                    <h2>Account Settings</h2>
                </div>
                <div className="content-wrapper">
                    <div className="user-info-sidebar">
                        <img src="/assets/images/user/user.jpg" alt="User" className="user-image" />
                        <h3>{user ? user.username : 'Loading...'}</h3>
                    </div>
                    <div className="settings-list">
                        {[
                            {
                                name: 'Personal information',
                                content: (
                                    <div>
                                        <input
                                            type="text"
                                            name="username"
                                            placeholder="Full Name"
                                            className="input-field"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                        />
                                        <div className="button-group">
                                            <button onClick={() => handleSave('Personal information')} className="save-button">Save</button>
                                            <button onClick={handleCancel} className="cancel-button">Cancel</button>
                                        </div>
                                    </div>
                                )
                            },
                            {
                                name: 'Friends',
                                content: (
                                    <div className="friends-list">
                                        <h4>Friend Requests</h4>
                                        {friendRequests.length === 0 ? (
                                            <p>No pending friend requests.</p>
                                        ) : (
                                            friendRequests.map((friend, index) => (
                                                <div key={index} className="friend-item">
                                                    <span>{friend}</span>
                                                    <button onClick={() => handleAcceptFriend(friend)} className="accept-button">
                                                        <UserPlus size={16} /> Accept
                                                    </button>
                                                </div>
                                            ))
                                        )}
                                        <h4>Friends</h4>
                                        {friends.length === 0 ? (
                                            <p>You have no friends yet.</p>
                                        ) : (
                                            friends.map((friend, index) => (
                                                <div key={index} className="friend-item">
                                                    <span>{friend}</span>
                                                    <button onClick={() => handleUnfriend(friend)} className="unfriend-button">
                                                        <UserMinus size={16} /> Unfriend
                                                    </button>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )
                            },
                            {
                                name: 'Settings',
                                content: (
                                    <div>
                                        <label className="checkbox-container">
                                            <input type="checkbox" /> Dark Mode
                                        </label>
                                        <select className="input-field">
                                            <option>English</option>
                                            <option>Spanish</option>
                                            <option>French</option>
                                        </select>
                                    </div>
                                )
                            }
                        ].map((item, index) => (
                            <div key={index} className="settings-item" onClick={(e) => toggleSection(item.name, e)}>
                                <div className="settings-item-header">
                                    <span>{item.name}</span>
                                    <span className="arrow">{expandedSection === item.name ? '▼' : '▶'}</span>
                                </div>
                                {expandedSection === item.name && (
                                    <div className="settings-item-content">
                                        {item.content}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <button className="logout-button" onClick={logout}>LOG OUT</button>
                <button className="delete-account-button" onClick={handleDeleteAccount}>DELETE ACCOUNT</button>
            </div>

            <style jsx>{`
                .friends-list {
                    margin-top: 10px;
                }

                .friend-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px 0;
                    border-bottom: 1px solid #333;
                }

                .accept-button, .unfriend-button {
                    display: flex;
                    align-items: center;
                    padding: 5px 10px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 14px;
                }

                .accept-button {
                    background-color: #1DB954;
                    color: white;
                }

                .unfriend-button {
                    background-color: #FF4136;
                    color: white;
                }

                .accept-button svg, .unfriend-button svg {
                    margin-right: 5px;
                }
                .page-container {
                    display: flex;
                    height: 100vh;
                    background-color: #121212;
                }
                .delete-account-button {
                    background-color: #FF4136;
                    color: white;
                    border: none;
                    padding: 15px 30px;
                    font-size: 16px;
                    border-radius: 25px;
                    cursor: pointer;
                    width: 100%;
                    margin-top: 10px;
                }
                .profile-settings {
                    flex-grow: 1;
                    padding: 20px;
                    color: white;
                    font-family: Arial, sans-serif;
                    overflow-y: auto;
                }
                .header {
                    display: flex;
                    align-items: center;
                    margin-bottom: 20px;
                }
                .back-button {
                    font-size: 24px;
                    margin-right: 20px;
                    cursor: pointer;
                }
                .content-wrapper {
                    display: flex;
                }
                .user-info-sidebar {
                    width: 25%;
                    padding-right: 20px;
                    border-right: 1px solid #333;
                }
                .user-image {
                    width: 250px;
                    height: 250px;
                    border-radius: 50%;
                    margin-bottom: 15px;
                    border: 2px solid #1DB954;
                }
                .settings-list {
                    flex-grow: 1;
                    padding-left: 30px;
                }
                h2, h3 {
                    margin: 0 0 10px 0;
                }
                p {
                    margin: 5px 0;
                    color: #888;
                }
                .settings-item {
                    margin-bottom: 15px;
                    cursor: pointer;
                }
                .settings-item-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px 0;
                    border-bottom: 1px solid #333;
                }
                .arrow {
                    font-size: 12px;
                }
                .settings-item-content {
                    padding: 10px 0;
                    font-size: 14px;
                }
                .logout-button {
                    background-color: #8B0000;
                    color: white;
                    border: none;
                    padding: 15px 30px;
                    font-size: 16px;
                    border-radius: 25px;
                    cursor: pointer;
                    width: 100%;
                    margin-top: 20px;
                }
                .input-field {
                    width: 100%;
                    padding: 10px;
                    margin-bottom: 10px;
                    background-color: #333;
                    border: none;
                    border-radius: 5px;
                    color: white;
                }
                .checkbox-container {
                    display: block;
                    margin-bottom: 10px;
                }
                select.input-field {
                    appearance: none;
                    background-image: url('data:image/svg+xml;utf8,<svg fill="white" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');
                    background-repeat: no-repeat;
                    background-position-x: 98%;
                    background-position-y: 50%;
                }
                .button-group {
                    display: flex;
                    margin-top: 10px;
                    gap: 30px;
                }
                .save-button, .cancel-button {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: bold;
                }
                .save-button {
                    background-color: #1DB954;
                    color: white;
                }
                .cancel-button {
                    background-color: #333;
                    color: white;
                }
            `}</style>
        </div>
    );
};

export default ProfileSettings;