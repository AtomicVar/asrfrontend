const fs = require('fs');
const exec = require('child-process-promise').exec;

const asr = async (ctx) => {
    ctx.response.type = 'application/json';
    let file = ctx.request.files[0];
    let reader = fs.createReadStream(file.path);
    let stream = fs.createWriteStream('./upload.ogg');
    reader.pipe(stream);
    console.log('Uploaded to %s', file.name, stream.path);

    let ffmpeg = await exec('ffmpeg -y -hide_banner -i upload.ogg -ar 16000 -ac 1 upload.wav');
    console.log(`ffmpeg output: ${ffmpeg.stdout}`);
    console.log(`ffmpeg error: ${ffmpeg.stderr}`);
    
    ctx.response.body = {
        'msg': 'OK'
    };
};

module.exports = {
    asr: asr
};