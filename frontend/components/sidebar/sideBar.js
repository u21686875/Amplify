import React from 'react';
import { Home, Music, Album, TrendingUp, Star, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

class Sidebar extends React.Component {
    handleSettingsClick = () => {
        this.props.navigate('/settings');
    }

    handleRouting = (route) => {
        this.props.navigate('/' + route);
    }

    render() {
        return (
            <div className="fixed left-0 top-0 w-[300px] h-full bg-[#0F0F0F] p-5 overflow-y-auto">
                {/* Header */}
                <div className="flex items-center mb-5">
                    <img
                        src="/assets/images/amplify.png"
                        alt="Amplify"
                        className="h-8 mr-2.5"
                        onClick={() => this.handleRouting('home')}
                    />
                    <span className="text-2xl font-bold text-white">
                        Amplify
                    </span>
                </div>

                {/* Divider */}
                <hr className="h-[0.2px] border-0 bg-[#252727] my-6 w-4/5" />

                {/* Navigation */}
                <nav>
                    <div
                        className="flex items-center mb-2.5 text-green-500 cursor-pointer w-fit"
                        onClick={() => this.handleRouting('home')}
                    >
                        <Home className="mr-2.5" />
                        <span>Home</span>
                    </div>
                    <div
                        className="flex items-center mb-2.5 text-gray-500 hover:text-gray-300 cursor-pointer w-fit"
                        onClick={() => this.handleRouting('playlist')}
                    >
                        <Music className="mr-2.5" />
                        <span>Playlist</span>
                    </div>
                </nav>

                {/* Divider */}
                <hr className="h-[0.2px] border-0 bg-[#252727] my-6 w-4/5" />

                {/* Discovery Section */}
                <h3 className="text-white mb-2.5">DISCOVERY</h3>
                <div className="flex items-center mb-2.5 text-gray-500 hover:text-gray-300 cursor-pointer w-fit">
                    <TrendingUp className="mr-2.5" />
                    <span>Trending</span>
                </div>
                <div className="flex items-center mb-2.5 text-gray-500 hover:text-gray-300 cursor-pointer w-fit">
                    <Star className="mr-2.5" />
                    <span>Popular</span>
                </div>

                {/* Divider */}
                <hr className="h-[0.2px] border-0 bg-[#252727] my-6 w-4/5" />

                {/* Playlist Section */}
                <h3 className="text-white mb-2.5">MY PLAYLIST</h3>

                {/* Playlist Items */}
                <div className="flex items-center mb-2.5 text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-red-500 mr-2.5"></span>
                    Love
                </div>
                <div className="flex items-center mb-2.5 text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2.5"></span>
                    Electro
                </div>
                <div className="flex items-center mb-2.5 text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-yellow-500 mr-2.5"></span>
                    Funk
                </div>
                <div className="flex items-center mb-2.5 text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mr-2.5"></span>
                    EDM
                </div>

                {/* Logout */}
                <div
                    className="absolute bottom-10 left-5 flex items-center gap-2 text-gray-500 hover:text-gray-300 cursor-pointer"
                    onClick={this.handleSettingsClick}
                >
                    <span>Logout</span>
                </div>
            </div>
        );
    }
}

// Wrapper function to use hooks with class component
function SideBarWithRouter(props) {
    const navigate = useNavigate();
    return <Sidebar {...props} navigate={navigate} />;
}

export default SideBarWithRouter;