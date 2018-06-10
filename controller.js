const fs = require('fs');
const exec = require('child-process-promise').exec;

const asr = async (ctx) => {
    let demo_dir = '../online_demo/';
    let wav_output = '../online_demo/online-data/audio_auto/upload.wav';
    ctx.response.type = 'application/json';
    let file = ctx.request.files[0];
    let reader = fs.createReadStream(file.path);
    let stream = fs.createWriteStream('./upload.ogg');
    reader.pipe(stream);
    console.log('Uploaded to %s', file.name, stream.path);

    let ffmpeg = await exec(`ffmpeg -y -hide_banner -i upload.ogg -ar 16000 -ac 1 ${wav_output}`);
    let run = await exec(demo_dir + 'run_auto.sh');
    
    ctx.response.body = {
        'msg': run.stdout
    };
};

module.exports = {
    asr: asr
};