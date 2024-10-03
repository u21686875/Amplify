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
    password: { type: String, required: true }
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
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
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
        const playlist = await PersonalPlaylist.findById(req.params.playlistId);
        playlist.songs = playlist.songs.filter(song => song._id.toString() !== req.params.songId);
        const updatedPlaylist = await playlist.save();
        res.json(updatedPlaylist);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});



// Serve the main HTML file for all routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
