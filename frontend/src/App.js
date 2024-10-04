import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../components/AuthContext/authContext';
import SplashPage from '../pages/Splash/Splash';
import Auth from '../pages/auth/Auth';
import Home from '../pages/home/Home';
import ProfileSettings from '../pages/profile/profile';
import PlayList from '../components/playlist/playlist';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newReleases: [],
            personalPlaylists: [],
            currentUser: null
        };
    }

    componentDidMount() {
        this.fetchNewReleases();
        this.fetchPersonalPlaylists();
        // Assume we have a method to get the current user
        // this.fetchCurrentUser();
    }

    fetchNewReleases = async () => {
        try {
            const response = await fetch('/api/newReleases');
            const data = await response.json();
            this.setState({ newReleases: data });
        } catch (error) {
            console.error('Error fetching new releases:', error);
        }
    }

    fetchPersonalPlaylists = async () => {
        try {
            const response = await fetch('/api/personalPlaylists');
            const data = await response.json();
            this.setState({ personalPlaylists: data });
        } catch (error) {
            console.error('Error fetching personal playlists:', error);
        }
    }

    fetchCurrentUser = async () => {
        try {
            const response = await fetch('/api/currentUser');
            const data = await response.json();
            this.setState({ currentUser: data });
        } catch (error) {
            console.error('Error fetching current user:', error);
        }
    }


    handleCreatePlaylist = async (newPlaylist) => {
        try {
            const response = await fetch('/api/personalPlaylists', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPlaylist)
            });
            const data = await response.json();
            this.setState(prevState => ({
                personalPlaylists: [...prevState.personalPlaylists, data]
            }));
        } catch (error) {
            console.error('Error creating playlist:', error);
        }
    }


    handleAddSongToPlaylist = async (playlistId, newSong) => {
        try {
            const response = await fetch(`/api/personalPlaylists/${playlistId}/songs`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newSong)
            });
            const updatedPlaylist = await response.json();
            this.setState(prevState => ({
                personalPlaylists: prevState.personalPlaylists.map(playlist =>
                    playlist._id === playlistId ? updatedPlaylist : playlist
                )
            }));
        } catch (error) {
            console.error('Error adding song to playlist:', error);
        }
    }


    handleRemoveSongFromPlaylist = async (playlistId, songId) => {
        try {
            await fetch(`/api/personalPlaylists/${playlistId}/songs/${songId}`, {
                method: 'DELETE'
            });
            this.setState(prevState => ({
                personalPlaylists: prevState.personalPlaylists.map(playlist =>
                    playlist._id === playlistId
                        ? { ...playlist, songs: playlist.songs.filter(song => song._id !== songId) }
                        : playlist
                )
            }));
        } catch (error) {
            console.error('Error removing song from playlist:', error);
        }
    }


    handleAddRelease = async (newRelease) => {
        try {
            const response = await fetch('/api/newReleases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newRelease)
            });
            const data = await response.json();
            this.setState(prevState => ({
                newReleases: [...prevState.newReleases, data]
            }));
        } catch (error) {
            console.error('Error adding new release:', error);
        }
    }

    handleAddComment = async (releaseId, newComment) => {
        try {
            console.log('Adding comment to release:', releaseId); // Debug log
            const response = await fetch(`/api/newReleases/${releaseId}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newComment)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const updatedRelease = await response.json();
            this.setState(prevState => ({
                newReleases: prevState.newReleases.map(release =>
                    release._id === releaseId ? updatedRelease : release
                )
            }));
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    }


    render() {
        return (
            <AuthProvider>
                <div>
                    <Router>
                        <Routes>
                            <Route path="/" element={<SplashPage />} />
                            <Route path="/auth" element={<Auth />} />
                            <Route path="/home" element={
                                <Home
                                    newReleases={this.state.newReleases}
                                    onAddRelease={this.handleAddRelease}
                                    onAddComment={this.handleAddComment}
                                />
                            } />
                            <Route path="/profile" element={<ProfileSettings />} />
                            <Route path="/playlist" element={
                                <PlayList
                                    newReleases={this.state.newReleases}
                                    personalPlaylists={this.state.personalPlaylists}
                                    onCreatePlaylist={this.handleCreatePlaylist}
                                    onRemoveSongFromPlaylist={this.handleRemoveSongFromPlaylist}
                                    onAddSongToPlaylist={this.handleAddSongToPlaylist}
                                />
                            } />
                        </Routes>
                    </Router>
                    <style jsx>{`
                        * {
                            margin: 0;
                            padding: 0;
                            box-sizing: border-box;
                        }

                        body, html {
                            height: 100%;
                            width: 100%;
                            overflow: hidden;
                        }
                    `}</style>
                </div>
            </AuthProvider>
        );
    }
}

export default App;