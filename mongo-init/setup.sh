#!/bin/bash
set -e

mongoimport --db amplify_music_db --collection newreleases --file /docker-entrypoint-initdb.d/exports/amplify_music_db.newreleases.json --jsonArray
mongoimport --db amplify_music_db --collection personalplaylist --file /docker-entrypoint-initdb.d/exports/amplify_music_db.personalplaylist.json --jsonArray
mongoimport --db amplify_music_db --collection sessions --file /docker-entrypoint-initdb.d/exports/amplify_music_db.sessions.json --jsonArray
mongoimport --db amplify_music_db --collection users --file /docker-entrypoint-initdb.d/exports/amplify_music_db.users.json --jsonArray

# Create indexes
mongosh amplify_music_db --eval '
  db.users.createIndex({ "username": 1 }, { unique: true });
  db.newreleases.createIndex({ "createdAt": -1 });
'