import React from 'react';
import Sidebar from '../../components/sidebar/sideBar';
import SearchBar from '../../components/search/searchBar';
import FeaturedSong from '../../components/featuredsong/feature';
import NewReleases from '../../components/newrelease/release';

class Home extends React.Component {
    render() {
        return (
            <div className="app-container">
                <div className="main-content">
                    <SearchBar />
                    <div style={{ padding: '20px' }}>
                        <FeaturedSong />
                        <NewReleases
                            releases={this.props.newReleases}
                            onAddRelease={this.props.onAddRelease}
                            onAddComment={this.props.onAddComment}
                        />
                    </div>
                </div>
                <Sidebar />
                <style jsx>
                    {
                        `
                            body, html {
                                height: 100%;
                                font-family: Arial, sans-serif;
                                background-color: #000807;
                                color: #fff;
                            }

                            .app-container {
                                display: flex;
                                height: 100vh;
                                flex-direction: row-reverse;
                            }

                            .main-content {
                            flex-grow: 1;
                            display: flex;
                            flex-direction: column;
                            height: 100vh;
                            overflow: auto;
                            }

                            .content-area {
                            flex-grow: 1;
                            overflow-y: auto;
                            padding: 20px;
                            }
                        `
                    }
                </style>
            </div>
        );
    }
}

export default Home;