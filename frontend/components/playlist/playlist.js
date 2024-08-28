import React from 'react';
import SideBarWithRouter from '../sidebar/sideBar';

class PlayList extends React.Component {
    render() {
        const { newReleases, personal } = this.props;

        return (
            <div className="playlist-container">
                <SideBarWithRouter />
                <div className="main-content">
                    <h1>NEW RELEASES</h1>
                    <div className="card-container">
                        {newReleases.map((release, index) => (
                            <div key={index} className="card">
                                <img src={release.imageUrl} alt={release.title} />
                                <h3>{release.title}</h3>
                            </div>
                        ))}
                    </div>
                    <h1>PERSONAL</h1>
                    <div className="card-container">
                        {personal.map((item, index) => (
                            <div key={index} className="card">
                                <img src={item.imageUrl} alt={item.title} />
                                <h3>{item.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
                <style jsx>{`
                    .playlist-container {
                        display: flex;
                        background-color: #000;
                        color: #fff;
                        font-family: Arial, sans-serif;
                    }
                    .main-content {
                        flex-grow: 1;
                        padding: 20px;
                        padding-left: 70px;
                    }
                    h1 {
                        font-size: 24px;
                        margin-bottom: 20px;
                    }
                    .card-container {
                        display: flex;
                        gap: 50px;
                        margin-bottom: 40px;
                    }
                    .card {
                        width: 210px;
                        transition: transform 0.2s;
                    }

                    .card:hover {
                        transform: scale(1.05);
                    }
                    .card img {
                        width: 100%;
                        height: auto;
                    }
                    .card h3 {
                        font-size: 14px;
                        margin-top: 10px;
                    }
                `}</style>
            </div>
        );
    }
}

export default PlayList;