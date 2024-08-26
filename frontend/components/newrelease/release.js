import React from "react";

class NewReleases extends React.Component {
    render() {
        const releases = [
            { title: "Not Like Us", artist: "Kendrick Lamar", image: "/assets/images/newReleases/NotLikeUs.png" },
            { title: "I feel the rain", artist: "Soulscape", image: "/assets/images/newReleases/Ifealtherain.png" },
            { title: "Phonk Ultra", artist: "Montagem", image: "/assets/images/newReleases/phonk.png" },
            { title: "HIT MACHINE", artist: "Soundwave", image: "/assets/images/newReleases/hitmachine.png" },
            { title: "Tobey", artist: "Eminem", image: "/assets/images/newReleases/tobey.png" },
            { title: "LOQ", artist: "LOCKED", image: "/assets/images/newReleases/image.png" },
        ];

        return (
            <div className="new-releases">
                <h2>NEW RELEASES</h2>
                <div className="releases-grid">
                    {releases.map((release, index) => (
                        <div key={index} className="release-card">
                            <img src={release.image} alt={release.title} />
                            <div className="release-info">
                                <div className="release-title">{release.title}</div>
                                <div className="release-artist">{release.artist}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <style jsx>
                    {
                        `
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
                        `
                    }
                </style>
            </div>
        );
    }
}

export default NewReleases;