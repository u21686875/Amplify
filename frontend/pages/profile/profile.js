import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, UserMinus, UserPlus, X } from 'lucide-react';
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
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    useEffect(() => {
        if (user && user.username) {
            setFormData({ username: user.username });
            fetchFriendsData();
        }
    }, [user]);

    const fetchFriendsData = async () => {
        try {
            const response = await fetch(`/api/users/${user.username}/friends`);
            if (response.ok) {
                const data = await response.json();
                setFriends(data.friends);
                setFriendRequests(data.friendRequests);
            } else {
                console.error('Error fetching friends data:', await response.text());
            }
        } catch (error) {
            console.error('Error fetching friends data:', error);
        }
    };

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

    const handleLogout = () => {
        logout(); // Call logout from AuthContext
        navigate('/auth'); // Immediately navigate to auth page
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
                login(updatedData);
                setExpandedSection(null);
            } catch (error) {
                console.error('Error updating user data:', error);
            }
        }
    };

    const handleCancel = () => {
        setExpandedSection(null);
        if (user && user.username) {
            setFormData({ username: user.username });
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
                fetchFriendsData();
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
                fetchFriendsData();
            }
        } catch (error) {
            console.error('Error unfriending user:', error);
        }
    };

    const openDeleteConfirmation = () => {
        setShowDeleteConfirmation(true);
    };

    const closeDeleteConfirmation = () => {
        setShowDeleteConfirmation(false);
    };

    const handleDeleteAccount = async () => {
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
        } finally {
            closeDeleteConfirmation();
        }
    };

    const goBack = () => {
        navigate('/home');
    };

    return (
        <div className="flex h-screen overflow-hidden bg-[#000807] text-white font-sans">
            <Sidebar />
            <div className="flex-1 ml-[320px] flex flex-col">
                <div className="flex-1 overflow-y-auto">
                    <div className="p-6">
                        {/* Header */}
                        <div className="flex items-center gap-4 mb-8">
                            <button
                                onClick={goBack}
                                className="p-2 hover:bg-neutral-800 rounded-full transition-colors"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <h2 className="text-2xl font-semibold">Account Settings</h2>
                        </div>

                        {/* Main Content */}
                        <div className="flex gap-8">
                            {/* Sidebar */}
                            <div className="w-64 flex flex-col items-center border-r border-neutral-800 pr-6">
                                <img
                                    src="/assets/images/user/user.jpg"
                                    alt="User"
                                    className="w-48 h-48 rounded-full border-2 border-green-500 mb-4"
                                />
                                <h3 className="text-lg font-medium">
                                    {user?.username}  {/* Use optional chaining instead of ternary */}
                                </h3>
                            </div>

                            {/* Settings Content */}
                            <div className="flex-1 max-w-2xl">
                                {/* Settings Sections */}
                                <div className="space-y-4">
                                    {[
                                        {
                                            name: 'Personal information',
                                            content: (
                                                <div className="space-y-4">
                                                    <input
                                                        type="text"
                                                        name="username"
                                                        placeholder="Full Name"
                                                        value={formData.username}
                                                        onChange={handleInputChange}
                                                        className="w-full p-3 bg-neutral-800 border border-green-500 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                                    />
                                                    <div className="flex gap-4">
                                                        <button
                                                            onClick={() => handleSave('Personal information')}
                                                            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            onClick={handleCancel}
                                                            className="px-6 py-2 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 transition-colors"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        },
                                        {
                                            name: 'Friends',
                                            content: (
                                                <div className="space-y-6">
                                                    <div>
                                                        <h4 className="text-lg font-medium mb-3">Friend Requests</h4>
                                                        {friendRequests.length === 0 ? (
                                                            <p className="text-neutral-400">No pending friend requests.</p>
                                                        ) : (
                                                            <div className="space-y-2">
                                                                {friendRequests.map((friend, index) => (
                                                                    <div key={index} className="flex items-center justify-between p-3 bg-neutral-900 rounded-lg">
                                                                        <span>{friend}</span>
                                                                        <button
                                                                            onClick={() => handleAcceptFriend(friend)}
                                                                            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                                                        >
                                                                            <UserPlus size={16} />
                                                                            Accept
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <h4 className="text-lg font-medium mb-3">Friends</h4>
                                                        {friends.length === 0 ? (
                                                            <p className="text-neutral-400">You have no friends yet.</p>
                                                        ) : (
                                                            <div className="space-y-2">
                                                                {friends.map((friend, index) => (
                                                                    <div key={index} className="flex items-center justify-between p-3 bg-neutral-900 rounded-lg">
                                                                        <span>{friend}</span>
                                                                        <button
                                                                            onClick={() => handleUnfriend(friend)}
                                                                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                                                        >
                                                                            <UserMinus size={16} />
                                                                            Unfriend
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )
                                        },
                                        {
                                            name: 'Settings',
                                            content: (
                                                <div className="space-y-4">
                                                    <label className="flex items-center gap-3 text-lg">
                                                        <input type="checkbox" className="w-5 h-5 rounded bg-neutral-800 border-neutral-600" />
                                                        Dark Mode
                                                    </label>
                                                    <select className="w-full p-3 bg-neutral-800 rounded-lg text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-green-500">
                                                        <option>English</option>
                                                        <option>Spanish</option>
                                                        <option>French</option>
                                                    </select>
                                                </div>
                                            )
                                        }
                                    ].map((item, index) => (
                                        <div
                                            key={index}
                                            className="border-b border-neutral-800 last:border-none"
                                        >
                                            <div
                                                className="flex justify-between items-center py-4 cursor-pointer"
                                                onClick={(e) => toggleSection(item.name, e)}
                                            >
                                                <span className="text-lg font-medium">{item.name}</span>
                                                <span className="text-sm">{expandedSection === item.name ? '▼' : '▶'}</span>
                                            </div>
                                            {expandedSection === item.name && (
                                                <div className="pb-6">{item.content}</div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Bottom Buttons */}
                                <div className="space-y-3 mt-8">
                                    <button
                                        onClick={handleLogout}  // Use the new handler
                                        className="w-full py-3 bg-red-900 hover:bg-red-800 text-white rounded-full transition-colors"
                                    >
                                        LOG OUT
                                    </button>
                                    <button
                                        onClick={openDeleteConfirmation}
                                        className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors"
                                    >
                                        DELETE ACCOUNT
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Delete Confirmation Popup */}
                {showDeleteConfirmation && (
                    <>
                        {/* Overlay */}
                        <div
                            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
                            onClick={closeDeleteConfirmation}
                        />

                        {/* Modal */}
                        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#121212] rounded-xl shadow-xl z-50 overflow-hidden">
                            {/* Header */}
                            <div className="flex justify-between items-center p-6 border-b border-neutral-800">
                                <h3 className="text-xl font-semibold">Delete Account</h3>
                                <button
                                    onClick={closeDeleteConfirmation}
                                    className="p-2 hover:bg-neutral-800 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <p className="text-neutral-300 mb-2">
                                    Are you sure you want to delete your account?
                                </p>
                                <p className="text-neutral-400 text-sm mb-6">
                                    This will permanently delete the account for <span className="text-white font-medium">{user?.username}</span>. This action cannot be undone.
                                </p>

                                {/* Buttons */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={closeDeleteConfirmation}
                                        className="flex-1 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleDeleteAccount}
                                        className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                                    >
                                        Delete Account
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
            {/* Continuing from where we left off */}
        </div>
    );
};

export default ProfileSettings;