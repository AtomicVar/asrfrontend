const fs = require('fs');
const {spawn} = require('child_process');

const asr = async (ctx) => {
    ctx.response.type = 'application/json';
    let file = ctx.request.files[0];
    let reader = fs.createReadStream(file.path);
    let stream = fs.createWriteStream('./upload.ogg');
    reader.pipe(stream);
    console.log('Uploaded to %s', file.name, stream.path);
    let ffmpeg = spawn('ffmpeg', ['-hide_banner', '-i', 'upload.ogg', '-ar', '16000', '-ac', '1', 'upload.wav']);
    ffmpeg.stdout.on('data', (data)=>{
        console.log(`ffmpeg output: ${data}`);
    });
    
    ctx.response.body = {
        'msg': 'OK'
    };
};

module.exports = {
    asr: asr
};