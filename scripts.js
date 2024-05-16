// Get the modal
var modal = document.getElementById("myModal");

// Function to open the modal
function openModal() {
    modal.style.display = "block";
    modal.classList.add("show");
}

function testInternet(src) {
    return new Promise(function(resolve, reject) {
        var iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        // Set a timeout to reject the promise if the URL doesn't load within 10 seconds
        var timeoutId = setTimeout(function() {
            document.body.removeChild(iframe); // Remove the iframe
            reject(new Error('The page took too long to load.'));
        }, 10000);

        // When the iframe finishes loading, clear the timeout and resolve the promise
        iframe.onload = function() {
            clearTimeout(timeoutId);
            document.body.removeChild(iframe); // Remove the iframe
            resolve(true);
        };

        // Start loading the URL in the iframe
        iframe.src = src;
    });
}

window.onload = function() {
    var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    var viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    if (viewportHeight > viewportWidth) {
        document.body.innerHTML = "<p>Please rotate your device to landscape mode</p>";
    }
});



document.getElementById('urlSelector').addEventListener('change', function() {
    var iframe = document.getElementById('iframe');
    var src = this.value;
    iframe.src = "loading.html";
    testInternet(src)
    .then(function(loadable) {
        iframe.src = src; // Load the URL in the iframe
    })
    .catch(function(error) {
        openModal()
    });
});
document.getElementById('urlSelector').addEventListener('change', function() {
    var iframe = document.getElementById('iframe');
    var src = this.value;
    iframe.src = "loading.html";
    testInternet(src)
    .then(function(loadable) {
        iframe.src = src; // Load the URL in the iframe
    })
    .catch(function(error) {
        openModal()
    });
});

// Load the first option by default when the page loads
window.onload = function() {
    var urlSelector = document.getElementById('urlSelector');
    var iframe = document.getElementById('iframe');
    var src = urlSelector.value;
    iframe.src = "loading.html";
    testInternet(src)
    .then(function(loadable) {
        iframe.src = src; // Load the URL in the iframe
    })
    .catch(function(error) {
        openModal()
    });
};
