const fs = require('fs');
const {execSync} = require('child_process');

const asr = async (ctx) => {
    let demo_dir = '../online_demo/';
    let wav_output = '../online_demo/online-data/audio_auto/upload.wav';
    ctx.response.type = 'application/json';
    let file = ctx.request.files[0];

    execSync(`ffmpeg -y -hide_banner -i ${file.path} -ar 16000 -ac 1 ${wav_output}`);
    let decodeResult = execSync('bash ' + demo_dir + 'auto_run.sh');
    ctx.response.body = {
        'msg': decodeResult.toString()
    };
};

module.exports = {
    asr: asr
};
