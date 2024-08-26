import React from 'react';
import Sidebar from '../../components/sidebar/sideBar';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

class ProfileSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedSection: null
        };
    }

    toggleSection = (section, event) => {
        // Prevent toggling if the click is on a form element
        if (event.target.tagName.toLowerCase() === 'input' ||
            event.target.tagName.toLowerCase() === 'select' ||
            event.target.tagName.toLowerCase() === 'button') {
            return;
        }
        this.setState(prevState => ({
            expandedSection: prevState.expandedSection === section ? null : section
        }));
    }

    goBack = () => {
        this.props.navigate('/home');  // Navigate to home page
    }

    handleSave = (section) => {
        // Here you would typically handle the saving of data
        console.log(`Saving data for ${section}`);
        // For now, we'll just close the accordion
        this.setState({ expandedSection: null });
    }

    handleCancel = () => {
        // Close the accordion without saving
        this.setState({ expandedSection: null });
    }

    render() {
        const { expandedSection } = this.state;

        return (
            <div className="page-container">
                <Sidebar />
                <div className="profile-settings">
                    <div className="header">
                        <div className="back-button" onClick={this.goBack}><ChevronLeft /></div>
                        <div className="user-info">
                            <img src="/assets/images/user/user.jpg" alt="User" className="user-image" />
                            <h2>Cruzer7</h2>
                        </div>
                    </div>
                    <h3 className="account-settings-title">ACCOUNT SETTINGS</h3>

                    <div className="settings-list">
                        {[
                            {
                                name: 'Personal information', content: (
                                    <div>
                                        <input type="text" placeholder="Full Name" className="input-field" />
                                        <input type="email" placeholder="Email" className="input-field" />
                                        <input type="tel" placeholder="Phone Number" className="input-field" />
                                        <div className="button-group">
                                            <button onClick={() => this.handleSave('Personal information')} className="save-button">Save</button>
                                            <button onClick={this.handleCancel} className="cancel-button">Cancel</button>
                                        </div>
                                    </div>
                                )
                            },
                            {
                                name: 'Payments and payouts', content: (
                                    <div>
                                        <input type="text" placeholder="Card Number" className="input-field" />
                                        <div className="input-group">
                                            <input type="text" placeholder="Expiry Date" className="input-field half-width" />
                                            <input type="text" placeholder="CVV" className="input-field half-width" />
                                        </div>
                                        <div className="button-group">
                                            <button onClick={() => this.handleSave('Payments and payouts')} className="save-button">Save</button>
                                            <button onClick={this.handleCancel} className="cancel-button">Cancel</button>
                                        </div>
                                    </div>
                                )
                            },
                            {
                                name: 'Notifications', content: (
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
                                name: 'Settings', content: (
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
                            <div key={index} className="settings-item" onClick={(e) => this.toggleSection(item.name, e)}>
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
                    .user-info {
                        display: flex;
                        align-items: center;
                    }
                    .user-image {
                        width: 60px;
                        height: 60px;
                        border-radius: 50%;
                        margin-right: 15px;
                        border: 2px solid #1DB954;
                    }
                    h2 {
                        font-size: 24px;
                        margin: 0;
                    }
                    .account-settings-title {
                        color: #888;
                        font-size: 14px;
                        margin-bottom: 20px;
                    }
                    .settings-list {
                        margin-bottom: 20px;
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
                    }
                    .sidebar {
                        background-color: #0F0F0F;
                        padding: 20px;
                        width: 14%;
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
                    .input-group {
                        display: flex;
                        justify-content: space-between;
                    }
                    .half-width {
                        width: 48%;
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
    }
}

// Wrap the component to use hooks
function ProfileSettingsWithRouter(props) {
    const navigate = useNavigate();
    return <ProfileSettings {...props} navigate={navigate} />;
}

export default ProfileSettingsWithRouter;