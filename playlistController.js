const Playlist = require('../models/playlistModel');

// @desc Get all playlists
// @route GET /api/playlists
const getPlaylists = async (req, res) => {
    try {
        const playlists = await Playlist.find();
        res.json(playlists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Create playlist
// @route POST /api/playlists
const createPlaylist = async (req, res) => {
    try {
        const { name, description } = req.body;
        const playlist = await Playlist.create({ name, description, songs: [] });
        res.status(201).json(playlist);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc Add song to playlist
// @route POST /api/playlists/:id/songs
const addSongToPlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id);
        if (!playlist) return res.status(404).json({ message: 'Playlist not found' });

        playlist.songs.push(req.body);
        await playlist.save();
        res.status(201).json(playlist);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc Delete playlist
// @route DELETE /api/playlists/:id
const deletePlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.findByIdAndDelete(req.params.id);
        if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
        res.json({ message: 'Playlist deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Delete song from playlist
// @route DELETE /api/playlists/:id/songs/:songId
const deleteSong = async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id);
        if (!playlist) return res.status(404).json({ message: 'Playlist not found' });

        playlist.songs = playlist.songs.filter(
            song => song._id.toString()!== req.params.songId
        );
        await playlist.save();
        res.json(playlist);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getPlaylists, createPlaylist, addSongToPlaylist, deletePlaylist, deleteSong };