import React from 'react';
import { Plus } from 'lucide-react';

class UserPlaylists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playlists: [],
            loading: true,
            error: null
        };
    }

    componentDidMount() {
        this.fetchUserPlaylists();
    }

    componentDidUpdate(prevProps) {
        // Refetch if username changes
        if (prevProps.username !== this.props.username) {
            this.fetchUserPlaylists();
        }
    }

    fetchUserPlaylists = async () => {
        const { username } = this.props;

        if (!username) return;

        try {
            const response = await fetch(`/api/users/${username}/playlists`);
            if (!response.ok) {
                throw new Error('Failed to fetch playlists');
            }
            const data = await response.json();
            this.setState({
                playlists: data,
                loading: false,
                error: null
            });
        } catch (error) {
            console.error('Error fetching playlists:', error);
            this.setState({
                error: 'Failed to load playlists',
                loading: false
            });
        }
    }

    handleCreatePlaylist = () => {
        window.location.href = '/playlist';
    }

    handlePlaylistClick = (playlistId) => {
        window.location.href = `/playlist?id=${playlistId}`;
    }

    renderPlaylists() {
        const { playlists } = this.state;

        if (playlists.length === 0) {
            return (
                <div className="text-center py-8 text-neutral-400">
                    No playlists created yet
                </div>
            );
        }

        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {playlists.map((playlist) => (
                    <div
                        key={playlist._id}
                        className="group relative cursor-pointer hover:transform hover:scale-105 transition-all duration-200"
                        onClick={() => this.handlePlaylistClick(playlist._id)}
                    >
                        <div className="aspect-square overflow-hidden rounded-lg">
                            <img
                                src={playlist.image || '/default-playlist.jpg'}
                                alt={playlist.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200" />
                        </div>
                        <div className="mt-2">
                            <h3 className="text-sm font-medium truncate">{playlist.title}</h3>
                            <p className="text-xs text-neutral-400">
                                {playlist.songs?.length || 0} songs
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    render() {
        const { loading, error } = this.state;

        if (loading) {
            return (
                <div className="mt-8">
                    <div className="text-center py-4">Loading playlists...</div>
                </div>
            );
        }

        if (error) {
            return (
                <div className="mt-8">
                    <div className="text-center py-4 text-red-500">{error}</div>
                </div>
            );
        }

        return (
            <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">My Playlists</h2>
                    <button
                        onClick={this.handleCreatePlaylist}
                        className="flex items-center gap-2 px-4 py-2 bg-green-500 rounded-full hover:bg-green-600 transition-colors text-sm"
                    >
                        <Plus size={16} />
                        Create Playlist
                    </button>
                </div>

                {this.renderPlaylists()}
            </div>
        );
    }
}

export default UserPlaylists; 