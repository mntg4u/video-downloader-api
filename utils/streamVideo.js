const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');

function streamVideo(videoUrl, res) {
    const videoStream = ytdl(videoUrl, {
        quality: 'highest',
    });

    res.writeHead(200, {
        'Content-Type': 'video/mp4',
        'Transfer-Encoding': 'chunked',
    });

    ffmpeg(videoStream)
        .format('mp4')
        .pipe(res);
}

module.exports = { streamVideo };
