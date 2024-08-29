import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SplashPage from '../pages/Splash/Splash';
import Auth from '../pages/auth/Auth';
import Home from '../pages/home/Home';
import ProfileSettings from '../pages/profile/profile';
import PlayList from '../components/playlist/playlist';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newReleases: [
                { id: 1, title: "E's Brain", imageUrl: "/assets/images/playlist/yuji.jpeg" },
                { id: 2, title: "MINDBLOWN", imageUrl: "/assets/images/newReleases/NotLikeUs.png" },
                { id: 3, title: "Libidos", imageUrl: "/assets/images/newReleases/Ifealtherain.png" },
            ],
            personalPlaylists: [
                { 
                    id: 1, 
                    title: "E's Brain", 
                    imageUrl: "/assets/images/newReleases/phonk.png",
                    songs: [
                        { id: 1, title: "E's Brain Is Still A Trigger For Me", artist: "Artist 1" },
                        { id: 2, title: "Another Song", artist: "Artist 2" },
                        { id: 3, title: "Third Song", artist: "Artist 3" },
                    ]
                },
                { 
                    id: 2, 
                    title: "MINDBLOWN", 
                    imageUrl: "/assets/images/newReleases/hitmachine.png",
                    songs: [
                        { id: 4, title: "MINDBLOWN Track 1", artist: "Artist 4" },
                        { id: 5, title: "MINDBLOWN Track 2", artist: "Artist 5" },
                    ]
                },
                { 
                    id: 3, 
                    title: "Libidos", 
                    imageUrl: "/assets/images/newReleases/tobey.png",
                    songs: [
                        { id: 6, title: "Libidos Song 1", artist: "Artist 6" },
                        { id: 7, title: "Libidos Song 2", artist: "Artist 7" },
                    ]
                },
            ]
        };
    }

    handleCreatePlaylist = (newPlaylist) => {
        this.setState(prevState => ({
          personalPlaylists: [...prevState.personalPlaylists, newPlaylist]
        }));
      }

    handleRemoveSongFromPlaylist = (playlistId, songId) => {
        this.setState(prevState => ({
            personalPlaylists: prevState.personalPlaylists.map(playlist => 
                playlist.id === playlistId
                    ? {...playlist, songs: playlist.songs.filter(song => song.id !== songId)}
                    : playlist
            )
        }));
    }

    render() {
        return (
            <div>
                <Router>
                    <Routes>
                        <Route path="/" element={<SplashPage />} />
                        <Route path="/auth" element={<Auth />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/profile" element={<ProfileSettings />} />
                        <Route path="/playlist" element={
                            <PlayList
                                newReleases={this.state.newReleases}
                                personalPlaylists={this.state.personalPlaylists}
                                onCreatePlaylist={this.handleCreatePlaylist}
                                onRemoveSongFromPlaylist={this.handleRemoveSongFromPlaylist}
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
        );
    }
}

export default App;