const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { downloadVideo } = require('./utils/downloadVideo');
const { streamVideo } = require('./utils/streamVideo');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Home route for health check
app.get('/', (req, res) => {
    res.send('Video Downloader API is running');
});

// Endpoint to download video
app.get('/api/download', async (req, res) => {
    const videoUrl = req.query.url;
    if (!videoUrl) return res.status(400).json({ error: 'URL is required' });
    try {
        const videoPath = await downloadVideo(videoUrl);
        res.status(200).json({ message: 'Download completed', videoPath });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to download video' });
    }
});

// Endpoint to stream video
app.get('/api/stream', (req, res) => {
    const videoUrl = req.query.url;
    if (!videoUrl) return res.status(400).json({ error: 'URL is required' });
    try {
        streamVideo(videoUrl, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to stream video' });
    }
});

// Listen on the assigned port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
