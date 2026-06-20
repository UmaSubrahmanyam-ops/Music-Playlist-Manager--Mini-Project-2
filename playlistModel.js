const mongoose = require('mongoose');

const songSchema = mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: String,
    duration: Number, // in seconds
    url: String
});

const playlistSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    songs: [songSchema]
}, { timestamps: true });

module.exports = mongoose.model('Playlist', playlistSchema);