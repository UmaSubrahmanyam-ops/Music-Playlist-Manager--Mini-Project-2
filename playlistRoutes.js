const express = require('express');
const router = express.Router();
const { getPlaylists, createPlaylist, addSongToPlaylist, deletePlaylist, deleteSong } = require('../controllers/playlistController');

router.route('/').get(getPlaylists).post(createPlaylist);
router.route('/:id').delete(deletePlaylist);
router.route('/:id/songs').post(addSongToPlaylist);
router.route('/:id/songs/:songId').delete(deleteSong);

module.exports = router;