import React from 'react';
import SideBarWithRouter from '../sidebar/sideBar';
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
        };
    }

    toggleSidePanel = () => {
        this.setState(prevState => ({ showSidePanel: !prevState.showSidePanel }));
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
        }
    }

    createPlaylist = () => {
        const { newPlaylistName, selectedReleases } = this.state;
        const { onCreatePlaylist } = this.props;

        if (newPlaylistName && selectedReleases.length > 0 && onCreatePlaylist) {
            const newPlaylist = {
                id: Date.now(),
                title: newPlaylistName,
                imageUrl: selectedReleases[0].imageUrl,
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
        const { newReleases = [], personalPlaylists = [] } = this.props;
        const { showSidePanel, showSongSidePanel, selectedReleases, newPlaylistName, selectedPlaylist } = this.state;
        return (
            <div className="playlist-container">
                <SideBarWithRouter />
                <div className="main-content">
                    <h1>NEW RELEASES</h1>
                    <div className="card-container">
                        {newReleases.map((release) => (
                            <div key={release.id} className="card">
                                <img src={release.imageUrl} alt={release.title} />
                                <h3>{release.title}</h3>
                            </div>
                        ))}
                    </div>
                    <h1>PERSONAL</h1>
                    <button onClick={this.toggleSidePanel} className="create-playlist-btn">Create Playlist</button>
                    {personalPlaylists.length === 0 ? (
                        <div className="no-playlists">
                            <p>You have no playlists</p>
                            <button onClick={this.toggleSidePanel} className="create-playlist-btn">Create Playlist</button>
                        </div>
                    ) : (
                        <div className="card-container">
                            {personalPlaylists.map((playlist) => (
                                <div key={playlist.id} className="card" onClick={() => this.openSongSidePanel(playlist)}>
                                    <img src={playlist.imageUrl} alt={playlist.title} />
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
                            <X className='close' onClick={this.toggleSidePanel}/>
                        </div>
                        <input
                            type="text"
                            placeholder="Playlist Name"
                            value={newPlaylistName}
                            onChange={this.handlePlaylistNameChange}
                        />
                        <div className="releases-container">
                            {newReleases.map((release) => (
                                <div
                                    key={release.id}
                                    className={`release-card ${selectedReleases.includes(release) ? 'selected' : ''}`}
                                    onClick={() => this.toggleReleaseSelection(release)}
                                >
                                    <img src={release.imageUrl} alt={release.title} />
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
                            <X className='close' onClick={this.closeSongSidePanel}/>
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
                    .close:hover{
                        cursor: pointer;
                    }
                    .header {
                        display: flex;
                        align-items: flex-start;
                        justify-content: space-between;
                    }
                    .header-title{
                        font-size: 35px;
                    }
                    .playlist-container {
                        display: flex;
                        background-color: #000;
                        color: #fff;
                        font-family: Arial, sans-serif;
                    }
                    .main-content {
                        flex-grow: 1;
                        padding: 20px;
                        padding-left: 70px;
                        overflow-y: auto;
                        height: 100vh;
                    }
                    h1, h2 {
                        font-size: 24px;
                        margin-bottom: 20px;
                    }
                    .card-container, .releases-container {
                        display: flex;
                        gap: 50px;
                        margin-bottom: 40px;
                    }
                    .card, .release-card {
                        width: 210px;
                        transition: transform 0.2s;
                        cursor: pointer;
                    }
                    .card:hover, .release-card:hover {
                        transform: scale(1.05);
                    }
                    .card img, .release-card img {
                        width: 100%;
                        height: auto;
                    }
                    .card h3, .release-card h3 {
                        font-size: 14px;
                        margin-top: 10px;
                    }
                    .no-playlists {
                        text-align: center;
                        position: relative;
                        top: 10%;
                        bottom: 0px;
                    }
                    .create-playlist-btn, .done-button {
                        background-color: #1DB954;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 20px;
                        cursor: pointer;
                        font-size: 16px;
                        margin-top: 20px;
                    }
                    .side-panel {
                        position: fixed;
                        right: -10px;
                        top: 0;
                        width: fit-content;
                        height: 100%;
                        background-color: #000807;
                        padding: 30px;
                        padding-left: 50px;
                        overflow-y: auto;
                        transition: transform 3s ease-in-out;
                        border-radius: 40px 0px 0px 40px;
                        border: 1px solid #fff;
                    }
                    input {
                        width: 100%;
                        padding: 10px;
                        margin-bottom: 20px;
                        background-color: #333;
                        border: 1px solid #00E469;
                        color: #fff;
                        border-radius: 15px;
                        text-align: center;
                    }
                    .done-button {
                        width: 20%;
                        display: flex;
                        justify-content: space-evenly;
                        align-items: stretch;
                        position: absolute;
                        right: 50%;
                        left: 40%;
                    }
                    .tick {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
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
                        right: -9px;
                        width: 50%;
                    }
                    .song-list {
                        margin-top: 20px;
                    }
                    .song-item {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 12px 10px 10px;
                        border-bottom: 1px solid #333;
                        border-radius: 20px;
                    }
                    .song-options {
                        position: relative;
                    }
                    .options-trigger {
                        cursor: pointer;
                    }
                    .options-dropdown {
                        display: none;
                        position: absolute;
                        right: -16px;
                        background-color: #222;
                        border: 1px solid #444;
                        z-index: 1;
                        width: 100px;
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