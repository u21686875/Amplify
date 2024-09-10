import React from 'react';
import SideBarWithRouter from '../sidebar/sideBar';
import SearchBar from '../search/searchBar';
import { ChevronDown } from 'lucide-react';
import { Plus } from 'lucide-react';
import { X } from 'lucide-react';
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
        };
    }

    toggleSidePanel = () => {
        this.setState(prevState => ({ showSidePanel: !prevState.showSidePanel }));
    }

    toggleAddSongsDropdown = () => {
        this.setState(prevState => ({ showAddSongsDropdown: !prevState.showAddSongsDropdown }));
    }

    handleAddSongToPlaylist = (release) => {
        const { selectedPlaylist } = this.state;
        const { onAddSongToPlaylist } = this.props;

        console.log('Selected Playlist:', selectedPlaylist);
        console.log('onAddSongToPlaylist prop:', onAddSongToPlaylist);

        if (selectedPlaylist && onAddSongToPlaylist) {
            const newSong = {
                id: Date.now(),
                title: release.title,
                artist: release.artist
            };

            onAddSongToPlaylist(selectedPlaylist.id, newSong);

            // Update local state
            this.setState(prevState => ({
                selectedPlaylist: {
                    ...prevState.selectedPlaylist,
                    songs: [...prevState.selectedPlaylist.songs, newSong]
                },
                showAddSongsDropdown: false
            }));

            console.log('Song added successfully');
        } else {
            console.error('Unable to add song: selectedPlaylist or onAddSongToPlaylist is missing');
            console.log('selectedPlaylist:', selectedPlaylist);
            console.log('onAddSongToPlaylist:', onAddSongToPlaylist);
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

    handleRemoveSong = (songId) => {
        const { onRemoveSongFromPlaylist } = this.props;
        const { selectedPlaylist } = this.state;
        if (onRemoveSongFromPlaylist && selectedPlaylist) {
            onRemoveSongFromPlaylist(selectedPlaylist.id, songId);

            // Update the local state to reflect the change immediately
            this.setState(prevState => ({
                selectedPlaylist: {
                    ...prevState.selectedPlaylist,
                    songs: prevState.selectedPlaylist.songs.filter(song => song.id !== songId)
                }
            }));
        }
    }

    createPlaylist = () => {
        const { newPlaylistName, selectedReleases } = this.state;
        const { onCreatePlaylist } = this.props;

        if (newPlaylistName && selectedReleases.length > 0 && onCreatePlaylist) {
            const newPlaylist = {
                id: Date.now(),
                title: newPlaylistName,
                image: selectedReleases[0].image,
                songs: selectedReleases.map(release => ({
                    id: Date.now() + Math.random(),
                    title: release.title,
                    artist: 'Unknown Artist'
                }))
            };

            onCreatePlaylist(newPlaylist);

            this.setState({
                showSidePanel: false,
                selectedReleases: [],
                newPlaylistName: ''
            });
        } else {
            alert('Please enter a playlist name and select at least one release.');
        }
    }


    render() {
        const { newReleases, personalPlaylists = [] } = this.props;
        const { showSidePanel, showSongSidePanel, selectedReleases, newPlaylistName, selectedPlaylist, showAddSongsDropdown } = this.state;
        return (
            <div className="playlist-container">
                <SideBarWithRouter />
                <div className="main-content">
                    <SearchBar />
                    <h1>RELEASES</h1>
                    <div className="card-grid">
                        {newReleases.map((release) => (
                            <div key={release.id} className="card">
                                <div className="card-image-container">
                                    <img src={release.image} alt={release.title} />
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
                                    <div key={song.id} className="song-item">
                                        <span>{song.title} - {song.artist || 'Unknown Artist'}</span>
                                        <div className="song-options">
                                            <span className="options-trigger">:</span>
                                            <div className="options-dropdown">
                                                <button onClick={() => this.handleRemoveSong(song.id)}>Remove from playlist</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No songs in this playlist yet.</p>
                            )}
                        </div>
                    </div>
                )}
                <style jsx>{`
                 .add-songs-container {
                    margin-bottom: 20px;
                    position: relative;
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