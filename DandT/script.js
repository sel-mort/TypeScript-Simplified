const input = document.querySelector('#search-input');
const defaultText = document.querySelector('#default');
const debounceText = document.querySelector('#debounce');
const throttleText = document.querySelector('#throttle');

const debounce = debounceFunc(text => {
    debounceText.textContent = text;
});

const throttle = throttleFunc(text => {
    throttleText.textContent = text;
});

input.addEventListener('input', (e) => {
    defaultText.textContent = e.target.value;

    debounce(e.target.value);
    throttle(e.target.value);
});


function debounceFunc(cb, delay = 1000) {
    let debounceInterval;
    return (...args) => {
        clearTimeout(debounceInterval);
        debounceInterval = setTimeout(() => cb(...args), delay);
    }
}

function throttleFunc(cb, delay = 2000) {
    let inThrottle;
    let argg;
    return (...args) => {
        if (!inThrottle) {
            cb(...argg);
            inThrottle = true;
            setTimeout(() => {
                inThrottle = false, delay
            })
        }
        argg = args;
    }
}