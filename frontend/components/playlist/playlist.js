import React from 'react';
import SideBarWithRouter from '../sidebar/sideBar';
import SearchBar from '../search/searchBar';
import { ChevronDown, Plus, X, Trash2 } from 'lucide-react';
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
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.personalPlaylists !== this.props.personalPlaylists) {
            this.setState({ personalPlaylists: this.props.personalPlaylists || [] });
        }
        this.fetchNewReleases();
    }

    toggleDeleteMode = () => {
        this.setState(prevState => ({ isDeleteMode: !prevState.isDeleteMode }));
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
        const { selectedPlaylist } = this.state;

        if (selectedPlaylist && selectedPlaylist._id) {
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

                this.setState(prevState => ({
                    selectedPlaylist: updatedPlaylist,
                    showAddSongsDropdown: false
                }));

                console.log('Song added successfully');
            } catch (error) {
                console.error('Error adding song to playlist:', error);
                alert('Unable to add song to playlist. Please try again or contact support.');
            }
        } else {
            console.error('Unable to add song: selectedPlaylist is missing or invalid');
            alert('Unable to add song to playlist. Please try again or contact support.');
        }
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

        if (newPlaylistName && selectedReleases.length > 0) {
            const newPlaylist = {
                title: newPlaylistName,
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

                // Refresh the list of playlists
                if (this.props.onCreatePlaylist) {
                    this.props.onCreatePlaylist(savedPlaylist);
                }
            } catch (error) {
                console.error('Error creating playlist:', error);
                alert('Unable to create playlist. Please try again or contact support.');
            }
        } else {
            alert('Please enter a playlist name and select at least one release.');
        }
    }

    render() {
        const { newReleases } = this.props;
        const { showSidePanel, showSongSidePanel, selectedReleases, newPlaylistName, selectedPlaylist, showAddSongsDropdown, personalPlaylists, isDeleteMode } = this.state;
        return (
            <div className="playlist-container">
                <SideBarWithRouter />
                <div className="main-content">
                    <SearchBar />
                    <div className="releases-header">
                        <h1>RELEASES</h1>
                        <button onClick={this.toggleDeleteMode} className="delete-mode-btn">
                            {isDeleteMode ? 'Cancel' : 'Delete Releases'}
                        </button>
                    </div>
                    <div className="card-grid">
                        {newReleases.map((release) => (
                            <div key={release._id} className="card">
                                <div className="card-image-container">
                                    <img src={release.image} alt={release.title} />
                                    {isDeleteMode && (
                                        <div className="delete-overlay" onClick={() => this.handleDeleteRelease(release._id)}>
                                            <Trash2 size={24} />
                                        </div>
                                    )}
                                </div>
                                <h3>{release.title}</h3>
                            </div>
                        ))}
                    </div>
                    <div className="playlist-personal">
                        <h1>PERSONAL</h1>
                        <button onClick={this.toggleSidePanel} className="create-playlist-btn">Create Playlist</button>
                    </div>
                    {personalPlaylists.length === 0 ? (
                        <div className="no-playlists">
                            <p>You have no playlists</p>
                            <button onClick={this.toggleSidePanel} className="create-playlist-btn">Create Playlist</button>
                        </div>
                    ) : (
                        <div className="card-grid">
                            {personalPlaylists.map((playlist) => (
                                <div key={playlist.id} className="card" onClick={() => this.openSongSidePanel(playlist)}>
                                    <div className="card-image-container">
                                        <img src={playlist.image} alt={playlist.title} />
                                    </div>
                                    <h3>{playlist.title}</h3>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {showSidePanel && (
                    <div className="side-panel">
                        <div className='header'>
                            <h2 className='header-title'>Add To Playlist</h2>
                            <X className='close' onClick={this.toggleSidePanel} />
                        </div>
                        <input
                            type="text"
                            placeholder="Playlist Name"
                            value={newPlaylistName}
                            onChange={this.handlePlaylistNameChange}
                        />
                        <div className="card-grid">
                            {newReleases.map((release) => (
                                <div
                                    key={release.id}
                                    className={`card ${selectedReleases.includes(release) ? 'selected' : ''}`}
                                    onClick={() => this.toggleReleaseSelection(release)}
                                >
                                    <div className="card-image-container">
                                        <img src={release.image} alt={release.title} />
                                    </div>
                                    <h3>{release.title}</h3>
                                    {selectedReleases.includes(release) && <div className="tick">✓</div>}
                                </div>
                            ))}
                        </div>
                        <button onClick={this.createPlaylist} className="done-button">Done</button>
                    </div>
                )}
                {showSongSidePanel && selectedPlaylist && (
                    <div className="side-panel song-panel">
                        <div className='header'>
                            <h2 className='header-title'>{selectedPlaylist.title}</h2>
                            <X className='close' onClick={this.closeSongSidePanel} />
                        </div>
                        <div className="add-songs-container">
                            <button onClick={this.toggleAddSongsDropdown} className="add-songs-button">
                                Add Songs <ChevronDown />
                            </button>
                            {showAddSongsDropdown && (
                                <div className="add-songs-dropdown">
                                    {newReleases.map((release) => (
                                        <div key={release.id} className="add-song-item" onClick={() => this.handleAddSongToPlaylist(release)}>
                                            <img src={release.image} alt={release.title} className="add-song-image" />
                                            <span>{release.title} - {release.artist}</span>
                                            <Plus className="add-icon" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="song-list">
                            {selectedPlaylist.songs && selectedPlaylist.songs.length > 0 ? (
                                selectedPlaylist.songs.map((song) => (
                                    <div key={song._id} className="song-item">
                                        <span>{song.title} - {song.artist || 'Unknown Artist'}</span>
                                        <div className="song-options">
                                            <span className="options-trigger">:</span>
                                            <div className="options-dropdown">
                                                <button onClick={() => this.handleRemoveSong(song)}>Remove from playlist</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No songs in this playlist yet.</p>
                            )}
                        </div>
                        <div className="delete-playlist-container">
                            <button onClick={this.handleDeletePlaylist} className="delete-playlist-btn">
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                )}
                <style jsx>{`
                .delete-playlist-container {
                    position: absolute;
                    bottom: 20px;
                    right: 20px;
                }
                .delete-playlist-btn {
                    background-color: #e74c3c;
                    color: white;
                    border: none;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: background-color 0.2s;
                }
                .delete-playlist-btn:hover {
                    background-color: #c0392b;
                }
                 .add-songs-container {
                    margin-bottom: 20px;
                    position: relative;
                }
                .releases-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                }
                .delete-mode-btn {
                    background-color: #e74c3c;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 20px;
                    cursor: pointer;
                    font-size: 16px;
                }
                .delete-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                }
                .delete-overlay:hover {
                    background-color: rgba(0, 0, 0, 0.7);
                }
                .add-songs-button {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    padding: 10px;
                    background-color: #1DB954;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
                .add-songs-dropdown {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    width: 100%;
                    max-height: 300px;
                    overflow-y: auto;
                    background-color: #282828;
                    border: 1px solid #333;
                    border-radius: 5px;
                    z-index: 10;
                }
                .add-song-item {
                    display: flex;
                    align-items: center;
                    padding: 10px;
                    cursor: pointer;
                    transition: background-color 0.2s;
                }
                .add-song-item:hover {
                    background-color: #333;
                }
                .add-song-image {
                    width: 40px;
                    height: 40px;
                    object-fit: cover;
                    margin-right: 10px;
                }
                .add-icon {
                    margin-left: auto;
                }
                .playlist-container {
                        display: flex;
                        background-color: #000;
                        color: #fff;
                        font-family: Arial, sans-serif;
                    }
                    .main-content {
                        flex-grow: 1;
                        padding: 20px 20px 20px 90px;
                        overflow-y: auto;
                        height: 100vh;
                    }
                    h1, h2 {
                        font-size: 24px;
                        margin-bottom: 20px;
                    }
                    .card-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                        gap: 20px;
                        margin-bottom: 40px;
                    }
                    .card, .side-panel-card {
                        width: 100%;
                        transition: transform 0.2s;
                        cursor: pointer;
                        position: relative;
                    }
                    .card:hover, .side-panel-card:hover {
                        transform: scale(1.05);
                    }
                    .card-image-container {
                        width: 100%;
                        padding-top: 100%; /* 1:1 Aspect Ratio */
                        position: relative;
                        overflow: hidden;
                    }
                    .card img, .side-panel-card img {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                    .card h3, .side-panel-card h3 {
                        font-size: 14px;
                        margin-top: 10px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .playlist-personal {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 20px;
                    }
                    .create-playlist-btn, .done-button {
                        background-color: #1DB954;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 20px;
                        cursor: pointer;
                        font-size: 16px;
                    }
                    .side-panel {
                        position: fixed;
                        right: 0;
                        top: 0;
                        width: 50%;
                        height: 100%;
                        background-color: #000807;
                        padding: 30px;
                        overflow-y: auto;
                        border: 1px solid #333;
                        display: flex;
                        flex-direction: column;
                    }
                    .side-panel-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                        gap: 15px;
                        overflow-y: auto;
                        max-height: calc(100vh - 200px);
                        margin-bottom: 20px;
                    }
                    .header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 20px;
                    }
                    .close:hover {
                        cursor: pointer;
                    }
                    .header-title {
                        font-size: 24px;
                    }
                    input {
                        width: 100%;
                        padding: 10px;
                        margin-bottom: 20px;
                        background-color: #333;
                        border: 1px solid #00E469;
                        color: #fff;
                        border-radius: 15px;
                    }
                    .done-button {
                        width: 100%;
                        margin-top: auto;
                    }
                    .tick {
                        position: absolute;
                        top: 10px;
                        right: 10px;
                        background-color: rgba(0,0,0,0.7);
                        border-radius: 50%;
                        width: 30px;
                        height: 30px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #1DB954;
                    }
                    .selected {
                        border: 2px solid #1DB954;
                    }
                    .song-panel {
                        width: 50%;
                    }
                    .song-list {
                        margin-top: 20px;
                    }
                    .song-item {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 12px 10px;
                        border-bottom: 1px solid #333;
                    }
                    .song-options {
                        position: static;
                        width: 3%;
                    }
                    .options-trigger {
                        cursor: pointer;
                    }
                    .options-dropdown {
                        display: none;
                        position: absolute;
                        right: 0;
                        background-color: #222;
                        border: 1px solid #444;
                        z-index: 1;
                    }
                    .song-options:hover .options-dropdown {
                        display: block;
                    }
                    .options-dropdown button {
                        display: block;
                        width: 100%;
                        padding: 10px;
                        text-align: left;
                        background: none;
                        border: none;
                        color: white;
                        cursor: pointer;
                    }
                    .options-dropdown button:hover {
                        background-color: #333;
                    }
                    .song-item:hover {
                        background-color: #071816;
                    }
                `}</style>
            </div>
        );
    }
}

export default PlayList;