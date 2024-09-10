import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Sidebar from '../../components/sidebar/sideBar';

const ProfileSettings = () => {
    const navigate = useNavigate();
    const [expandedSection, setExpandedSection] = useState(null);
    const [userData, setUserData] = useState({
        fullName: 'Cruzer7',
        email: 'cruzer7@example.com',
        phoneNumber: '+1234567890'
    });

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: ''
    });

    useEffect(() => {
        if (expandedSection === 'Personal information') {
            setFormData(userData);
        }
    }, [expandedSection, userData]);

    const toggleSection = (section, event) => {
        if (event.target.tagName.toLowerCase() === 'input' ||
            event.target.tagName.toLowerCase() === 'select' ||
            event.target.tagName.toLowerCase() === 'button') {
            return;
        }
        setExpandedSection(prevSection => prevSection === section ? null : section);
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = (section) => {
        if (section === 'Personal information') {
            setUserData(formData);
        }
        setExpandedSection(null);
    };

    const handleCancel = () => {
        setExpandedSection(null);
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
                        <h3>{userData.fullName}</h3>
                        <p>{userData.email}</p>
                        <p>{userData.phoneNumber}</p>
                    </div>
                    <div className="settings-list">
                        {[
                            {
                                name: 'Personal information',
                                content: (
                                    <div>
                                        <input
                                            type="text"
                                            name="fullName"
                                            placeholder="Full Name"
                                            className="input-field"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                        />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            className="input-field"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                        <input
                                            type="tel"
                                            name="phoneNumber"
                                            placeholder="Phone Number"
                                            className="input-field"
                                            value={formData.phoneNumber}
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
                                name: 'Notifications',
                                content: (
                                    <div>
                                        <label className="checkbox-container">
                                            <input type="checkbox" /> Email Notifications
                                        </label>
                                        <label className="checkbox-container">
                                            <input type="checkbox" /> Push Notifications
                                        </label>
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
                <button className="logout-button">LOG OUT</button>
            </div>

            <style jsx>{`
                .page-container {
                    display: flex;
                    height: 100vh;
                    background-color: #121212;
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