import React from "react";
import ReleasePopup from "../releasepopup/release";
import { X, Upload } from 'lucide-react';
class NewReleases extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRelease: null,
            showAddReleasePanel: false,
            newRelease: {
                title: "",
                artist: "",
                image: "",
                hashtags: [],
            }
        };
    }

    handleReleaseClick = (release) => {
        this.setState({ selectedRelease: release });
    }

    closePopup = () => {
        this.setState({ selectedRelease: null });
    }

    onAddComment = (releaseId, newComment) => {
        if (this.props.onAddComment) {
            // Ensure releaseId is not undefined
            if (releaseId) {
                this.props.onAddComment(releaseId, newComment);
                // Update the selected release with the new comment
                this.setState(prevState => ({
                    selectedRelease: prevState.selectedRelease && prevState.selectedRelease._id === releaseId
                        ? {
                            ...prevState.selectedRelease,
                            comments: [...(prevState.selectedRelease.comments || []), newComment]
                        }
                        : prevState.selectedRelease
                }));
            } else {
                console.error("releaseId is undefined");
            }
        } else {
            console.error("onAddComment prop is not defined");
        }
    }

    handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.setState(prevState => ({
                    newRelease: {
                        ...prevState.newRelease,
                        image: reader.result
                    }
                }));
            };
            reader.readAsDataURL(file);
        }
    }

    handleHashtagChange = (event) => {
        const hashtags = event.target.value.split(',').map(tag => tag.trim());
        this.setState(prevState => ({
            newRelease: {
                ...prevState.newRelease,
                hashtags
            }
        }));
    }

    handleAddRelease = () => {
        const { newRelease } = this.state;
        if (newRelease.title && newRelease.artist) {
            this.props.onAddRelease(newRelease);
            this.setState({
                showAddReleasePanel: false,
                newRelease: {
                    title: "",
                    artist: "",
                    imageUrl: "",
                    hashtags: [],
                }
            });
        } else {
            alert('Please enter at least a title and an artist for the new release.');
        }
    }

    toggleAddReleasePanel = () => {
        this.setState(prevState => ({ showAddReleasePanel: !prevState.showAddReleasePanel }));
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState(prevState => ({
            newRelease: {
                ...prevState.newRelease,
                [name]: value
            }
        }));
    }


    render() {
        const { selectedRelease, showAddReleasePanel, newRelease } = this.state;
        const { releases, currentUser, onAddComment } = this.props;

        return (
            <div className="new-releases">
                <div className="details">
                    <h2>NEW RELEASES</h2>
                    <h3 className="see-more" onClick={this.toggleAddReleasePanel}>Add release</h3>
                </div>
                <div className="releases-grid">
                    {releases.map((release, index) => (
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
                        release={selectedRelease}
                        onClose={this.closePopup}
                        onAddComment={(releaseId, newComment) => {
                            onAddComment(releaseId, newComment);
                            // Update local state
                            this.setState(prevState => ({
                                selectedRelease: {
                                    ...prevState.selectedRelease,
                                    comments: [...(prevState.selectedRelease.comments || []), newComment]
                                }
                            }));
                        }}
                        currentUser={currentUser}
                    />

{showAddReleasePanel && (
                    <div className="side-panel">
                        <div className='header'>
                            <h2 className='header-title'>Add New Release</h2>
                            <X className='close' onClick={this.toggleAddReleasePanel} />
                        </div>
                        <input
                            type="text"
                            name="title"
                            placeholder="Release Title"
                            value={newRelease.title}
                            onChange={this.handleInputChange}
                        />
                        <input
                            type="text"
                            name="artist"
                            placeholder="Artist Name"
                            value={newRelease.artist}
                            onChange={this.handleInputChange}
                        />
                        <div className="image-upload">
                            <label htmlFor="image-upload" className="image-upload-label">
                                <Upload size={20} />
                                {newRelease.image ? 'Change Image' : 'Upload Image'}
                            </label>
                            <input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                onChange={this.handleImageChange}
                                style={{ display: 'none' }}
                            />
                            {newRelease.image && (
                                <img 
                                    src={newRelease.image} 
                                    alt="Preview" 
                                    className="image-preview" 
                                />
                            )}
                        </div>
                        <input
                            type="text"
                            name="hashtags"
                            placeholder="Hashtags (comma-separated)"
                            value={newRelease.hashtags.join(', ')}
                            onChange={this.handleHashtagChange}
                        />
                        <button onClick={this.handleAddRelease} className="done-button">Add Release</button>
                    </div>
                )}
                <style jsx>{`
                    h3.see-more:hover{
                        cursor: pointer;
                    }
                    h3.see-more {
                        color: #F3777D;
                    }
                        .image-upload {
                        margin-bottom: 15px;
                    }

                    .image-upload-label {
                        display: inline-flex;
                        align-items: center;
                        background-color: #333;
                        color: #fff;
                        padding: 10px 15px;
                        border-radius: 5px;
                        cursor: pointer;
                        transition: background-color 0.3s;
                    }

                    .image-upload-label:hover {
                        background-color: #444;
                    }

                    .image-upload-label svg {
                        margin-right: 10px;
                    }

                    .image-preview {
                        max-width: 100%;
                        max-height: 200px;
                        margin-top: 10px;
                        border-radius: 5px;
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
                    .side-panel {
                        position: fixed;
                        right: -10px;
                        top: 0;
                        width: 300px;
                        height: 100%;
                        background-color: #000807;
                        padding: 30px;
                        overflow-y: auto;
                        transition: transform 0.3s ease-in-out;
                        border-radius: 40px 0px 0px 40px;
                        border: 1px solid #fff;
                    }

                    .header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 20px;
                    }

                    .header-title {
                        font-size: 24px;
                        margin: 0;
                    }

                    .close {
                        cursor: pointer;
                    }

                    input {
                        width: 100%;
                        padding: 10px;
                        margin-bottom: 15px;
                        background-color: #333;
                        border: 1px solid #00E469;
                        color: #fff;
                        border-radius: 5px;
                    }

                    .done-button {
                        background-color: #1DB954;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 20px;
                        cursor: pointer;
                        font-size: 16px;
                        width: 100%;
                        margin-top: 20px;
                    }
                `}</style>
            </div>
        );
    }
}

export default NewReleases;
