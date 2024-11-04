const input = document.querySelector('#search-input');
const defaultVar = document.querySelector('#default');
const debounce = document.querySelector('#debounce');
const throttle = document.querySelector('#throttle');

const updateSearchText = debounceFunc(text => {
    debounce.textContent = text;
});

input.addEventListener('input', (e) => {
    defaultVar.textContent = e.target.value;

    updateSearchText(e.target.value);
});


function debounceFunc(cb, delay = 1000) {
    let debounceInterval;
    setTimeout(() => {

    })
}