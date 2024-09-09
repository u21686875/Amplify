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
                {
                    title: "Not Like Us",
                    artist: "Kendrick Lamar",
                    image: "/assets/images/newReleases/NotLikeUs.png",
                    hashtags: ["#HipHop", "#NewMusic"],
                    comments: [
                        {
                            userName: "hiphopFan23",
                            userImage: "/assets/images/users/user1.jpg",
                            text: "Great beat!",
                            likes: 15,
                            dislikes: 1
                        },
                        {
                            userName: "kdotLover",
                            userImage: "/assets/images/users/user2.jpg",
                            text: "Kendrick does it again!",
                            likes: 22,
                            dislikes: 0
                        },
                        {
                            userName: "musicCritic101",
                            userImage: "/assets/images/users/user3.jpg",
                            text: "On repeat!",
                            likes: 8,
                            dislikes: 2
                        }
                    ]
                },
                {
                    title: "I feel the rain",
                    artist: "Soulscape",
                    image: "/assets/images/newReleases/Ifealtherain.png",
                    hashtags: ["#Ambient", "#Chill"],
                    comments: [
                        {
                            userName: "chillVibes",
                            userImage: "/assets/images/users/user4.jpg",
                            text: "So relaxing",
                            likes: 10,
                            dislikes: 0
                        },
                        {
                            userName: "studyGuru",
                            userImage: "/assets/images/users/user5.jpg",
                            text: "Perfect for studying",
                            likes: 18,
                            dislikes: 1
                        },
                        {
                            userName: "ambientLover",
                            userImage: "/assets/images/users/user6.jpg",
                            text: "Love the atmosphere",
                            likes: 7,
                            dislikes: 0
                        }
                    ]
                },
                {
                    title: "Phonk Ultra",
                    artist: "Montagem",
                    image: "/assets/images/newReleases/phonk.png",
                    hashtags: ["#Phonk", "#Electronic"],
                    comments: [
                        {
                            userName: "bassHead",
                            userImage: "/assets/images/users/user7.jpg",
                            text: "Sick bassline!",
                            likes: 25,
                            dislikes: 2
                        },
                        {
                            userName: "phonkMaster",
                            userImage: "/assets/images/users/user8.jpg",
                            text: "This goes hard",
                            likes: 30,
                            dislikes: 1
                        },
                        {
                            userName: "clubberQueen",
                            userImage: "/assets/images/users/user9.jpg",
                            text: "Club banger for sure",
                            likes: 20,
                            dislikes: 0
                        }
                    ]
                },
                {
                    title: "HIT MACHINE",
                    artist: "Soundwave",
                    image: "/assets/images/newReleases/hitmachine.png",
                    hashtags: ["#Pop", "#Dance"],
                    comments: [
                        {
                            userName: "popLover99",
                            userImage: "/assets/images/users/user10.jpg",
                            text: "Catchy chorus",
                            likes: 12,
                            dislikes: 1
                        },
                        {
                            userName: "summerVibes",
                            userImage: "/assets/images/users/user11.jpg",
                            text: "Summer anthem",
                            likes: 16,
                            dislikes: 0
                        },
                        {
                            userName: "danceFloorKing",
                            userImage: "/assets/images/users/user12.jpg",
                            text: "Can't stop dancing to this",
                            likes: 19,
                            dislikes: 2
                        }
                    ]
                },
                {
                    title: "Tobey",
                    artist: "Eminem",
                    image: "/assets/images/newReleases/tobey.png",
                    hashtags: ["#Rap", "#Wordplay"],
                    comments: [
                        {
                            userName: "slimShadyFan",
                            userImage: "/assets/images/users/user13.jpg",
                            text: "Em's still got it",
                            likes: 35,
                            dislikes: 3
                        },
                        {
                            userName: "lyricGenius",
                            userImage: "/assets/images/users/user14.jpg",
                            text: "Clever lyrics as always",
                            likes: 28,
                            dislikes: 1
                        },
                        {
                            userName: "rapGod",
                            userImage: "/assets/images/users/user15.jpg",
                            text: "That flow is insane",
                            likes: 22,
                            dislikes: 0
                        }
                    ]
                },
                {
                    title: "LOQ",
                    artist: "LOCKED",
                    image: "/assets/images/newReleases/image.png",
                    hashtags: ["#Alternative", "#Indie"],
                    comments: [
                        {
                            userName: "indieExplorer",
                            userImage: "/assets/images/users/user16.jpg",
                            text: "Unique sound",
                            likes: 8,
                            dislikes: 1
                        },
                        {
                            userName: "musicScout",
                            userImage: "/assets/images/users/user17.jpg",
                            text: "This band is underrated",
                            likes: 14,
                            dislikes: 0
                        },
                        {
                            userName: "guitarHero",
                            userImage: "/assets/images/users/user18.jpg",
                            text: "Love the guitar riffs",
                            likes: 11,
                            dislikes: 1
                        }
                    ]
                }
            ],
            personalPlaylists: [
                {
                    id: 1,
                    title: "E's Brain",
                    image: "/assets/images/newReleases/phonk.png",
                    songs: [
                        { id: 1, title: "E's Brain Is Still A Trigger For Me", artist: "Artist 1" },
                        { id: 2, title: "Another Song", artist: "Artist 2" },
                        { id: 3, title: "Third Song", artist: "Artist 3" },
                    ]
                },
                {
                    id: 2,
                    title: "MINDBLOWN",
                    image: "/assets/images/newReleases/hitmachine.png",
                    songs: [
                        { id: 4, title: "MINDBLOWN Track 1", artist: "Artist 4" },
                        { id: 5, title: "MINDBLOWN Track 2", artist: "Artist 5" },
                    ]
                },
                {
                    id: 3,
                    title: "Libidos",
                    image: "/assets/images/newReleases/tobey.png",
                    songs: [
                        { id: 6, title: "Libidos Song 1", artist: "Artist 6" },
                        { id: 7, title: "Libidos Song 2", artist: "Artist 7" },
                    ]
                },
            ],
            currentUser: {
                id: 1, // This should be a unique identifier
                name: "Cruzer7",
                image: "/assets/images/user/user.jpg"
            }
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
                    ? { ...playlist, songs: playlist.songs.filter(song => song.id !== songId) }
                    : playlist
            )
        }));
    }

    handleAddRelease = (newRelease) => {
        this.setState(prevState => ({
            newReleases: [...prevState.newReleases, { ...newRelease, id: Date.now(), comments: [] }]
        }));
    }

    handleAddComment = (releaseId, newComment) => {
        const { currentUser } = this.state;
        const commentWithUser = {
            ...newComment,
            userId: currentUser.id,
            userName: currentUser.name,
            userImage: currentUser.image
        };

        this.setState(prevState => ({
            newReleases: prevState.newReleases.map(release =>
                release.id === releaseId
                    ? { ...release, comments: [...(release.comments || []), commentWithUser] }
                    : release
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
                        <Route path="/home" element={
                            <Home 
                                newReleases={this.state.newReleases}
                                onAddRelease={this.handleAddRelease}
                                onAddComment={this.handleAddComment}
                                currentUser={this.state.currentUser}
                            />
                        } />
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