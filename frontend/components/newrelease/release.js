import React from "react";
import ReleasePopup from "../releasepopup/release";
import { X, Upload } from 'lucide-react';


const CustomAlert = ({ message }) => (
    <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded relative mb-4">
        <span className="block sm:inline">{message}</span>
    </div>
);

class NewReleases extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRelease: null,
            showAddReleasePanel: false,
            error: '',
            newRelease: {
                title: "",
                artist: "",
                image: "",
                spotifyUrl: "", // Added for song link
                hashtags: [],
                createdAt: new Date().toISOString()
            }
        };
    }

    validateSpotifyUrl = (url) => {
        return url && url.startsWith('https://open.spotify.com/track/');
    }

    handleReleaseClick = (release) => {
        this.setState({ selectedRelease: release });
    }

    closePopup = () => {
        this.setState({ selectedRelease: null });
    }

    sortReleasesByDate = (releases) => {
        return [...releases].sort((a, b) => {
            const dateA = new Date(a.createdAt || 0);
            const dateB = new Date(b.createdAt || 0);
            return dateB - dateA;
        });
    };

    onAddComment = (releaseId, newComment) => {
        if (this.props.onAddComment && releaseId) {
            this.props.onAddComment(releaseId, newComment);
            this.setState(prevState => ({
                selectedRelease: prevState.selectedRelease && prevState.selectedRelease._id === releaseId
                    ? {
                        ...prevState.selectedRelease,
                        comments: [...(prevState.selectedRelease.comments || []), newComment]
                    }
                    : prevState.selectedRelease
            }));
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

        // Validate required fields
        if (!newRelease.title || !newRelease.artist) {
            this.setState({ error: 'Please enter both a title and artist name.' });
            return;
        }

        // Validate Spotify URL if provided
        if (newRelease.spotifyUrl && !this.validateSpotifyUrl(newRelease.spotifyUrl)) {
            this.setState({ error: 'Please enter a valid Spotify track URL (https://open.spotify.com/track/...)' });
            return;
        }

        // Create release with timestamp and user info
        const releaseWithTimestamp = {
            ...newRelease,
            createdAt: new Date().toISOString(),
            isDeleted: false,
            addedBy: this.props.currentUser
        };

        this.props.onAddRelease(releaseWithTimestamp);
        this.setState({
            showAddReleasePanel: false,
            error: '',
            newRelease: {
                title: "",
                artist: "",
                image: "",
                spotifyUrl: "",
                hashtags: [],
                createdAt: new Date().toISOString()
            }
        });
    }

    toggleAddReleasePanel = () => {
        this.setState(prevState => ({
            showAddReleasePanel: !prevState.showAddReleasePanel,
            error: '' // Clear any existing errors
        }));
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

    getSpotifyEmbedUrl = (spotifyUrl) => {
        if (!spotifyUrl) return null;
        const trackId = spotifyUrl.split('/track/')[1]?.split('?')[0];
        return trackId ? `https://open.spotify.com/embed/track/${trackId}` : null;
    }

    render() {
        const { selectedRelease, showAddReleasePanel, newRelease, error } = this.state;
        const { releases, currentUser } = this.props;

        const sortedReleases = this.sortReleasesByDate(releases);

        return (
            <div className="mt-8">
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-xl font-bold">NEW RELEASES</h2>
                    <h3
                        className="text-[#F3777D] hover:text-[#f55963] cursor-pointer transition-colors"
                        onClick={this.toggleAddReleasePanel}
                    >
                        Add release
                    </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {sortedReleases.map((release, index) => (
                        !release.isDeleted && (
                            <div
                                key={release._id || index}
                                className="bg-neutral-800 rounded-lg overflow-hidden cursor-pointer transform transition-transform duration-200 hover:scale-105"
                                onClick={() => this.handleReleaseClick(release)}
                            >
                                <img
                                    src={release.image}
                                    alt={release.title}
                                    className="w-full aspect-square object-cover"
                                />
                                <div className="p-2.5">
                                    <div className="font-bold mb-1">{release.title}</div>
                                    <div className="text-sm text-gray-400">{release.artist}</div>
                                    <div className="text-xs text-gray-500 mt-1">
                                        Added {new Date(release.createdAt).toLocaleDateString()}
                                    </div>
                                    {/* Spotify Embed */}
                                    {release.spotifyUrl && (
                                        <div className="mt-2">
                                            <iframe
                                                src={this.getSpotifyEmbedUrl(release.spotifyUrl)}
                                                width="100%"
                                                height="80"
                                                frameBorder="0"
                                                allow="encrypted-media"
                                                className="rounded"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    ))}
                </div>

                {selectedRelease && (
                    <ReleasePopup
                        release={selectedRelease}
                        onClose={this.closePopup}
                        onAddComment={this.onAddComment}
                        currentUser={currentUser}
                    />
                )}

                {showAddReleasePanel && (
                    <div className="fixed right-0 top-0 w-[300px] h-full bg-[#000807] p-8 overflow-y-auto border border-white rounded-l-[40px] shadow-lg">
                        <div className="flex justify-between items-center mb-5">
                            <h2 className="text-2xl font-bold">Add New Release</h2>
                            <X
                                className="cursor-pointer hover:text-gray-300"
                                onClick={this.toggleAddReleasePanel}
                            />
                        </div>

                        {error && <CustomAlert message={error} />}

                        <input
                            type="text"
                            name="title"
                            placeholder="Release Title"
                            value={newRelease.title}
                            onChange={this.handleInputChange}
                            className="w-full p-2.5 mb-4 bg-neutral-800 border border-green-500 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />

                        <input
                            type="text"
                            name="artist"
                            placeholder="Artist Name"
                            value={newRelease.artist}
                            onChange={this.handleInputChange}
                            className="w-full p-2.5 mb-4 bg-neutral-800 border border-green-500 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />

                        {/* Spotify URL Input */}
                        <input
                            type="url"
                            name="spotifyUrl"
                            placeholder="Spotify Track URL"
                            value={newRelease.spotifyUrl}
                            onChange={this.handleInputChange}
                            className="w-full p-2.5 mb-4 bg-neutral-800 border border-green-500 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />

                        <div className="mb-4">
                            <label
                                htmlFor="image-upload"
                                className="inline-flex items-center bg-neutral-800 text-white px-4 py-2.5 rounded cursor-pointer hover:bg-neutral-700 transition-colors"
                            >
                                <Upload size={20} className="mr-2" />
                                {newRelease.image ? 'Change Image' : 'Upload Image'}
                            </label>
                            <input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                onChange={this.handleImageChange}
                                className="hidden"
                            />
                            {newRelease.image && (
                                <img
                                    src={newRelease.image}
                                    alt="Preview"
                                    className="mt-2.5 max-w-full max-h-[200px] rounded"
                                />
                            )}
                        </div>

                        <input
                            type="text"
                            name="hashtags"
                            placeholder="Hashtags (comma-separated)"
                            value={newRelease.hashtags.join(', ')}
                            onChange={this.handleHashtagChange}
                            className="w-full p-2.5 mb-4 bg-neutral-800 border border-green-500 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />

                        <button
                            onClick={this.handleAddRelease}
                            className="w-full bg-green-500 text-white py-2.5 px-5 rounded-full text-base cursor-pointer hover:bg-green-600 transition-colors mt-5"
                        >
                            Add Release
                        </button>
                    </div>
                )}

                {selectedRelease && (
                    <ReleasePopup
                        release={selectedRelease}
                        onClose={this.closePopup}
                        onAddComment={this.onAddComment}
                        currentUser={currentUser}
                    />
                )}
            </div>
        );
    }
}

export default NewReleases;