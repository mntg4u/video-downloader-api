const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

async function downloadVideo(videoUrl) {
    return new Promise((resolve, reject) => {
        const outputDir = path.resolve(__dirname, '..', 'downloads');
        if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

        const outputPath = path.join(outputDir, `video-${Date.now()}.mp4`);
        const command = `yt-dlp -o "${outputPath}" "${videoUrl}"`;

        exec(command, (error) => {
            if (error) return reject(error);
            resolve(outputPath);
        });
    });
}

module.exports = { downloadVideo };
