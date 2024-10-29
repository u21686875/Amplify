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
        const { releases, currentUser } = this.props;

        return (
            <div className="mt-8">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-xl font-bold">NEW RELEASES</h2>
                    <h3
                        className="text-[#F3777D] hover:text-[#f55963] cursor-pointer transition-colors"
                        onClick={this.toggleAddReleasePanel}
                    >
                        Add release
                    </h3>
                </div>

                {/* Releases Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {releases.map((release, index) => (
                        <div
                            key={index}
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
                            </div>
                        </div>
                    ))}
                </div>

                {/* Release Popup */}
                {selectedRelease && (
                    <ReleasePopup
                        release={selectedRelease}
                        onClose={this.closePopup}
                        onAddComment={this.onAddComment}
                        currentUser={currentUser}
                    />
                )}

                {/* Add Release Side Panel */}
                {showAddReleasePanel && (
                    <div className="fixed right-0 top-0 w-[300px] h-full bg-[#000807] p-8 overflow-y-auto border border-white rounded-l-[40px] shadow-lg">
                        <div className="flex justify-between items-center mb-5">
                            <h2 className="text-2xl font-bold">Add New Release</h2>
                            <X
                                className="cursor-pointer hover:text-gray-300"
                                onClick={this.toggleAddReleasePanel}
                            />
                        </div>

                        {/* Input Fields */}
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

                        {/* Image Upload */}
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

                        {/* Hashtags Input */}
                        <input
                            type="text"
                            name="hashtags"
                            placeholder="Hashtags (comma-separated)"
                            value={newRelease.hashtags.join(', ')}
                            onChange={this.handleHashtagChange}
                            className="w-full p-2.5 mb-4 bg-neutral-800 border border-green-500 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />

                        {/* Add Button */}
                        <button
                            onClick={this.handleAddRelease}
                            className="w-full bg-green-500 text-white py-2.5 px-5 rounded-full text-base cursor-pointer hover:bg-green-600 transition-colors mt-5"
                        >
                            Add Release
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

export default NewReleases;