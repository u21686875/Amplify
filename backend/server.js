const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


const session = require('express-session');
const MongoStore = require('connect-mongo');
const bcrypt = require('bcryptjs');
const cookie = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// User model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    profileImage: { type: String, default: '/assets/images/user/user.jpg' },
    isAdmin: { type: Boolean, default: false }
});

const genreSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }
});

// Add password hashing middleware
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const newReleaseSchema = new mongoose.Schema({
    title: String,
    artist: String,
    image: String,
    hashtags: [String],
    comments: [{
        userName: String,
        userImage: String,
        text: String,
        likes: Number,
        dislikes: Number
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const personalPlaylistSchema = new mongoose.Schema({
    title: String,
    image: String,
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    songs: [{
        title: String,
        artist: String
    }],
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const NewRelease = mongoose.model('NewRelease', newReleaseSchema);
const PersonalPlaylist = mongoose.model('PersonalPlaylist', personalPlaylistSchema, 'personalplaylist');

// Middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(path.join(__dirname, '..', '..', 'frontend', 'public')));
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
// Add these configurations after your existing mongoose connection
app.use(cookie());
// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
    }),
    cookie: {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    }
}));

// Authentication middleware
const requireAuth = async (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: 'Authentication required' });
    }
    try {
        const user = await User.findById(req.session.userId);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


// Modified registration endpoint
app.post('/api/users/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const user = new User({ username, password });
        await user.save();

        // Automatically log in after registration
        req.session.userId = user._id;

        res.status(201).json({
            message: 'User created successfully',
            user: {
                username: user.username,
                profileImage: user.profileImage
            }
        });
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error: error.message });
    }
});


// User routes
app.post('/api/users', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error: error.message });
    }
});


// Logout endpoint
app.post('/api/users/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out' });
        }
        res.clearCookie('connect.sid');
        res.json({ message: 'Logged out successfully' });
    });
});

// Check session endpoint
app.get('/api/users/session', async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({ message: 'No active session' });
        }

        const user = await User.findById(req.session.userId);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        res.json({
            user: {
                username: user.username,
                profileImage: user.profileImage
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});


// Modified login endpoint
app.post('/api/users/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate that username is a string
        if (typeof username !== 'string' || typeof password !== 'string') {
            return res.status(400).json({ message: 'Invalid input format' });
        }

        // Log the received data for debugging
        // console.log('Login attempt with:', { username, password: '****' });

        const user = await User.findOne({ username: username.toString() });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Set session
        req.session.userId = user._id;

        // Save session before sending response
        req.session.save((err) => {
            if (err) {
                console.error('Session save error:', err);
                return res.status(500).json({ message: 'Error saving session' });
            }

            res.json({
                message: 'Login successful',
                user: {
                    username: user.username,
                    profileImage: user.profileImage
                }
            });
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error during login', error: error.message });
    }
});

// Combined user profile update endpoint
app.put('/api/users', async (req, res) => {
    try {
        // Check if user is authenticated via session
        if (!req.session.userId) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const { username } = req.body;
        
        // Find the current user using the session ID
        const user = await User.findById(req.session.userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate username
        if (!username || username.trim() === '') {
            return res.status(400).json({ message: 'Username cannot be empty' });
        }

        // Check if username is taken by another user
        const existingUser = await User.findOne({
            username: username,
            _id: { $ne: user._id }
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        // Update username
        user.username = username;
        await user.save();

        // Send updated user data
        res.json({
            message: 'User updated successfully',
            username: user.username,
            profileImage: user.profileImage
        });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

app.delete('/api/users', async (req, res) => {
    try {
        const { username } = req.body;
        if (!username) {
            return res.status(400).json({ message: 'Username is required' });
        }

        const deletedUser = await User.findOneAndDelete({ username });
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

app.get('/api/users/:username', requireAuth, async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({
            username: user.username,
            profileImage: user.profileImage
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// New Releases routes
app.get('/api/newReleases', async (req, res) => {
    try {
        const newReleases = await NewRelease.find().sort({ createdAt: -1 });
        res.json(newReleases);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/newReleases', async (req, res) => {
    const newRelease = new NewRelease(req.body);
    try {
        const savedRelease = await newRelease.save();
        res.status(201).json(savedRelease);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/api/newReleases/:id', async (req, res) => {
    try {
        const releaseId = req.params.id;
        const deletedRelease = await NewRelease.findByIdAndDelete(releaseId);

        if (!deletedRelease) {
            return res.status(404).json({ message: 'Release not found' });
        }

        res.json({ message: 'Release deleted successfully', deletedRelease });
    } catch (error) {
        console.error('Error deleting release:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

app.post('/api/newReleases/:id/comments', async (req, res) => {
    const releaseId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(releaseId)) {
        return res.status(400).json({ message: 'Invalid release ID format' });
    }

    try {
        const release = await NewRelease.findById(releaseId);
        if (!release) {
            return res.status(404).json({ message: 'Release not found' });
        }

        const newComment = {
            text: req.body.text,
            userName: req.body.userName || 'Anonymous',
            likes: 0,
            dislikes: 0
        };

        release.comments.push(newComment);
        const updatedRelease = await release.save();
        res.json(updatedRelease);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// Personal Playlist routes
app.get('/api/personalPlaylists', async (req, res) => {
    try {
        console.log('Fetching personal playlists...');
        const playlists = await PersonalPlaylist.find();
        res.json(playlists);
    } catch (error) {
        console.error('Error fetching playlists:', error);
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/personalPlaylists', async (req, res) => {
    try {
        const { title, image, songs, username } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const playlist = new PersonalPlaylist({
            title,
            image,
            songs,
            creator: user._id
        });

        const savedPlaylist = await playlist.save();
        res.status(201).json(savedPlaylist);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.post('/api/personalPlaylists/:id/songs', async (req, res) => {
    try {
        const playlist = await PersonalPlaylist.findById(req.params.id);
        playlist.songs.push(req.body);
        const updatedPlaylist = await playlist.save();
        res.json(updatedPlaylist);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/api/personalPlaylists/:playlistId/songs/:songId', async (req, res) => {
    try {
        const { playlistId, songId } = req.params;
        const playlist = await PersonalPlaylist.findById(playlistId);

        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        playlist.songs = playlist.songs.filter(song => song._id.toString() !== songId);
        const updatedPlaylist = await playlist.save();
        res.json(updatedPlaylist);
    } catch (error) {
        console.error('Error removing song from playlist:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

app.delete('/api/personalPlaylists/:id', async (req, res) => {
    try {
        const playlistId = req.params.id;
        const deletedPlaylist = await PersonalPlaylist.findByIdAndDelete(playlistId);

        if (!deletedPlaylist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        res.json({ message: 'Playlist deleted successfully', deletedPlaylist });
    } catch (error) {
        console.error('Error deleting playlist:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// Friend management routes
app.post('/api/users/friend-request', async (req, res) => {
    try {
        const { fromUsername, toUsername } = req.body;
        const fromUser = await User.findOne({ username: fromUsername });
        const toUser = await User.findOne({ username: toUsername });

        if (!fromUser || !toUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (toUser.friendRequests.includes(fromUser._id)) {
            return res.status(400).json({ message: 'Friend request already sent' });
        }

        toUser.friendRequests.push(fromUser._id);
        await toUser.save();

        res.json({ message: 'Friend request sent successfully' });
    } catch (error) {
        console.error('Error sending friend request:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

app.post('/api/users/accept-friend', async (req, res) => {
    try {
        const { username, friendUsername } = req.body;
        const user = await User.findOne({ username });
        const friend = await User.findOne({ username: friendUsername });

        if (!user || !friend) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.friendRequests.includes(friend._id)) {
            return res.status(400).json({ message: 'No friend request from this user' });
        }

        user.friendRequests = user.friendRequests.filter(id => !id.equals(friend._id));
        user.friends.push(friend._id);
        friend.friends.push(user._id);

        await user.save();
        await friend.save();

        res.json({ message: 'Friend request accepted' });
    } catch (error) {
        console.error('Error accepting friend request:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

app.post('/api/users/unfriend', async (req, res) => {
    try {
        const { username, friendUsername } = req.body;
        const user = await User.findOne({ username });
        const friend = await User.findOne({ username: friendUsername });

        if (!user || !friend) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.friends = user.friends.filter(id => !id.equals(friend._id));
        friend.friends = friend.friends.filter(id => !id.equals(user._id));

        await user.save();
        await friend.save();

        res.json({ message: 'Unfriended successfully' });
    } catch (error) {
        console.error('Error unfriending user:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

app.get('/api/users/:username/friends', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username })
            .populate('friends', 'username')
            .populate('friendRequests', 'username');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            friends: user.friends.map(friend => friend.username),
            friendRequests: user.friendRequests.map(friend => friend.username)
        });
    } catch (error) {
        console.error('Error fetching friends:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// Profile image route
app.post('/api/users/:username/profile-image', async (req, res) => {
    try {
        const { image } = req.body;
        const { username } = req.params;

        if (!image) {
            return res.status(400).json({ message: 'No image provided' });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.profileImage = image;
        await user.save();

        res.json({
            message: 'Profile image updated successfully',
            imageUrl: image
        });
    } catch (error) {
        console.error('Error updating profile image:', error);
        res.status(500).json({ message: 'Error updating image', error: error.message });
    }
});



// Add new endpoint to fetch user's playlists
app.get('/api/users/:username/playlists', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const playlists = await PersonalPlaylist.find({ creator: user._id })
            .sort({ createdAt: -1 });

        res.json(playlists);
    } catch (error) {
        console.error('Error fetching user playlists:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// Debug route (if needed during development)
app.get('/api/debug/personalPlaylists', async (req, res) => {
    try {
        const playlists = await mongoose.connection.db.collection('PersonalPlaylist').find().toArray();
        res.json(playlists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




// Middleware to check if user is admin
const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.session.userId);
        if (!user?.isAdmin) {
            return res.status(403).json({ message: 'Admin access required' });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Admin routes
app.get('/api/admin/users', isAdmin, async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
});

app.get('/api/admin/playlists', isAdmin, async (req, res) => {
    try {
        const playlists = await PersonalPlaylist.find().populate('creator', 'username');
        res.json(playlists);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching playlists' });
    }
});

app.get('/api/admin/songs', isAdmin, async (req, res) => {
    try {
        const songs = await Song.find();
        res.json(songs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching songs' });
    }
});

app.get('/api/admin/comments', isAdmin, async (req, res) => {
    try {
        const comments = await Comment.find().populate('user', 'username');
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comments' });
    }
});

app.get('/api/admin/genres', isAdmin, async (req, res) => {
    try {
        const genres = await Genre.find();
        res.json(genres);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching genres' });
    }
});

// Update routes
app.put('/api/admin/:type/:id', isAdmin, async (req, res) => {
    try {
        const { type, id } = req.params;
        let Model;
        switch (type) {
            case 'users': Model = User; break;
            case 'playlists': Model = PersonalPlaylist; break;
            case 'songs': Model = Song; break;
            case 'comments': Model = Comment; break;
            case 'genres': Model = Genre; break;
            default: throw new Error('Invalid type');
        }

        const updated = await Model.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: 'Error updating item' });
    }
});

// Delete routes
app.delete('/api/admin/:type/:id', isAdmin, async (req, res) => {
    try {
        const { type, id } = req.params;
        let Model;
        switch (type) {
            case 'users': Model = User; break;
            case 'playlists': Model = PersonalPlaylist; break;
            case 'songs': Model = Song; break;
            case 'comments': Model = Comment; break;
            case 'genres': Model = Genre; break;
            default: throw new Error('Invalid type');
        }

        await Model.findByIdAndDelete(id);
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting item' });
    }
});

// Add genre
app.post('/api/admin/genres', isAdmin, async (req, res) => {
    try {
        const genre = new Genre(req.body);
        await genre.save();
        res.status(201).json(genre);
    } catch (error) {
        res.status(500).json({ message: 'Error creating genre' });
    }
});



const initializeAdmin = async (req, res) => {
    if (process.env.NODE_ENV === 'production') {
        return res.status(403).json({ message: 'Not available in production' });
    }

    try {
        // Check if admin exists
        const existingAdmin = await User.findOne({ username: process.env.ADMIN_USERNAME });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        // Create admin user
        const adminUser = new User({
            username: 'admin',
            password: 'admin123',
            isAdmin: true,
        });

        await adminUser.save();
        res.status(201).json({ message: 'Admin user created successfully' });
    } catch (error) {
        console.error('Error creating admin:', error);
        res.status(500).json({ message: 'Error creating admin user' });
    }
};
app.post('/api/init-admin', initializeAdmin);


// Modified song route to fetch from NewRelease collection
app.get('/api/admin/newReleases', isAdmin, async (req, res) => {
    try {
        const songs = await NewRelease.find().sort({ createdAt: -1 });
        res.json(songs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching songs' });
    }
});

// New route to fetch all comments across all releases
app.get('/api/admin/comments', isAdmin, async (req, res) => {
    try {
        const releases = await NewRelease.find();
        const allComments = releases.reduce((acc, release) => {
            const commentsWithMetadata = release.comments.map(comment => ({
                ...comment.toObject(),
                _id: comment._id,
                songTitle: release.title,
                songArtist: release.artist,
                releaseId: release._id
            }));
            return [...acc, ...commentsWithMetadata];
        }, []);

        res.json(allComments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comments' });
    }
});

// Update delete routes to handle the nested structure
app.delete('/api/admin/comments/:releaseId/:commentId', isAdmin, async (req, res) => {
    try {
        const { releaseId, commentId } = req.params;
        const release = await NewRelease.findById(releaseId);

        if (!release) {
            return res.status(404).json({ message: 'Release not found' });
        }

        release.comments = release.comments.filter(
            comment => comment._id.toString() !== commentId
        );

        await release.save();
        res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting comment' });
    }
});

// Update comment
app.put('/api/admin/comments/:releaseId/:commentId', isAdmin, async (req, res) => {
    try {
        const { releaseId, commentId } = req.params;
        const release = await NewRelease.findById(releaseId);

        if (!release) {
            return res.status(404).json({ message: 'Release not found' });
        }

        const commentIndex = release.comments.findIndex(
            comment => comment._id.toString() === commentId
        );

        if (commentIndex === -1) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        release.comments[commentIndex] = {
            ...release.comments[commentIndex].toObject(),
            ...req.body,
            _id: commentId
        };

        await release.save();
        res.json(release.comments[commentIndex]);
    } catch (error) {
        res.status(500).json({ message: 'Error updating comment' });
    }
});


// Serve static files and handle all routes
app.use(express.static(path.join(__dirname, '../../frontend/public')));

// Catch-all route to serve the main HTML file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});