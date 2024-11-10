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
    fetchWithThreeRetries();
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

        if (inThrottle) {
            leftArgs = args;
            return;
        }
    
        cb(...args);
        inThrottle = true;
        
        setTimeout(timeOutFunc, delay)
    } 
};

function fetchWithRetry(url, retryLimit) {
    let attempts = 0; // Encapsulated variable for tracking attempts

    function attemptFetch(callback) {
        console.log(`Attempt ${attempts + 1} of ${retryLimit}`);
        setTimeout(() => {
            const success = Math.random() > 0.5; // Simulate 50% chance of success
            if (success) {
                callback(null, { data: "Fetched data!" });
            } else {
                attempts++;
                if (attempts < retryLimit) {
                    console.log("Retrying...");
                    attemptFetch(callback); // Retry
                } else {
                    callback(new Error("Failed to fetch data after retries"), null);
                }
            }
        }, 1000); // Simulate async delay
    }

    return attemptFetch;
}

// Using a curried function to preset the retry limit to 3
const fetchWithThreeRetries = fetchWithRetry("https://api.example.com/data", 3);

fetchWithThreeRetries((error, data) => {
    if (error) {
        console.error(error.message);
    } else {
        console.log("Success:", data);
    }
});
