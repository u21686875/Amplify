// Create a directory named 'mongo-init' in your project root
// Inside mongo-init/init.js

db = db.getSiblingDB('amplify_music_db');

// Import newreleases collection
const newReleases = JSON.parse(cat('/docker-entrypoint-initdb.d/exports/amplify_music_db.newreleases.json'));
db.newreleases.insertMany(newReleases);

// Import personalplaylist collection
const personalPlaylists = JSON.parse(cat('/docker-entrypoint-initdb.d/exports/amplify_music_db.personalplaylist.json'));
db.personalplaylist.insertMany(personalPlaylists);

// Import sessions collection
const sessions = JSON.parse(cat('/docker-entrypoint-initdb.d/exports/amplify_music_db.sessions.json'));
db.sessions.insertMany(sessions);

// Import users collection
const users = JSON.parse(cat('/docker-entrypoint-initdb.d/exports/amplify_music_db.users.json'));
db.users.insertMany(users);

// Create indexes if needed
db.users.createIndex({ "username": 1 }, { unique: true });
db.newreleases.createIndex({ "createdAt": -1 });