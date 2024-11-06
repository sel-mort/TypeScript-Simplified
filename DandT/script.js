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

function throttleFunc(cb, delay = 1000) {
    let inThrottle = false;
    let leftArgs

    const timeOutFunc = () => {
        
        if (leftArgs == null) {
            inThrottle = false;
        } else {
            cb(...leftArgs);
            leftArgs = null;
        }
        
        setTimeout(timeOutFunc, delay)
    }

    return (...args) => {
        console.log(args)
        if (inThrottle) {
            leftArgs = args;
            return;
        }
    
        cb(...args);
        inThrottle = true;
        
        setTimeout(timeOutFunc, delay)
    } 
}