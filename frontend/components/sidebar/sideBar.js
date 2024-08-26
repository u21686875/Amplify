import React from 'react';
import { Home, Music, Album, TrendingUp, Star, Settings } from 'lucide-react';


class Sidebar extends React.Component {
    handleSettingsClick = () => {
        this.props.history.push('/settings');
    }

    render() {
        return (
            <div className="sidebar">
                <div className="sidebar-header">
                    <img src="/assets/images/amplify.png" alt="Amplify" className="logo" />
                    <span className="company-name">Amplify</span>
                </div>
                <hr style={{height: '0.2px', borderWidth: '0', color: '#252727', backgroundColor: '#252727', marginBottom: '25px', marginTop: '25px', width: '80%'}}/>
                <nav>
                    <div className="nav-item active"><Home /> Home</div>
                    <div className="nav-item"><Music /> Playlist</div>
                    <div className="nav-item"><Album /> Album</div>
                </nav>

                <hr style={{height: '0.2px', borderWidth: '0', color: '#252727', backgroundColor: '#252727', marginBottom: '25px', marginTop: '25px', width: '80%'}}/>

                <h3>DISCOVERY</h3>
                <div className="nav-item"><TrendingUp /> Trending</div>
                <div className="nav-item"><Star /> Popular</div>


                <hr style={{height: '0.2px', borderWidth: '0', color: '#252727', backgroundColor: '#252727', marginBottom: '25px', marginTop: '25px', width: '80%'}}/>


                <h3>MY PLAYLIST</h3>
                <div className="playlist-item"><span className="playlist-color" style={{ backgroundColor: 'red' }}></span> Love</div>
                <div className="playlist-item"><span className="playlist-color" style={{ backgroundColor: 'green' }}></span> Electro</div>
                <div className="playlist-item"><span className="playlist-color" style={{ backgroundColor: 'yellow' }}></span> Funk</div>
                <div className="playlist-item"><span className="playlist-color" style={{ backgroundColor: 'purple' }}></span> EDM</div>
                <div className="settings" onClick={this.handleSettingsClick}><Settings />Settings</div>
                <style jsx>
                    {
                        `
                            .sidebar {
                            background-color: #0F0F0F;
                            padding: 20px;
                            width: 600px;
                            }

                            h3{
                                color: white;
                            }

                            .settings {
                                display: flex;
                                align-items: center;
                                gap: 7px;
                                position: absolute;
                                bottom: 0;
                                margin-bottom: 40px;
                                color: grey;
                            }

                            .sidebar-header {
                            display: flex;
                            align-items: center;
                            margin-bottom: 20px;
                            }

                            .logo {
                            height: 30px;
                            margin-right: 10px;
                            }

                            .company-name {
                            font-size: 24px;
                            font-weight: bold;
                            color: #fff;
                            }

                            .nav-item {
                            display: flex;
                            align-items: center;
                            margin-bottom: 10px;
                            color: #888;
                            }

                            .nav-item.active {
                            color: #1db954;
                            }

                            .nav-item svg {
                            margin-right: 10px;
                            }

                            .playlist-item {
                            display: flex;
                            align-items: center;
                            margin-bottom: 10px;
                            color: #888;
                            }

                            .playlist-color {
                            width: 8px;
                            height: 8px;
                            border-radius: 50%;
                            margin-right: 10px;
                            }
                        `
                    }
                </style>
            </div>
        );
    }
}

export default Sidebar;