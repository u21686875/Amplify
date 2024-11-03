import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/AuthContext/authContext';
import {
    Trash2, Edit, ChevronDown, Users, Music, ListMusic,
    MessageSquare, Tag, X, Search, Filter, Save, AlertTriangle
} from 'lucide-react';
import Sidebar from '../../components/sidebar/sideBar';

const AdminPanel = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('users');
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Data states
    const [users, setUsers] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [songs, setSongs] = useState([]);
    const [genres, setGenres] = useState([]);
    const [comments, setComments] = useState([]);

    // Edit states
    const [editingItem, setEditingItem] = useState(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [newGenre, setNewGenre] = useState('');

    useEffect(() => {
        // if (!user?.isAdmin) {
        //     navigate('/home');
        //     return;
        // }
        console.log('my user', user)
        fetchData(activeTab);
    }, [activeTab]);

    const fetchData = async (tab) => {
        setIsLoading(true);
        setError(null);
        try {
            let response;
            switch (tab) {
                case 'users':
                    response = await fetch('/api/admin/users');
                    break;
                case 'playlists':
                    response = await fetch('/api/admin/playlists');
                    break;
                case 'songs':
                    response = await fetch('/api/admin/newReleases');
                    break;
                case 'comments':
                    response = await fetch('/api/admin/comments');
                    break;
                case 'genres':
                    response = await fetch('/api/admin/genres');
                    break;
            }

            if (!response.ok) throw new Error('Failed to fetch data');
            const data = await response.json();

            switch (tab) {
                case 'users':
                    setUsers(data);
                    break;
                case 'playlists':
                    setPlaylists(data);
                    break;
                case 'songs':
                    setSongs(data);
                    break;
                case 'comments':
                    setComments(data);
                    break;
                case 'genres':
                    setGenres(data);
                    break;
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (type, id) => {
        try {
            let url = `/api/admin/${type}/${id}`;
            if (type === 'comments' && itemToDelete?.item?.releaseId) {
                url = `/api/admin/comments/${itemToDelete.item.releaseId}/${id}`;
            }

            const response = await fetch(url, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete item');
            fetchData(activeTab);
        } catch (err) {
            setError(err.message);
        }
    };


    const handleSave = async (type, item) => {
        try {
            let url = `/api/admin/${type}/${item._id}`;
            if (type === 'comments' && item.releaseId) {
                url = `/api/admin/comments/${item.releaseId}/${item._id}`;
            }

            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            });
            if (!response.ok) throw new Error('Failed to update item');
            setEditingItem(null);
            fetchData(activeTab);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleAddGenre = async () => {
        if (!newGenre.trim()) return;
        try {
            const response = await fetch('/api/admin/genres', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newGenre }),
            });
            if (!response.ok) throw new Error('Failed to add genre');
            setNewGenre('');
            fetchData('genres');
        } catch (err) {
            setError(err.message);
        }
    };

    const confirmDelete = (item, type) => {
        setItemToDelete({ item, type });
        setShowConfirmDialog(true);
    };

    const renderUsers = () => (
        <div className="space-y-4">
            {users.map(user => (
                <div key={user._id} className="bg-neutral-800 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-medium">{user.username}</h3>
                            <p className="text-sm text-neutral-400">{user.email}</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setEditingItem(user)}
                                className="p-2 hover:bg-neutral-700 rounded-full"
                            >
                                <Edit size={20} />
                            </button>
                            <button
                                onClick={() => confirmDelete(user, 'users')}
                                className="p-2 hover:bg-red-600 rounded-full"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderPlaylists = () => (
        <div className="space-y-4">
            {playlists.map(playlist => (
                <div key={playlist._id} className="bg-neutral-800 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-4">
                            <img
                                src={playlist.image || '/default-playlist.jpg'}
                                alt={playlist.title}
                                className="w-16 h-16 rounded object-cover"
                            />
                            <div>
                                <h3 className="text-lg font-medium">{playlist.title}</h3>
                                <p className="text-sm text-neutral-400">
                                    {playlist.songs?.length || 0} songs • Created by {playlist.creator?.username}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setEditingItem(playlist)}
                                className="p-2 hover:bg-neutral-700 rounded-full"
                            >
                                <Edit size={20} />
                            </button>
                            <button
                                onClick={() => confirmDelete(playlist, 'playlists')}
                                className="p-2 hover:bg-red-600 rounded-full"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderSongs = () => (
        <div className="space-y-4">
            {songs.map(song => (
                <div key={song._id} className="bg-neutral-800 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-4">
                            <img
                                src={song.image}
                                alt={song.title}
                                className="w-16 h-16 rounded object-cover"
                            />
                            <div>
                                <h3 className="text-lg font-medium">{song.title}</h3>
                                <p className="text-sm text-neutral-400">
                                    {song.artist}
                                </p>
                                <p className="text-sm text-neutral-400">
                                    Comments: {song.comments?.length || 0}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setEditingItem(song)}
                                className="p-2 hover:bg-neutral-700 rounded-full"
                            >
                                <Edit size={20} />
                            </button>
                            <button
                                onClick={() => confirmDelete(song, 'newReleases')}
                                className="p-2 hover:bg-red-600 rounded-full"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );


    const renderComments = () => (
        <div className="space-y-4">
            {comments.map(comment => (
                <div key={comment._id} className="bg-neutral-800 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <img
                                    src={comment.userImage || '/default-avatar.jpg'}
                                    alt={comment.userName}
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                                <span className="font-medium">{comment.userName}</span>
                            </div>
                            <p className="text-sm text-neutral-400 mb-2">{comment.text}</p>
                            <div className="text-xs text-neutral-500">
                                <p>Song: {comment.songTitle}</p>
                                <p>Artist: {comment.songArtist}</p>
                                <p>Likes: {comment.likes || 0} • Dislikes: {comment.dislikes || 0}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setEditingItem({ ...comment, type: 'comments' })}
                                className="p-2 hover:bg-neutral-700 rounded-full"
                            >
                                <Edit size={20} />
                            </button>
                            <button
                                onClick={() => confirmDelete(comment, 'comments')}
                                className="p-2 hover:bg-red-600 rounded-full"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );


    const renderGenres = () => (
        <div className="space-y-4">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={newGenre}
                    onChange={(e) => setNewGenre(e.target.value)}
                    placeholder="Add new genre..."
                    className="flex-1 p-2 bg-neutral-700 rounded-lg"
                />
                <button
                    onClick={handleAddGenre}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg"
                >
                    Add Genre
                </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {genres.map(genre => (
                    <div key={genre._id} className="bg-neutral-800 p-4 rounded-lg flex justify-between items-center">
                        <span>{genre.name}</span>
                        <button
                            onClick={() => confirmDelete(genre, 'genres')}
                            className="p-2 hover:bg-red-600 rounded-full"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );

    // Update the EditModal component:
    const EditModal = ({ item, type, onSave, onClose }) => {
        const [editedItem, setEditedItem] = useState(item);
        const [selectedSongs, setSelectedSongs] = useState([]);
        const [songs, setSongs] = useState([]);

        useEffect(() => {
            if (type === 'playlists') {
                // Fetch songs for the dropdown
                fetch('/api/admin/newReleases')
                    .then(res => res.json())
                    .then(data => setSongs(data))
                    .catch(err => console.error('Error fetching songs:', err));
            }
        }, [type]);

        const handleSongSelection = (songId) => {
            const song = songs.find(s => s._id === songId);
            if (song) {
                setEditedItem(prev => ({
                    ...prev,
                    songs: [...(prev.songs || []), { title: song.title, artist: song.artist }]
                }));
            }
        };

        // Filter out unnecessary fields
        const excludeFields = ['_v', '_id', 'friends', 'friendRequests', 'createdAt', 'comments'];
        const fieldKeys = Object.keys(editedItem).filter(key => !excludeFields.includes(key));

        const renderField = (key) => {
            switch (key) {
                case 'image':
                    return (
                        <div key={key} className="space-y-2">
                            <label className="text-sm text-neutral-400">Image Upload</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setEditedItem({
                                                ...editedItem,
                                                [key]: reader.result
                                            });
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                                className="w-full p-2 bg-neutral-800 rounded-lg"
                            />
                            {editedItem[key] && (
                                <img
                                    src={editedItem[key]}
                                    alt="Preview"
                                    className="w-20 h-20 object-cover rounded"
                                />
                            )}
                        </div>
                    );
                case 'songs':
                    return (
                        <div key={key} className="space-y-2">
                            <label className="text-sm text-neutral-400">Songs</label>
                            <select
                                onChange={(e) => handleSongSelection(e.target.value)}
                                className="w-full p-2 bg-neutral-800 rounded-lg"
                            >
                                <option value="">Select a song to add</option>
                                {songs.map(song => (
                                    <option key={song._id} value={song._id}>
                                        {song.title} - {song.artist}
                                    </option>
                                ))}
                            </select>
                            <div className="mt-2 space-y-2">
                                {editedItem.songs?.map((song, index) => (
                                    <div key={index} className="flex justify-between items-center bg-neutral-700 p-2 rounded">
                                        <span>{song.title} - {song.artist}</span>
                                        <button
                                            onClick={() => {
                                                const newSongs = [...editedItem.songs];
                                                newSongs.splice(index, 1);
                                                setEditedItem({ ...editedItem, songs: newSongs });
                                            }}
                                            className="text-red-500 hover:text-red-600"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                case 'isAdmin':
                    return (
                        <div key={key} className="space-y-2">
                            <label className="text-sm text-neutral-400">Is Admin</label>
                            <select
                                value={editedItem[key] || false}
                                onChange={(e) => setEditedItem({
                                    ...editedItem,
                                    [key]: e.target.value === 'true'
                                })}
                                className="w-full p-2 bg-neutral-800 rounded-lg"
                            >
                                <option value="false">No</option>
                                <option value="true">Yes</option>
                            </select>
                        </div>
                    );
                case 'createdAt':
                    return (
                        <div key={key} className="space-y-2">
                            <label className="text-sm text-neutral-400">{key}</label>
                            <input
                                type="datetime-local"
                                value={editedItem[key] ? new Date(editedItem[key]).toISOString().slice(0, 16) : ''}
                                onChange={(e) => setEditedItem({
                                    ...editedItem,
                                    [key]: new Date(e.target.value).toISOString()
                                })}
                                className="w-full p-2 bg-neutral-800 rounded-lg"
                            />
                        </div>
                    );
                default:
                    return (
                        <div key={key} className="space-y-2">
                            <label className="text-sm text-neutral-400">{key}</label>
                            <input
                                type="text"
                                value={editedItem[key] || ''}
                                onChange={(e) => setEditedItem({
                                    ...editedItem,
                                    [key]: e.target.value
                                })}
                                className="w-full p-2 bg-neutral-800 rounded-lg"
                            />
                        </div>
                    );
            }
        };

        return (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
                <div className="bg-neutral-900 rounded-xl max-w-lg w-full p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold">Edit {type}</h3>
                        <button onClick={onClose} className="p-2 hover:bg-neutral-800 rounded-full">
                            <X size={20} />
                        </button>
                    </div>
                    <div className="space-y-4 max-h-[70vh] overflow-y-auto">
                        {fieldKeys.map(key => renderField(key))}
                    </div>
                    <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-neutral-800">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-neutral-800 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => onSave(type, editedItem)}
                            className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    // Delete Confirmation Dialog
    const DeleteConfirmDialog = ({ item, type, onConfirm, onCancel }) => (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
            <div className="bg-neutral-900 rounded-xl max-w-md w-full p-6">
                <div className="flex items-center gap-3 text-red-500 mb-4">
                    <AlertTriangle />
                    <h3 className="text-xl font-semibold">Confirm Delete</h3>
                </div>
                <p className="text-neutral-300 mb-6">
                    Are you sure you want to delete this {type.slice(0, -1)}? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-neutral-800 rounded-lg"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onConfirm(type, item._id)}
                        className="px-4 py-2 bg-red-500 rounded-lg"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex h-screen overflow-hidden bg-[#000807] text-white">
            {/* <Sidebar /> */}
            <div className="flex-1 flex flex-col">
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

                    {/* Navigation Tabs */}
                    <div className="flex gap-4 mb-6 border-b border-neutral-700">
                        {[
                            { id: 'users', icon: Users, label: 'Users' },
                            { id: 'playlists', icon: ListMusic, label: 'Playlists' },
                            { id: 'songs', icon: Music, label: 'Songs' },
                            { id: 'comments', icon: MessageSquare, label: 'Comments' },
                            { id: 'genres', icon: Tag, label: 'Genres' }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2 -mb-px ${activeTab === tab.id
                                        ? 'border-b-2 border-green-500 text-green-500'
                                        : 'text-neutral-400 hover:text-white'
                                    }`}
                            >
                                <tab.icon size={20} />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Search and Filter Bar */}
                    <div className="flex gap-4 mb-6">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
                            <input
                                type="text"
                                placeholder={`Search ${activeTab}...`}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-neutral-800 rounded-lg"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-neutral-800 rounded-lg">
                            <Filter size={20} />
                            Filter
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-y-auto">
                        {isLoading ? (
                            <div className="flex items-center justify-center h-64">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500" />
                            </div>
                        ) : error ? (
                            <div className="text-red-500 text-center py-8">
                                {error}
                            </div>
                        ) : (
                            <>
                                {activeTab === 'users' && renderUsers()}
                                {activeTab === 'playlists' && renderPlaylists()}
                                {activeTab === 'songs' && renderSongs()}
                                {activeTab === 'comments' && renderComments()}
                                {activeTab === 'genres' && renderGenres()}
                            </>
                        )}
                    </div>
                </div>

                {/* Edit Modal */}
                {editingItem && (
                    <EditModal
                        item={editingItem}
                        type={activeTab}
                        onSave={handleSave}
                        onClose={() => setEditingItem(null)}
                    />
                )}

                {/* Delete Confirmation Dialog */}
                {showConfirmDialog && itemToDelete && (
                    <DeleteConfirmDialog
                        item={itemToDelete.item}
                        type={itemToDelete.type}
                        onConfirm={(type, id) => {
                            handleDelete(type, id);
                            setShowConfirmDialog(false);
                            setItemToDelete(null);
                        }}
                        onCancel={() => {
                            setShowConfirmDialog(false);
                            setItemToDelete(null);
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default AdminPanel;