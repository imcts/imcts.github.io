
const setEvent = () => {
    const file = document.getElementById('file');

    file.addEventListener('change', e => {
        const file = e.target.files[0];

        if(file && window.URL.createObjectURL) {
            const type = file.type;

            if(type.lastIndexOf('image') >= 0) {
                const display = document.getElementById('display'),
                      url     = window.URL.createObjectURL(file),
                      image   = new Image();

                image.src = url;

                display.innerHTML = '';
                display.append(image);
            } else if(type.lastIndexOf('video') >= 0) {
                const display = document.getElementById('display'),
                      url     = window.URL.createObjectURL(file),
                      video   = document.createElement('video');

                video.setAttribute('controls', true);

                video.src = url;

                display.innerHTML = '';
                display.append(video);
            }
        }
    }, false);
};

const init = () => {
    setEvent();
};

init();