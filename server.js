const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/playlists', require('./routes/playlistRoutes'));

app.get('/', (req, res) => {
    res.send('Music Playlist API Running...');
});

const Playlist = require('./models/playlistModel');

const seedData = async () => {
    const count = await Playlist.countDocuments();
    if (count === 0) {
        await Playlist.create({
            name: "Telugu Hits 2026",
            description: "Seeded from code",
            songs: [
                { title: "Naatu Naatu", artist: "Rahul Sipligunj", url: "https://youtu.be/OsU0CGZoV8E" },
                { title: "Butta Bomma", artist: "Armaan Malik", url: "https://youtu.be/VdnEeN2L4PM" }
            ]
        });
        console.log('Seed data added');
    }
};
seedData();

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));