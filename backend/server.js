const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/amplify_music_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// User model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]

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
    }]
});

const personalPlaylistSchema = new mongoose.Schema({
    title: String,
    image: String,
    songs: [{
        title: String,
        artist: String
    }]
});

const User = mongoose.model('User', userSchema);
const NewRelease = mongoose.model('NewRelease', newReleaseSchema);
const PersonalPlaylist = mongoose.model('PersonalPlaylist', personalPlaylistSchema, 'personalplaylist');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Serve static files from the 'public' directory in the frontend folder
app.use(express.static(path.join(__dirname, '..', '..', 'frontend', 'public')));

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

app.post('/api/users/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, password });
        if (user) {
            res.json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error during login', error: error.message });
    }
});

app.get('/api/users', async (req, res) => {
    try {
        // In a real application, you would get the user ID from the authenticated session
        // For now, we'll just fetch the first user in the database
        const user = await User.findOne();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({
            username: user.username
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});


app.put('/api/users', async (req, res) => {
    try {
        // In a real application, you would get the user ID from the authenticated session
        // For now, we'll just update the first user in the database
        const user = await User.findOne();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { username } = req.body;
        user.username = username;

        await user.save();

        res.json({
            username: user.username
        });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});



// Songs and Playlist
app.get('/api/newReleases', async (req, res) => {
    try {
        const newReleases = await NewRelease.find();
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

app.put('/api/users', async (req, res) => {
    try {
        // In a real application, you would get the user ID from the authenticated session
        // For now, we'll just update the first user in the database
        const user = await User.findOne();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { username } = req.body;

        // Add some basic validation
        if (!username || username.trim() === '') {
            return res.status(400).json({ message: 'Username cannot be empty' });
        }

        // Check if the new username already exists (excluding the current user)
        const existingUser = await User.findOne({ username, _id: { $ne: user._id } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        user.username = username;
        await user.save();

        res.json({
            message: 'User updated successfully',
            username: user.username
        });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

app.delete('/api/users', async (req, res) => {
    try {
        // In a real application, you would get the user ID from the authenticated session
        // For this example, we'll use the username from the request body
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
        const release = await NewRelease.findById(releaseId); // using findById for direct lookup

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



app.get('/api/personalPlaylists', async (req, res) => {
    try {
        console.log('Fetching personal playlists...');
        const playlists = await PersonalPlaylist.find();
        // console.log('Playlists fetched:', playlists);
        if (playlists.length === 0) {
            // console.log('No playlists found in the database.');
        }
        res.json(playlists);
    } catch (error) {
        console.error('Error fetching playlists:', error);
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/debug/personalPlaylists', async (req, res) => {
    try {
        const playlists = await mongoose.connection.db.collection('PersonalPlaylist').find().toArray();
        res.json(playlists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/personalPlaylists', async (req, res) => {
    const playlist = new PersonalPlaylist(req.body);
    try {
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









// Send a friend request
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

// Accept a friend request
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

// Unfriend a user
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




// Serve the main HTML file for all routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
