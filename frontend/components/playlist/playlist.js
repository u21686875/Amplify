import React from 'react';
import SideBarWithRouter from '../sidebar/sideBar';
import SearchBar from '../search/searchBar';
import { ChevronDown, Plus, X, Trash2, AlertTriangle, ChevronLeft, ChevronRight, Send } from 'lucide-react';

const CustomAlert = ({ message, onConfirm, onCancel }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-neutral-800 p-6 rounded-lg max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4 text-yellow-500">
                <AlertTriangle />
                <h3 className="text-lg font-semibold">Duplicate Song</h3>
            </div>
            <p className="text-neutral-200 mb-6">{message}</p>
            <div className="flex justify-end gap-3">
                <button
                    onClick={onCancel}
                    className="px-4 py-2 rounded bg-neutral-700 hover:bg-neutral-600 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={onConfirm}
                    className="px-4 py-2 rounded bg-green-500 hover:bg-green-600 transition-colors"
                >
                    Add Anyway
                </button>
            </div>
        </div>
    </div>
);

// Reusable delete confirmation alert
const DeleteAlert = ({ release, onConfirm, onCancel }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-neutral-800 p-6 rounded-lg max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4 text-red-500">
                <AlertTriangle />
                <h3 className="text-lg font-semibold">Delete Release</h3>
            </div>

            <div className="mb-6">
                <div className="flex items-start gap-4">
                    <img
                        src={release.image}
                        alt={release.title}
                        className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                        <p className="text-neutral-200 font-medium">{release.title}</p>
                        <p className="text-neutral-400 text-sm">{release.artist}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {release.hashtags?.map((tag, index) => (
                                <span
                                    key={index}
                                    className="text-xs px-2 py-1 bg-neutral-700 rounded-full text-neutral-300"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-4 text-neutral-300 text-sm">
                    <p>This will permanently delete:</p>
                    <ul className="list-disc list-inside mt-2 text-neutral-400">
                        <li>Release information</li>
                        <li>{release.comments?.length || 0} comments</li>
                        <li>Associated hashtags</li>
                    </ul>
                </div>
            </div>

            <div className="flex justify-end gap-3">
                <button
                    onClick={onCancel}
                    className="px-4 py-2 rounded bg-neutral-700 hover:bg-neutral-600 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={() => onConfirm(release._id)}
                    className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 transition-colors"
                >
                    Delete Release
                </button>
            </div>
        </div>
    </div>
);



const CommentCard = ({ comment, currentUser }) => (
    <div className="bg-neutral-800 rounded-lg p-4 w-full mx-auto">
        <div className="flex items-center gap-3 mb-3">
            <img
                src={comment.userImage || '/default-avatar.png'}
                alt={comment.userName}
                className="w-10 h-10 rounded-full object-cover"
            />
            <div>
                <h4 className="font-medium">{comment.userName}</h4>
                <span className="text-xs text-neutral-400">
                    {new Date(comment.createdAt).toLocaleDateString()}
                </span>
            </div>
        </div>
        <p className="text-neutral-200">{comment.text}</p>
    </div>
);


const CommentCarousel = ({ comments, currentIndex, onPrevious, onNext }) => (
    <div className="relative w-full py-6">
        <div className="flex items-center">
            <button
                onClick={onPrevious}
                className="absolute left-0 z-10 p-2 bg-neutral-800 rounded-full hover:bg-neutral-700 transition-colors disabled:opacity-50"
                disabled={currentIndex === 0}
            >
                <ChevronLeft size={20} />
            </button>

            <div className="w-full px-12">
                {comments.length > 0 ? (
                    <CommentCard comment={comments[currentIndex]} />
                ) : (
                    <p className="text-center text-neutral-400">No comments yet</p>
                )}
            </div>

            <button
                onClick={onNext}
                className="absolute right-0 z-10 p-2 bg-neutral-800 rounded-full hover:bg-neutral-700 transition-colors disabled:opacity-50"
                disabled={currentIndex === comments.length - 1}
            >
                <ChevronRight size={20} />
            </button>
        </div>

        {/* Comment count indicators */}
        <div className="flex justify-center gap-1 mt-4">
            {comments.map((_, index) => (
                <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-green-500' : 'bg-neutral-600'
                        }`}
                />
            ))}
        </div>
    </div>
);



class PlayList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSidePanel: false,
            showSongSidePanel: false,
            selectedReleases: [],
            newPlaylistName: '',
            selectedPlaylist: null,
            showAddSongsDropdown: false,
            newReleases: [],
            personalPlaylists: props.personalPlaylists || [],
            isDeleteMode: false,
            showDuplicateAlert: false,
            duplicateSongInfo: null,
            commentText: '',
            currentCommentIndex: 0,
            comments: [], // Will store comments for the selected playlist
            isDeleteMode: false,
            deleteConfirm: null,
        };
    }

    componentDidUpdate(prevProps) {
        // Only update personalPlaylists if they've changed
        if (prevProps.personalPlaylists !== this.props.personalPlaylists) {
            this.setState({ personalPlaylists: this.props.personalPlaylists || [] });
        }

        // Only fetch new releases if they've changed
        if (prevProps.newReleases !== this.props.newReleases && !this.state.newReleases.length) {
            this.fetchNewReleases();
        }
    }

    // Move initial fetch to componentDidMount
    componentDidMount() {
        this.fetchNewReleases();
    }

    generateDefaultPlaylistName = () => {
        const baseNamePrefix = "My Playlist";
        const existingNames = this.state.personalPlaylists.map(p => p.title);
        let counter = existingNames.length + 1;
        let newName = `${baseNamePrefix} #${counter}`;

        // Keep incrementing counter until we find a unique name
        while (existingNames.includes(newName)) {
            counter++;
            newName = `${baseNamePrefix} #${counter}`;
        }

        return newName;
    }

    toggleDeleteMode = () => {
        this.setState(prevState => ({
            isDeleteMode: !prevState.isDeleteMode,
            deleteConfirm: null // Reset any pending delete confirmation when toggling mode
        }));
    }


    handleCommentSubmit = async (e) => {
        e.preventDefault();
        const { commentText, selectedPlaylist } = this.state;

        if (!commentText.trim()) return;

        try {
            const response = await fetch(`/api/playlists/${selectedPlaylist._id}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: commentText,
                    userName: this.props.currentUser.username,
                    userImage: this.props.currentUser.profileImage,
                }),
            });

            if (!response.ok) throw new Error('Failed to add comment');

            const newComment = await response.json();
            this.setState(prevState => ({
                comments: [...prevState.comments, newComment],
                commentText: '',
                currentCommentIndex: prevState.comments.length // Show the new comment
            }));
        } catch (error) {
            console.error('Error adding comment:', error);
            alert('Failed to add comment. Please try again.');
        }
    };

    handleNextComment = () => {
        this.setState(prevState => ({
            currentCommentIndex: Math.min(prevState.currentCommentIndex + 1, prevState.comments.length - 1)
        }));
    };

    handlePreviousComment = () => {
        this.setState(prevState => ({
            currentCommentIndex: Math.max(prevState.currentCommentIndex - 1, 0)
        }));
    };

    handleDeleteClick = (release) => {
        this.setState({
            deleteConfirm: release
        });
    }

    handleDeleteConfirm = async (releaseId) => {
        try {
            const response = await fetch(`/api/newReleases/${releaseId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Remove the deleted release from the state
            this.setState(prevState => ({
                newReleases: prevState.newReleases.filter(release => release._id !== releaseId),
                deleteConfirm: null
            }));

        } catch (error) {
            console.error('Error deleting release:', error);
            alert('Unable to delete release. Please try again or contact support.');
        }
    }

    handleDeleteCancel = () => {
        this.setState({ deleteConfirm: null });
    }

    handleDeleteRelease = async (releaseId) => {
        try {
            const response = await fetch(`/api/newReleases/${releaseId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Remove the deleted release from the state
            this.setState(prevState => ({
                newReleases: prevState.newReleases.filter(release => release._id !== releaseId)
            }));

            console.log('Release deleted successfully');
        } catch (error) {
            console.error('Error deleting release:', error);
            alert('Unable to delete release. Please try again or contact support.');
        }
    }


    fetchNewReleases = async () => {
        try {
            const response = await fetch('/api/newReleases');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.setState({ newReleases: data });
        } catch (error) {
            console.error('Error fetching new releases:', error);
        }
    }

    toggleSidePanel = () => {
        this.setState(prevState => ({ showSidePanel: !prevState.showSidePanel }));
    }

    toggleAddSongsDropdown = () => {
        this.setState(prevState => ({ showAddSongsDropdown: !prevState.showAddSongsDropdown }));
    }

    handleDeletePlaylist = async () => {
        const { selectedPlaylist } = this.state;
        if (selectedPlaylist && selectedPlaylist._id) {
            try {
                const response = await fetch(`/api/personalPlaylists/${selectedPlaylist._id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                // Remove the deleted playlist from the state
                this.setState(prevState => ({
                    personalPlaylists: prevState.personalPlaylists.filter(playlist => playlist._id !== selectedPlaylist._id),
                    showSongSidePanel: false,
                    selectedPlaylist: null
                }));

                // Notify the parent component about the deletion
                if (this.props.onDeletePlaylist) {
                    this.props.onDeletePlaylist(selectedPlaylist._id);
                }

                console.log('Playlist deleted successfully');
            } catch (error) {
                console.error('Error deleting playlist:', error);
                alert('Unable to delete playlist. Please try again or contact support.');
            }
        }
    }


    handleAddSongToPlaylist = async (release) => {
        // Check for duplicate
        if (this.checkForDuplicateSong(release)) {
            this.setState({
                showDuplicateAlert: true,
                duplicateSongInfo: {
                    release,
                    message: `"${release.title}" by ${release.artist} is already in this playlist.`
                }
            });
            return;
        }

        await this.addSongToPlaylist(release);
    }

    addSongToPlaylist = async (release) => {
        const { selectedPlaylist } = this.state;

        if (!selectedPlaylist || !selectedPlaylist._id) {
            console.error('No playlist selected');
            return;
        }

        const newSong = {
            title: release.title,
            artist: release.artist
        };

        try {
            const response = await fetch(`/api/personalPlaylists/${selectedPlaylist._id}/songs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newSong),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const updatedPlaylist = await response.json();

            this.setState({
                selectedPlaylist: updatedPlaylist,
                showAddSongsDropdown: false,
                showDuplicateAlert: false,
                duplicateSongInfo: null
            });

        } catch (error) {
            console.error('Error adding song to playlist:', error);
            alert('Unable to add song to playlist. Please try again or contact support.');
        }
    }

    handleDuplicateConfirm = async () => {
        const { duplicateSongInfo } = this.state;
        if (duplicateSongInfo) {
            await this.addSongToPlaylist(duplicateSongInfo.release);
        }
    }

    handleDuplicateCancel = () => {
        this.setState({
            showDuplicateAlert: false,
            duplicateSongInfo: null
        });
    }

    closeSongSidePanel = () => {
        this.setState({
            showSongSidePanel: false,
            selectedPlaylist: null
        });
    }

    openSongSidePanel = (playlist) => {
        this.setState({
            showSongSidePanel: true,
            selectedPlaylist: playlist
        });
    }

    toggleSongPanel = (playlist) => {
        this.setState(prevState => ({
            showSongPanel: !prevState.showSongPanel,
            showSidePanel: false,
            selectedPlaylist: playlist
        }));
    }

    toggleReleaseSelection = (release) => {
        this.setState(prevState => ({
            selectedReleases: prevState.selectedReleases.includes(release)
                ? prevState.selectedReleases.filter(r => r.id !== release.id)
                : [...prevState.selectedReleases, release]
        }));
    }

    handlePlaylistNameChange = (event) => {
        this.setState({ newPlaylistName: event.target.value });
    }

    handleRemoveSong = async (song) => {
        const { selectedPlaylist } = this.state;
        if (selectedPlaylist && selectedPlaylist._id && song && song._id) {
            try {
                const response = await fetch(`/api/personalPlaylists/${selectedPlaylist._id}/songs/${song._id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const updatedPlaylist = await response.json();

                this.setState({
                    selectedPlaylist: updatedPlaylist
                });
            } catch (error) {
                console.error('Error removing song from playlist:', error);
                alert('Unable to remove song from playlist. Please try again or contact support.');
            }
        } else {
            console.error('Unable to remove song: Missing playlist ID or song ID');
            alert('Unable to remove song from playlist. Please try again or contact support.');
        }
    }


    createPlaylist = async () => {
        const { newPlaylistName, selectedReleases } = this.state;

        if (selectedReleases.length === 0) {
            alert('Please select at least one release.');
            return;
        }

        // Use default name if none provided
        const playlistName = newPlaylistName.trim() || this.generateDefaultPlaylistName();

        const newPlaylist = {
            title: playlistName,
            image: selectedReleases[0].image,
            songs: selectedReleases.map(release => ({
                title: release.title,
                artist: release.artist
            }))
        };

        try {
            const response = await fetch('/api/personalPlaylists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPlaylist),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const savedPlaylist = await response.json();

            this.setState({
                showSidePanel: false,
                selectedReleases: [],
                newPlaylistName: ''
            });

            if (this.props.onCreatePlaylist) {
                this.props.onCreatePlaylist(savedPlaylist);
            }
        } catch (error) {
            console.error('Error creating playlist:', error);
            alert('Unable to create playlist. Please try again or contact support.');
        }
    }

    checkForDuplicateSong = (release) => {
        const { selectedPlaylist } = this.state;
        if (!selectedPlaylist || !selectedPlaylist.songs) return false;

        return selectedPlaylist.songs.some(
            song => song.title.toLowerCase() === release.title.toLowerCase() &&
                song.artist.toLowerCase() === release.artist.toLowerCase()
        );
    }

    render() {
        const { newReleases } = this.props;
        const {
            showSidePanel,
            showSongSidePanel,
            selectedReleases,
            newPlaylistName,
            selectedPlaylist,
            showAddSongsDropdown,
            personalPlaylists,
            isDeleteMode,
            showDuplicateAlert,
            duplicateSongInfo,
            deleteConfirm,
        } = this.state;

        return (
            <div className="flex h-screen overflow-hidden bg-[#000807] text-white font-sans">
                <SideBarWithRouter />
                <div className="flex-1 ml-[300px] flex flex-col">
                    <SearchBar />
                    <div className="flex-1 overflow-y-auto">
                        <div className="p-5">
                            <div className="flex justify-between items-center mb-5">
                                <h1 className="text-2xl">RELEASES</h1>
                                <button
                                    onClick={this.toggleDeleteMode}
                                    className={`px-5 py-2 rounded-full text-base cursor-pointer transition-colors ${isDeleteMode
                                        ? 'bg-neutral-600 hover:bg-neutral-700'
                                        : 'bg-red-600 hover:bg-red-700'
                                        } text-white`}
                                >
                                    {isDeleteMode ? 'Cancel' : 'Delete Releases'}
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mb-10">
                                {newReleases.map((release) => (
                                    <div key={release._id} className="w-full relative group">
                                        <div className="relative w-full pt-[100%] overflow-hidden">
                                            <img
                                                src={release.image}
                                                alt={release.title}
                                                className="absolute top-0 left-0 w-full h-full object-cover"
                                            />
                                            {isDeleteMode && (
                                                <div
                                                    className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer hover:bg-black/70 transition-colors"
                                                    onClick={() => this.handleDeleteClick(release)}
                                                >
                                                    <Trash2 className="w-6 h-6 text-red-500" />
                                                </div>
                                            )}
                                        </div>
                                        <h3 className="text-sm mt-2 truncate">{release.title}</h3>
                                        <p className="text-xs text-neutral-400 truncate">{release.artist}</p>
                                    </div>
                                ))}
                            </div>

                            {deleteConfirm && (
                                <DeleteAlert
                                    release={deleteConfirm}
                                    onConfirm={this.handleDeleteConfirm}
                                    onCancel={this.handleDeleteCancel}
                                />
                            )}

                            <div className="flex justify-between items-center mb-5">
                                <h1 className="text-2xl">PERSONAL</h1>
                                <button
                                    onClick={this.toggleSidePanel}
                                    className="bg-green-500 text-white px-5 py-2 rounded-full text-base cursor-pointer hover:bg-green-600"
                                >
                                    Create Playlist
                                </button>
                            </div>

                            {personalPlaylists.length === 0 ? (
                                <div className="text-center py-10">
                                    <p className="mb-4">You have no playlists</p>
                                    <button
                                        onClick={this.toggleSidePanel}
                                        className="bg-green-500 text-white px-5 py-2 rounded-full text-base cursor-pointer hover:bg-green-600"
                                    >
                                        Create Playlist
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                                    {personalPlaylists.map((playlist) => (
                                        <div
                                            key={playlist._id} // Changed from playlist.id to playlist._id
                                            className="w-full transform transition-transform duration-200 hover:scale-105 cursor-pointer"
                                            onClick={() => this.openSongSidePanel(playlist)}
                                        >
                                            <div className="relative w-full pt-[100%]">
                                                <img
                                                    src={playlist.image}
                                                    alt={playlist.title}
                                                    className="absolute top-0 left-0 w-full h-full object-cover"
                                                />
                                            </div>
                                            <h3 className="text-sm mt-2 truncate">
                                                {playlist.title}
                                            </h3>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {showSidePanel && (
                    <div className="fixed right-0 top-0 w-1/2 h-full bg-[#000807] p-8 overflow-y-auto border border-neutral-700 flex flex-col">
                        <div className="flex justify-between items-center mb-5">
                            <h2 className="text-2xl">Add To Playlist</h2>
                            <X className="cursor-pointer" onClick={this.toggleSidePanel} />
                        </div>
                        <input
                            type="text"
                            placeholder="Playlist Name"
                            value={newPlaylistName}
                            onChange={this.handlePlaylistNameChange}
                            className="w-full p-2 mb-5 bg-neutral-800 border border-green-500 text-white rounded-2xl"
                        />
                        <div className="grid grid-cols-2 gap-4 mb-5">
                            {newReleases.map((release) => (
                                <div
                                    key={release.id}
                                    className={`relative cursor-pointer ${selectedReleases.includes(release) ? 'border-2 border-green-500' : ''}`}
                                    onClick={() => this.toggleReleaseSelection(release)}
                                >
                                    <div className="relative w-full pt-[100%]">
                                        <img
                                            src={release.image}
                                            alt={release.title}
                                            className="absolute top-0 left-0 w-full h-full object-cover"
                                        />
                                    </div>
                                    <h3 className="text-sm mt-2 truncate">{release.title}</h3>
                                    {selectedReleases.includes(release) && (
                                        <div className="absolute top-2 right-2 w-8 h-8 bg-black/70 rounded-full flex items-center justify-center text-green-500">✓</div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={this.createPlaylist}
                            className="w-full bg-green-500 text-white py-2 rounded-full mt-auto hover:bg-green-600"
                        >
                            Done
                        </button>
                    </div>
                )}

                {showDuplicateAlert && duplicateSongInfo && (
                    <CustomAlert
                        message={duplicateSongInfo.message}
                        onConfirm={this.handleDuplicateConfirm}
                        onCancel={this.handleDuplicateCancel}
                    />
                )}

                {showSongSidePanel && selectedPlaylist && (
                    <div className="fixed right-0 top-0 w-1/2 h-full bg-[#000807] p-8 overflow-y-auto border border-neutral-700">
                        <div className="flex justify-between items-center mb-5">
                            <h2 className="text-2xl">{selectedPlaylist.title}</h2>
                            <X className="cursor-pointer" onClick={this.closeSongSidePanel} />
                        </div>

                        <div className="relative mb-5">
                            <button
                                onClick={this.toggleAddSongsDropdown}
                                className="flex items-center justify-between w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                Add Songs <ChevronDown />
                            </button>
                            {showAddSongsDropdown && (
                                <div className="absolute top-full left-0 w-full max-h-72 overflow-y-auto bg-neutral-800 border border-neutral-700 rounded mt-1 z-10">
                                    {newReleases.map((release) => (
                                        <div
                                            key={release.id}
                                            className="flex items-center p-2 hover:bg-neutral-700 cursor-pointer"
                                            onClick={() => this.handleAddSongToPlaylist(release)}
                                        >
                                            <img
                                                src={release.image}
                                                alt={release.title}
                                                className="w-10 h-10 object-cover mr-2"
                                            />
                                            <span className="flex-grow">{release.title} - {release.artist}</span>
                                            <Plus className="ml-2" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="space-y-1">
                            {selectedPlaylist.songs && selectedPlaylist.songs.length > 0 ? (
                                selectedPlaylist.songs.map((song) => (
                                    <div key={song._id} className="flex justify-between items-center p-3 hover:bg-[#071816] group">
                                        <span>{song.title} - {song.artist || 'Unknown Artist'}</span>
                                        <div className="relative group">
                                            <span className="cursor-pointer">:</span>
                                            <div className="hidden group-hover:block absolute right-0 bg-neutral-800 border border-neutral-700 w-48">
                                                <button
                                                    onClick={() => this.handleRemoveSong(song)}
                                                    className="w-full px-4 py-2 text-left hover:bg-neutral-700"
                                                >
                                                    Remove from playlist
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center py-4">No songs in this playlist yet.</p>
                            )}
                        </div>

                        <div className="absolute bottom-5 right-5">
                            <button
                                onClick={this.handleDeletePlaylist}
                                className="w-10 h-10 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default PlayList;