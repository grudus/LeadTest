const LOCAL_STORAGE_APP_ID = 'appId';
const LOCAL_STORAGE_ENV = 'environment';

const button = document.getElementById("button");
const input = document.getElementById("input");
const radios = document.querySelectorAll("input[type='radio']");

let appId = localStorage.getItem(LOCAL_STORAGE_APP_ID);
let environment = localStorage.getItem(LOCAL_STORAGE_ENV) || 'staging';

radios.forEach(radio => {
    radio.onclick = () => onRadioClick(radio);
    if (radio.value == environment)
        radio.checked = 'checked';
});

const onRadioClick = (radio) => {
    localStorage.setItem(LOCAL_STORAGE_ENV, radio.value);
    location.reload();
};

const getParameterByName = (name) => {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

input.value = appId;

button.addEventListener("click", () => {
    localStorage.setItem(LOCAL_STORAGE_APP_ID, input.value);
    location.reload();
});

window.CrazyCallSettings = {
    appId,
    hidePopup: getParameterByName("hide") !== null,
};



const loadScript = (src) => {
    var head = document.getElementsByTagName('head')[0],
        script = document.createElement('script');
    done = false;
    script.setAttribute('src', src);
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('charset', 'utf-8');
    script.onload = script.onreadstatechange = () => {
        if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
            done = true;
            script.onload = script.onreadystatechange = null;
        }
    }
    head.insertBefore(script, head.firstChild);
}

loadScript(`https://crazy-website-widget.crazycall.com/${environment}/widget.js`)
