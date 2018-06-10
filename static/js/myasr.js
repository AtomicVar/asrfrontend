let record = document.querySelector('.record');
let stop = document.querySelector('.stop');
let recog = document.querySelector('.recog');
let reset = document.querySelector('.reset');
let result = document.querySelector('#result');

stop.disabled = true;
recog.disabled = true;
reset.disabled = true;

navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false
}).then((stream) => {
    result.innerHTML = 'Ready to record.';
    mediaRecorder = new MediaRecorder(stream);

    /* Start recording */
    record.onclick = () => {
        mediaRecorder.start();

        result.style.color = 'orange';
        result.innerHTML = 'Recording...';

        stop.disabled = false;
        record.disabled = true;
    };

    /* Make a wav file */
    let chunks = [];
    mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data);
    };

    /* Stop the recording */
    stop.onclick = () => {
        mediaRecorder.stop();

        result.style.color = 'green';
        result.innerHTML = 'Recording done.';

        recog.disabled = false;
        reset.disabled = false;
        stop.disabled = true;
    };

    mediaRecorder.onstop = (e) => {
        let audioContainer = document.querySelector('.audioContainer');
        let audio = document.createElement('audio');
        audio.setAttribute('controls', '');
        audioContainer.appendChild(audio);

        let blob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' });
        let audioURL = window.URL.createObjectURL(blob);
        audio.src = audioURL;
        console.log('The size of the wave: ' + blob.size);
        console.log('The type of the wave: ' + blob.type);
    };

    /* file upload */
    recog.onclick = ()=>{
        let blob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' });

        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                result.style.color = 'orange';
                result.innerHTML = 'Finished decoding.';
            }
        };
        let formData = new FormData();
        formData.append('wav', blob);

        xhr.open('POST', '/asr', true);
        xhr.send(formData);

        result.style.color = 'orange';
        result.innerHTML = 'Uploading your speech and analyzing...';
    };

    /* Reset */
    reset.onclick = ()=> {
        record.disabled = false;
        stop.disabled = true;
        recog.disabled = true;
        reset.disabled = true;

        result.style.color = 'black';
        result.innerHTML = 'Reset done. Push "Record" to start another recognition.';

        document.querySelector('.audioContainer').removeChild(document.querySelector('audio'));
    };
}).catch((err) => {
    console.log(err);
});