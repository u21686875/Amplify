import React from 'react';
import { X, ThumbsUp, ThumbsDown, Send } from 'lucide-react';

class ReleasePopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newComment: ''
        };
    }

    handleCommentChange = (event) => {
        this.setState({ newComment: event.target.value });
    }

    handleCommentSubmit = () => {
        if (this.state.newComment.trim() !== '') {
            const newCommentObj = {
                userName: "Cruzer7", // TODO: Replace with actual user data
                userImage: "/assets/images/user/user.jpg", // TODO: Replace with actual user image
                text: this.state.newComment,
                likes: 0,
                dislikes: 0
            };

            // Call the onAddComment prop function if it exists
            if (this.props.onAddComment) {
                this.props.onAddComment(this.props.release.title, newCommentObj);
            } else {
                console.log('onAddComment function not provided');
                // TODO: Implement proper error handling or user feedback
            }

            // Clear the input field
            this.setState({ newComment: '' });
        }
    }


    render() {
        const { release, onClose } = this.props;

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
                                {release.comments.map((comment, index) => (
                                    <div key={index} className="comment">
                                        <div className="comment-header">
                                            <img src={comment.userImage} alt={comment.userName} className="user-image" />
                                            <span className="user-name">@{comment.userName}</span>
                                        </div>
                                        <p className="comment-text">{comment.text}</p>
                                        <div className="comment-actions">
                                            <button className="action-button"><ThumbsUp size={16} /> {comment.likes}</button>
                                            <button className="action-button"><ThumbsDown size={16} /> {comment.dislikes}</button>
                                        </div>
                                    </div>
                                ))}
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

                <style jsx>{`
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