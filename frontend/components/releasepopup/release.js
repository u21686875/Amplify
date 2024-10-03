import React from 'react';
import { X, ThumbsUp, ThumbsDown, Send } from 'lucide-react';

class ReleasePopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newComment: '',
            showFriendRequestPopup: false,
            selectedUser: null,
            friendRequestStatus: 'Friend'
        };
    }

    handleCommentChange = (event) => {
        this.setState({ newComment: event.target.value });
    }

    handleCommentSubmit = () => {
        const { onAddComment, release } = this.props;
        if (this.state.newComment.trim() !== '' && release && release._id) {
            // Retrieve user data from localStorage
            const userData = JSON.parse(localStorage.getItem('user'));
            const username = userData ? userData.username : 'Anonymous';

            const newCommentObj = {
                text: this.state.newComment,
                userName: username,
                likes: 0,
                dislikes: 0
            };

            onAddComment(release._id, newCommentObj);

            // Clear the input field
            this.setState({ newComment: '' });
        } else {
            console.error('Unable to add comment: Release ID is missing or comment is empty');
        }
    }

    handleUsernameClick = (username) => {
        this.setState({
            showFriendRequestPopup: true,
            selectedUser: username,
            friendRequestStatus: 'Friend' // Reset status for each new user clicked
        });
    }

    handleFriendRequest = async () => {
        const currentUser = JSON.parse(localStorage.getItem('user')); // Get current user from localStorage
        const { selectedUser } = this.state;
    
        try {
            if (this.state.friendRequestStatus === 'Friend') {
                await fetch('/api/users/friend-request', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fromUsername: currentUser.username, toUsername: selectedUser })
                });
                this.setState({ friendRequestStatus: 'Pending' });
            } else if (this.state.friendRequestStatus === 'Unfriend') {
                await fetch('/api/users/unfriend', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: currentUser.username, friendUsername: selectedUser })
                });
                this.setState({ friendRequestStatus: 'Friend' });
            }
        } catch (error) {
            console.error('Error handling friend request:', error);
        }
    }

    closeFriendRequestPopup = () => {
        this.setState({
            showFriendRequestPopup: false,
            selectedUser: null
        });
    }


    render() {
        const { release, onClose } = this.props;
        const { showFriendRequestPopup, selectedUser, friendRequestStatus } = this.state;
        if (!release) return null;

        return (
            <div className="popup-overlay">
                <div className="popup-content">
                    <button className="close-button" onClick={onClose}><X /></button>
                    <div className="popup-header">
                        <h2>{release.title}</h2>
                        <div className="hashtags">
                            {release.hashtags.map((tag, index) => (
                                <span key={index} className="hashtag">{tag}</span>
                            ))}
                        </div>
                    </div>
                    <div className="popup-body">
                        <div className="popup-left">
                            <h3>Comments</h3>
                            <div className="comments-container">
                                {release.comments && release.comments.length > 0 ? (
                                    release.comments.map((comment, index) => (
                                        <div key={index} className="comment">
                                            <div className="comment-header">
                                                {comment.userImage && (
                                                    <img src={comment.userImage} alt={comment.userName || 'User'} className="user-image" />
                                                )}
                                                <span className="user-name" onClick={() => this.handleUsernameClick(comment.userName)}>@{comment.userName || 'Anonymous'}</span>
                                            </div>
                                            <p className="comment-text">{comment.text}</p>
                                            <div className="comment-actions">
                                                <button className="action-button"><ThumbsUp size={16} /> {comment.likes || 0}</button>
                                                <button className="action-button"><ThumbsDown size={16} /> {comment.dislikes || 0}</button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No comments</p>
                                )}
                            </div>
                        </div>
                        <div className="popup-right">
                            <img src={release.image} alt={release.title} />
                        </div>
                    </div>
                    <div className="comment-input-container">
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            className="comment-input"
                            value={this.state.newComment}
                            onChange={this.handleCommentChange}
                            onKeyPress={(e) => e.key === 'Enter' && this.handleCommentSubmit()}
                        />
                        <button className="send-button" onClick={this.handleCommentSubmit}>
                            <Send size={20} />
                        </button>
                    </div>
                </div>

                {showFriendRequestPopup && (
                    <div className="friend-request-popup">
                        <div className="friend-request-content">
                            <h3>{selectedUser}</h3>
                            <button onClick={this.handleFriendRequest}>{friendRequestStatus}</button>
                            <button onClick={this.closeFriendRequestPopup}>Cancel</button>
                        </div>
                    </div>
                )}


                <style jsx>{`
                    .user-name {
                        font-weight: bold;
                        color: #1DB954;
                        cursor: pointer;
                    }

                    .user-name:hover {
                        text-decoration: underline;
                    }

                    .friend-request-popup {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        background-color: #333;
                        padding: 20px;
                        border-radius: 10px;
                        z-index: 1001;
                    }

                    .friend-request-content {
                        text-align: center;
                    }

                    .friend-request-content h3 {
                        margin-bottom: 20px;
                    }

                    .friend-request-content button {
                        margin: 0 10px;
                        padding: 10px 20px;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                    }

                    .friend-request-content button:first-of-type {
                        background-color: #1DB954;
                        color: white;
                    }

                    .friend-request-content button:last-of-type {
                        background-color: #555;
                        color: white;
                    }
                    .popup-overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background-color: rgba(0, 0, 0, 0.8);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        z-index: 1000;
                    }

                    .popup-content {
                        background-color: #222;
                        border-radius: 10px;
                        padding: 30px;
                        width: 90%;
                        height: 85%;
                        max-width: 1200px;
                        position: relative;
                        display: flex;
                        flex-direction: column;
                    }

                    .close-button {
                        position: absolute;
                        top: 20px;
                        right: 20px;
                        background: none;
                        border: none;
                        color: white;
                        font-size: 32px;
                        cursor: pointer;
                    }

                    .popup-header {
                        margin-bottom: 20px;
                        display: flex;
                        align-items: center;
                        gap: 20px;
                    }

                    .popup-header h2 {
                        font-size: 36px;
                        margin-bottom: 15px;
                    }

                    .hashtag {
                        background-color: #333;
                        padding: 8px 15px;
                        border-radius: 20px;
                        margin-right: 15px;
                        font-size: 1em;
                    }

                    .popup-body {
                        display: flex;
                        flex-grow: 1;
                        overflow: hidden;
                    }

                    .popup-left {
                        flex: 1;
                        padding-right: 30px;
                        display: flex;
                        flex-direction: column;
                    }

                    .comments-container {
                        flex-grow: 1;
                        overflow-y: auto;
                        margin-bottom: 20px;
                    }

                    .comment-input-container {
                        margin-top: 20px;
                        display: flex;
                        align-items: center;
                    }

                    .popup-right {
                        flex: 1;
                        display: flex;
                        justify-content: center;
                    }

                    .popup-right img {
                        max-width: 100%;
                        max-height: 100%;
                        object-fit: contain;
                    }

                    .comment {
                        background-color: #333;
                        padding: 15px;
                        border-radius: 8px;
                        margin-bottom: 15px;
                        font-size: 1.1em;
                    }

                    .comment-header {
                        display: flex;
                        align-items: center;
                        margin-bottom: 10px;
                    }

                    .user-image {
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        margin-right: 10px;
                    }

                    .user-name {
                        font-weight: bold;
                        color: #1DB954;
                    }

                    .comment-text {
                        margin-bottom: 10px;
                    }

                    .comment-actions {
                        display: flex;
                        gap: 10px;
                    }

                    .action-button {
                        background: none;
                        border: none;
                        color: #888;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        gap: 5px;
                    }

                    .action-button:hover {
                        color: #1DB954;
                    }

                    .comment-input-container {
                        margin-top: 20px;
                    }

                    .comment-input {
                        flex-grow: 1;
                        padding: 15px;
                        border: none;
                        border-radius: 20px;
                        background-color: #444;
                        color: white;
                        font-size: 1.1em;
                        border: #00E469 solid 0.5px;
                    }
                    .send-button {
                        background: none;
                        border: none;
                        color: #00E469;
                        cursor: pointer;
                        margin-left: 10px;
                    }

                    .send-button:hover {
                        color: #1DB954;
                    }
                `}</style>
            </div>
        );
    }
}

export default ReleasePopup;