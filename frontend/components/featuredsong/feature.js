import React from "react";
import { Play, Heart } from "lucide-react";
class FeaturedSong extends React.Component {
    render() {
        return (
            <div className="featured-song">
                <img src="/assets/images/featured/BJA7RzO.jpeg" alt="Featured Song" />
                <div className="featured-song-info">
                <div className="featured-song-label">FEATURED SONGS</div>
                <h4 className="featured-song-title">Doomer Scape</h4>
                <h3 className="featured-song-artist">Zangetsu</h3>
                <div className="featured-song-controls">
                    <Heart className="heart-icon" size={24} />
                    <button className="play-button">
                    <Play size={16} style={{marginRight: '5px'}} /> Play
                    </button>
                </div>
                </div>
                <style jsx>{
                        `
                            .featured-song {
                            position: relative;
                            height: 45%;
                            margin-bottom: 30px;
                            border-radius: 8px;
                            overflow: hidden;
                            }

                            .featured-song img {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                            }

                            .featured-song-label {
                                padding-bottom: 40px;
                                font-weight: 500;
                                float: right;
                            }

                            h3.featured-song-artist {
                                font-size: 46px;
                            }
                            h4.featured-song-title {
                                font-size: 29px;
                                font-weight: lighter;
                            }
                            .featured-song-info {
                            position: absolute;
                            bottom: 0;
                            right: 0;
                            padding: 40px;
                            background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
                            }

                            .play-button {
                                background-color: #1db954;
                                color: #fff;
                                border: none;
                                padding: 12px 32px;
                                border-radius: 8px;
                                cursor: pointer;
                                font-size: 17px;
                                font-weight: 700;   
                            }

                            .featured-song-controls {
                                float: right;
                                padding-top: 40px;
                                display: flex;
                                align-items: center;
                                gap: 40px;
                            }
                        `
                    }
                </style>
            </div>
        );
    }
}

export default FeaturedSong;

