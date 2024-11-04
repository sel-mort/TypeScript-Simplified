const input = document.querySelector('#search-input');
const defaultVar = document.querySelector('#default');
const debounce = document.querySelector('#debounce');
const throttle = document.querySelector('#throttle');

input.addEventListener('input', (e) => {
    defaultVar.textContent = e.target.value;

    debounceFunc(e, 1000);

});

function debounceFunc(e, delay) {
    let debounceInterval;
    return () => {
        setTimeout(() => {
            clearTimeout(debounceInterval);
            debounce.textContent = e.target.value;
        }, delay);
    }
}