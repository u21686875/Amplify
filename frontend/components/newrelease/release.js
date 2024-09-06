import React from "react";
import ReleasePopup from "../releasepopup/release";
class NewReleases extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRelease: null,
            releases: [
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
            ]
        };
    }

    handleReleaseClick = (release) => {
        this.setState({ selectedRelease: release });
    }

    closePopup = () => {
        this.setState({ selectedRelease: null });
    }

    onAddComment = (releaseTitle, newComment) => {
        this.setState(prevState => {
            const updatedReleases = prevState.releases.map(release => {
                if (release.title === releaseTitle) {
                    return {
                        ...release,
                        comments: [...(release.comments || []), newComment]
                    };
                }
                return release;
            });
            return { 
                releases: updatedReleases,
                selectedRelease: updatedReleases.find(r => r.title === releaseTitle)
            };
        });
    }


    render() {
        return (
            <div className="new-releases">
                <div className="details">
                    <h2>NEW RELEASES</h2>
                    <h3 className="see-more">See more</h3>
                </div>
                <div className="releases-grid">
                    {this.state.releases.map((release, index) => (
                        <div key={index} className="release-card" onClick={() => this.handleReleaseClick(release)}>
                            <img src={release.image} alt={release.title} />
                            <div className="release-info">
                                <div className="release-title">{release.title}</div>
                                <div className="release-artist">{release.artist}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <ReleasePopup 
                    release={this.state.selectedRelease}
                    onClose={this.closePopup}
                    onAddComment={this.onAddComment}
                />

                <style jsx>{`
                    h3.see-more {
                        color: #F3777D;
                    }
                    .details {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 20px;
                    }
                    .new-releases {
                        margin-top: 30px;
                    }
                    .releases-grid {
                        display: grid;
                        grid-template-columns: repeat(6, 1fr);
                        gap: 15px;
                    }
                    .release-card {
                        background-color: #222;
                        border-radius: 8px;
                        overflow: hidden;
                        cursor: pointer;
                        transition: transform 0.2s;
                    }
                    .release-card:hover {
                        transform: scale(1.05);
                    }
                    .release-card img {
                        width: 100%;
                        aspect-ratio: 1;
                        object-fit: cover;
                    }
                    .release-info {
                        padding: 10px;
                    }
                    .release-title {
                        font-weight: bold;
                        margin-bottom: 5px;
                    }
                    .release-artist {
                        font-size: 0.9em;
                        color: #888;
                    }
                `}</style>
            </div>
        );
    }
}

export default NewReleases;
