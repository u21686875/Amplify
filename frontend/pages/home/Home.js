// Home.js
import React from 'react';
import Sidebar from '../../components/sidebar/sideBar';
import SearchBar from '../../components/search/searchBar';
import FeaturedSong from '../../components/featuredsong/feature';
import NewReleases from '../../components/newrelease/release';

class Home extends React.Component {
    render() {
        return (
            <div className="flex h-screen overflow-hidden bg-[#000807] text-white font-sans">
                <Sidebar />
                {/* Main content area with proper overflow handling */}
                <div className="flex-1 ml-[300px] flex flex-col">
                    <SearchBar />
                    <div className="flex-1 overflow-y-auto">
                        <div className="p-5">
                            <FeaturedSong />
                            <NewReleases
                                releases={this.props.newReleases}
                                onAddRelease={this.props.onAddRelease}
                                onAddComment={this.props.onAddComment}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;